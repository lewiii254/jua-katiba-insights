import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle2, ChevronDown, Circle, Clock, Lock, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { findTrack, type Lesson, type LessonSection, type Track } from "@/data/learn-content";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/$trackSlug")({
  loader: ({ params }) => {
    const track = findTrack(params.trackSlug);
    if (!track) throw notFound();
    return { track };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.track.title} — Learn — Jua Katiba` },
          { name: "description", content: loaderData.track.desc },
          { property: "og:title", content: `${loaderData.track.title} — Jua Katiba` },
          { property: "og:description", content: loaderData.track.desc },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Track not found</h1>
        <p className="mt-3 text-muted-foreground">That learning track doesn't exist.</p>
        <Link to="/learn" className="mt-6 inline-block">
          <Button className="rounded-full">Back to Learn</Button>
        </Link>
      </div>
    </SiteShell>
  ),
  component: TrackDetailPage,
});

function TrackDetailPage() {
  const { track } = Route.useLoaderData() as { track: Track };
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState<Record<string, Set<number>>>({});

  const { data: progress } = useQuery({
    queryKey: ["progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_slug,completed,progress")
        .eq("user_id", user!.id);
      return new Map((data ?? []).map((d) => [d.lesson_slug, d]));
    },
  });

  const saveProgress = useMutation({
    mutationFn: async ({ slug, completed }: { slug: string; completed: boolean }) => {
      if (!user) throw new Error("Sign in to save progress");
      const { error } = await supabase.from("lesson_progress").upsert(
        { user_id: user.id, lesson_slug: slug, completed, progress: completed ? 100 : 50 },
        { onConflict: "user_id,lesson_slug" },
      );
      if (error) throw error;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ["progress", user?.id] });
      qc.invalidateQueries({ queryKey: ["lessons", user?.id] });
      toast.success(v.completed ? "Lesson marked complete · +10 XP" : "Marked in progress");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleSection = (lessonSlug: string, idx: number) => {
    setOpen((o) => {
      const set = new Set(o[lessonSlug] ?? []);
      if (set.has(idx)) set.delete(idx);
      else set.add(idx);
      return { ...o, [lessonSlug]: set };
    });
  };

  const done = track.lessons.filter((l: Lesson) => progress?.get(l.slug)?.completed).length;
  const pct = Math.round((done / track.lessons.length) * 100);

  return (
    <SiteShell>
      <section className={`relative overflow-hidden border-b border-border/60 bg-gradient-to-br ${track.color} text-white`}>
        <div className="absolute inset-0 pattern-kente opacity-15" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Link to="/learn" className="inline-flex items-center gap-1.5 text-sm text-white/85 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All tracks
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <track.icon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Learning track</div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">{track.title}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-white/90">{track.longDesc}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
              <BookOpen className="h-3.5 w-3.5" /> {track.lessons.length} lessons
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> +{track.lessons.length * 10} XP available
            </span>
            {user && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                <Target className="h-3.5 w-3.5" /> {done}/{track.lessons.length} complete · {pct}%
              </span>
            )}
          </div>
          {user && <Progress value={pct} className="mt-4 h-1.5 bg-white/20" />}
        </div>
      </section>

      {!user && (
        <section className="border-b border-border/60 bg-muted/40">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" /> Sign in to save your progress and earn XP as you learn.
            </span>
            <Link to="/auth" search={{ redirect: `/learn/${track.slug}` }}>
              <Button size="sm" className="rounded-full">Sign in</Button>
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {track.lessons.map((lesson: Lesson, idx: number) => {
            const p = progress?.get(lesson.slug);
            const isDone = !!p?.completed;
            const openSet = open[lesson.slug] ?? new Set<number>();

            return (
              <motion.article
                key={lesson.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                id={lesson.slug}
                className={cn(
                  "overflow-hidden rounded-3xl border bg-card card-elevated",
                  isDone ? "border-flag-green/40" : "border-border",
                )}
              >
                <header className="border-b border-border/60 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Lesson {idx + 1} of {track.lessons.length}
                      </div>
                      <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{lesson.title}</h2>
                      <p className="mt-2 text-muted-foreground">{lesson.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                          <Clock className="h-3 w-3" /> {lesson.duration}
                        </span>
                        <span className="rounded-full bg-muted px-2.5 py-1">{lesson.level}</span>
                        {lesson.articles.map((a: string) => (
                          <span key={a} className="rounded-full bg-flag-green/10 px-2.5 py-1 font-medium text-flag-green">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                    {isDone && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-flag-green/10 px-3 py-1.5 text-xs font-semibold text-flag-green">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                      </span>
                    )}
                  </div>
                </header>

                <div className="divide-y divide-border/60">
                  {lesson.sections.map((section: LessonSection, sIdx: number) => {
                    const isOpen = openSet.has(sIdx);
                    return (
                      <div key={sIdx}>
                        <button
                          onClick={() => toggleSection(lesson.slug, sIdx)}
                          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/40 sm:px-8"
                        >
                          <span className="font-display font-semibold">{section.heading}</span>
                          <ChevronDown
                            className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-8">
                                {section.body}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border/60 bg-muted/30 p-6 sm:p-8">
                  <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">Key takeaways</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {lesson.takeaways.map((t: string) => (
                      <li key={t} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flag-green" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button
                      onClick={() => saveProgress.mutate({ slug: lesson.slug, completed: !isDone })}
                      disabled={!user || saveProgress.isPending}
                      variant={isDone ? "outline" : "default"}
                      className="rounded-full"
                    >
                      {isDone ? (
                        <>
                          <Circle className="mr-2 h-4 w-4" /> Mark as not complete
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Update my progress
                        </>
                      )}
                    </Button>
                    {!user && (
                      <Link to="/auth" search={{ redirect: `/learn/${track.slug}` }}>
                        <Button variant="outline" className="rounded-full">
                          <Lock className="mr-2 h-4 w-4" /> Sign in to save
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6">
          <div>
            <div className="font-display text-lg font-semibold">Ready to test what you've learned?</div>
            <p className="text-sm text-muted-foreground">Take a daily quiz and earn XP toward your streak.</p>
          </div>
          <Link to="/quizzes">
            <Button className="rounded-full">Go to quizzes</Button>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
