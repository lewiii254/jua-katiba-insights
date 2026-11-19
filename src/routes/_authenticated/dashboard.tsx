import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, BookOpen, Brain, Flame, Send, Sparkles, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Jua Katiba" },
      {
        name: "description",
        content: "Your civic learning dashboard, progress, and AI assistant.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: "Habari! I'm your civic assistant. Ask me anything about the Constitution of Kenya.",
    },
  ]);
  const [input, setInput] = useState("");

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
  });

  const { data: attempts } = useQuery({
    queryKey: ["attempts", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("quiz_attempts")
        .select("id,quiz_slug,score,total,xp_earned,created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const { data: lessons } = useQuery({
    queryKey: ["lessons", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_slug,completed,progress,updated_at")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });
      return data ?? [];
    },
  });

  const totalXp = (attempts ?? []).reduce((s, a) => s + (a.xp_earned ?? 0), 0);
  const lessonsDone = (lessons ?? []).filter((l) => l.completed).length;
  const overallPct =
    lessons && lessons.length > 0
      ? Math.round((lessonsDone / Math.max(lessons.length, 8)) * 100)
      : 0;
  const bestScore = (attempts ?? []).reduce(
    (m, a) => Math.max(m, Math.round((a.score / Math.max(a.total, 1)) * 100)),
    0,
  );
  const greetingName = profile?.display_name ?? user?.email?.split("@")[0] ?? "friend";

  const [streaming, setStreaming] = useState(false);

  const send = async () => {
    if (!input.trim() || streaming) return;
    const q = input.trim();
    const history = [...msgs, { role: "user" as const, text: q }];
    setMsgs([...history, { role: "ai", text: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/civic-chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "ai",
            text: `⚠️ ${err.error ?? "Something went wrong."}`,
          };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              acc += delta;
              setMsgs((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "ai", text: acc };
                return copy;
              });
            }
          } catch {
            // ignore partial
          }
        }
      }
    } catch (e) {
      setMsgs((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "ai", text: `⚠️ ${(e as Error).message}` };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">
            Dashboard
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Karibu, {greetingName} 👋</h1>
          <p className="text-muted-foreground">
            {profile?.streak
              ? `You're on a ${profile.streak}-day streak.`
              : "Take a quiz to start your streak."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            icon={Flame}
            label="Streak"
            value={`${profile?.streak ?? 0} days`}
            tone="from-flag-red to-rose-600"
          />
          <Stat
            icon={TrendingUp}
            label="Total XP"
            value={totalXp.toLocaleString()}
            tone="from-flag-green to-emerald-600"
          />
          <Stat
            icon={BookOpen}
            label="Quizzes"
            value={`${attempts?.length ?? 0}`}
            tone="from-amber-500 to-gold"
          />
          <Stat
            icon={Award}
            label="Best Score"
            value={`${bestScore}%`}
            tone="from-indigo-500 to-flag-green"
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Progress + lessons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-card p-6 card-elevated"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Your learning journey</h2>
              <span className="text-sm text-muted-foreground">{overallPct}% complete</span>
            </div>
            <Progress value={overallPct} className="mt-3 h-2" />

            <div className="mt-6 space-y-3">
              {(lessons ?? []).slice(0, 5).map((l) => (
                <div key={l.lesson_slug} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-flag-green/10 text-flag-green">
                        <Target className="h-4 w-4" />
                      </div>
                      <span className="font-medium capitalize">
                        {l.lesson_slug.replace(/-/g, " ")}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {l.completed ? "100%" : `${l.progress}%`}
                    </span>
                  </div>
                  <Progress value={l.completed ? 100 : l.progress} className="mt-3 h-1.5" />
                </div>
              ))}
              {(!lessons || lessons.length === 0) && (
                <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  No lessons yet — head to the Learn page to start a track.
                </div>
              )}
            </div>

            {/* Recent quiz attempts */}
            <div className="mt-8">
              <h3 className="font-display text-lg font-semibold">Recent quiz attempts</h3>
              <div className="mt-3 space-y-2">
                {(attempts ?? []).slice(0, 5).map((a) => {
                  const pct = Math.round((a.score / Math.max(a.total, 1)) * 100);
                  return (
                    <div
                      key={a.id}
                      className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3 text-sm"
                    >
                      <div>
                        <div className="font-medium capitalize">
                          {a.quiz_slug.replace(/-/g, " ")}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(a.created_at).toLocaleDateString()} · {a.score}/{a.total}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-flag-green">
                          +{a.xp_earned} XP
                        </span>
                        <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
                {(!attempts || attempts.length === 0) && (
                  <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                    Take your first quiz to see results here.
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* AI assistant */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col rounded-3xl border border-border bg-card card-elevated"
          >
            <div className="flex items-center gap-3 border-b border-border p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-flag-gradient text-white">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-semibold">Civic Assistant</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-gold" /> AI-powered
                </div>
              </div>
            </div>

            <div
              className="flex-1 space-y-3 overflow-y-auto p-5 text-sm"
              style={{ minHeight: 280 }}
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    m.role === "ai"
                      ? "bg-muted text-foreground"
                      : "ml-auto bg-flag-green text-white"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-t border-border p-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                disabled={streaming}
                placeholder={streaming ? "Thinking…" : "Ask about any article…"}
                className="rounded-full"
              />
              <Button
                onClick={send}
                disabled={streaming || !input.trim()}
                size="icon"
                className="rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-border bg-card p-5 card-elevated"
    >
      <div
        className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </motion.div>
  );
}
