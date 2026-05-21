import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Flame, Lock, RotateCcw, Trophy, XCircle, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { dailyQuizzes, findDailyQuiz, type DailyQuiz } from "@/data/daily-quizzes";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quizzes/day/$day")({
  loader: ({ params }) => {
    const day = Number(params.day);
    const quiz = findDailyQuiz(day);
    if (!quiz) throw notFound();
    return { quiz };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.quiz.title} — Jua Katiba` },
          { name: "description", content: `Day ${loaderData.quiz.day} of the 30-day civic challenge: ${loaderData.quiz.theme}.` },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Day not found</h1>
        <p className="mt-3 text-muted-foreground">The 30-day challenge runs from Day 1 to Day 30.</p>
        <Link to="/quizzes" className="mt-6 inline-block">
          <Button className="rounded-full">Back to quizzes</Button>
        </Link>
      </div>
    </SiteShell>
  ),
  component: DailyQuizPage,
});

function DailyQuizPage() {
  const { quiz } = Route.useLoaderData() as { quiz: DailyQuiz };
  const { user } = useAuth();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const attemptId = useMemo(
    () => (typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
    [done, quiz.day],
  );

  const q = quiz.questions[i];
  const progress = ((i + (picked !== null ? 1 : 0)) / quiz.questions.length) * 100;
  const nextDay = quiz.day < 30 ? quiz.day + 1 : null;

  const pick = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.answer) setScore((s) => s + 1);
  };

  const finish = async (finalScore: number) => {
    setDone(true);
    if (!user) return;
    const { error } = await supabase.from("quiz_attempts").upsert(
      {
        user_id: user.id,
        attempt_id: attemptId,
        quiz_slug: `daily-day-${quiz.day}`,
        score: finalScore,
        total: quiz.questions.length,
        xp_earned: finalScore * 20,
      },
      { onConflict: "user_id,attempt_id" },
    );
    if (error) toast.error("Couldn't save your score");
    else toast.success(`+${finalScore * 20} XP saved!`);
  };

  const next = () => {
    if (i + 1 >= quiz.questions.length) finish(score);
    else {
      setI((x) => x + 1);
      setPicked(null);
    }
  };

  const reset = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Link to="/quizzes" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All daily quizzes
          </Link>
          <div className="mt-3 text-xs font-semibold uppercase tracking-widest text-flag-green">
            30-Day Civic Challenge · {quiz.theme}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{quiz.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {quiz.questions.length} questions · up to {quiz.questions.length * 20} XP.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 card-elevated sm:p-10">
          {!done ? (
            <>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Zap className="h-4 w-4 text-gold" /> Q {i + 1} of {quiz.questions.length}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Flame className="h-4 w-4 text-flag-red" /> {score * 20} XP
                </span>
              </div>
              <Progress value={progress} className="mt-3 h-2" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="mt-8"
                >
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">{q.q}</h2>
                  <div className="mt-6 grid gap-3">
                    {q.options.map((opt: string, idx: number) => {
                      const isCorrect = picked !== null && idx === q.answer;
                      const isWrong = picked === idx && idx !== q.answer;
                      return (
                        <button
                          key={opt}
                          onClick={() => pick(idx)}
                          disabled={picked !== null}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border-2 border-border bg-background px-5 py-4 text-left font-medium transition-all hover:border-flag-green hover:bg-flag-green/5",
                            isCorrect && "border-flag-green bg-flag-green/10 text-flag-green",
                            isWrong && "border-flag-red bg-flag-red/10 text-flag-red",
                            picked !== null && "cursor-default",
                          )}
                        >
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 className="h-5 w-5" />}
                          {isWrong && <XCircle className="h-5 w-5" />}
                        </button>
                      );
                    })}
                  </div>

                  {picked !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-2xl bg-muted p-4 text-sm"
                    >
                      <span className="font-semibold">Why: </span>
                      {q.explain}
                    </motion.div>
                  )}

                  {picked !== null && (
                    <Button onClick={next} className="mt-6 w-full rounded-full" size="lg">
                      {i + 1 >= quiz.questions.length ? "See results" : "Next question"}
                    </Button>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-flag-gradient text-white">
                <Trophy className="h-10 w-10" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold">
                {score}/{quiz.questions.length} on Day {quiz.day}
              </h2>
              <p className="mt-2 text-muted-foreground">
                +{score * 20} XP {user ? "saved" : "(sign in to save)"}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <Button onClick={reset} variant="outline" className="rounded-full" size="lg">
                  <RotateCcw className="mr-2 h-4 w-4" /> Try again
                </Button>
                {nextDay && (
                  <Link to="/quizzes/day/$day" params={{ day: String(nextDay) }} onClick={reset}>
                    <Button className="rounded-full" size="lg">Day {nextDay} →</Button>
                  </Link>
                )}
                {!user && (
                  <Link to="/auth" search={{ redirect: `/quizzes/day/${quiz.day}` }}>
                    <Button variant="outline" className="rounded-full" size="lg">
                      <Lock className="mr-2 h-4 w-4" /> Sign in to save XP
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Day strip */}
        <div className="mt-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Jump to a day</div>
          <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-10">
            {dailyQuizzes.map((d) => (
              <Link
                key={d.day}
                to="/quizzes/day/$day"
                params={{ day: String(d.day) }}
                className={cn(
                  "rounded-xl border border-border bg-card py-2 text-center text-sm font-semibold transition-colors hover:border-flag-green hover:text-flag-green",
                  d.day === quiz.day && "border-flag-green bg-flag-green/10 text-flag-green",
                )}
              >
                {d.day}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
