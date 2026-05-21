import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Trophy } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Progress } from "@/components/ui/progress";
import { tracks, type Track } from "@/data/learn-content";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Jua Katiba" },
      { name: "description", content: "Deep-dive lessons on the Constitution of Kenya, devolution, elections and citizen responsibilities." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const { user } = useAuth();
  const { data: progress } = useQuery({
    queryKey: ["progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_slug,completed")
        .eq("user_id", user!.id);
      return new Set((data ?? []).filter((d) => d.completed).map((d) => d.lesson_slug));
    },
  });

  const trackProgress = (t: Track) => {
    if (!progress) return 0;
    const done = t.lessons.filter((l) => progress.has(l.slug)).length;
    return Math.round((done / t.lessons.length) * 100);
  };

  const totalLessons = tracks.reduce((s, t) => s + t.lessons.length, 0);
  const completedLessons = progress?.size ?? 0;

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border/60 bg-hero-radial">
        <div className="absolute inset-0 pattern-kente opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">Learn</div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            Pick a path.<br className="hidden sm:block" /> Build your civic mind.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {tracks.length} curated tracks, {totalLessons} in-depth lessons, with expandable sections, plain-English explanations and key takeaways — all anchored in the Constitution.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-gold" /> +{totalLessons * 10} XP available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-flag-green" /> {totalLessons} lessons
            </span>
            {user && (
              <span className="inline-flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-flag-red" /> {completedLessons}/{totalLessons} completed
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => {
            const pct = trackProgress(t);
            return (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <a
                  href={`/learn/${t.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 text-left card-elevated"
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-white shadow-lg`}>
                    <t.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" /> {t.lessons.length} lessons
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-flag-green">
                        {pct > 0 ? `${pct}%` : "Start"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    {pct > 0 && <Progress value={pct} className="mt-3 h-1.5" />}
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
