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
      { name: "description", content: "Your civic learning dashboard, progress, and AI assistant." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Habari! I'm your civic assistant. Ask me anything about the Constitution of Kenya." },
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
        .select("xp_earned,score,total")
        .eq("user_id", user!.id);
      return data ?? [];
    },
  });

  const totalXp = (attempts ?? []).reduce((s, a) => s + (a.xp_earned ?? 0), 0);
  const greetingName = profile?.display_name ?? user?.email?.split("@")[0] ?? "friend";

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "ai",
          text: `Great question. In short: Article 1 of the Constitution affirms that "all sovereign power belongs to the people of Kenya". (Demo response — connect Lovable Cloud + AI to make me real.)`,
        },
      ]);
    }, 700);
  };

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">Dashboard</div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Karibu, {greetingName} 👋</h1>
          <p className="text-muted-foreground">
            {profile?.streak ? `You're on a ${profile.streak}-day streak.` : "Take a quiz to start your streak."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Flame} label="Streak" value={`${profile?.streak ?? 0} days`} tone="from-flag-red to-rose-600" />
          <Stat icon={TrendingUp} label="Total XP" value={totalXp.toLocaleString()} tone="from-flag-green to-emerald-600" />
          <Stat icon={BookOpen} label="Quizzes" value={`${attempts?.length ?? 0}`} tone="from-amber-500 to-gold" />
          <Stat icon={Award} label="Badges" value={`${Math.floor(totalXp / 200)}`} tone="from-indigo-500 to-flag-green" />
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
              <span className="text-sm text-muted-foreground">15% complete</span>
            </div>
            <Progress value={15} className="mt-3 h-2" />

            <div className="mt-6 space-y-3">
              {[
                { title: "Bill of Rights · Equality", pct: 80 },
                { title: "Devolution Foundations", pct: 45 },
                { title: "Public Participation", pct: 20 },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-flag-green/10 text-flag-green">
                        <Target className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{c.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{c.pct}%</span>
                  </div>
                  <Progress value={c.pct} className="mt-3 h-1.5" />
                </div>
              ))}
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

            <div className="flex-1 space-y-3 overflow-y-auto p-5 text-sm" style={{ minHeight: 280 }}>
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
                placeholder="Ask about any article…"
                className="rounded-full"
              />
              <Button onClick={send} size="icon" className="rounded-full">
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
      <div className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </motion.div>
  );
}
