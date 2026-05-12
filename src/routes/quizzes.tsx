import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Flame, Lock, RotateCcw, Trophy, XCircle, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Civic Quizzes — Jua Katiba" },
      { name: "description", content: "Gamified quizzes on the Constitution of Kenya, devolution, and the Bill of Rights." },
    ],
  }),
  component: QuizzesPage,
});

const questions = [
  {
    q: "Where does sovereign power in Kenya belong, according to Article 1?",
    options: ["The President", "The People", "Parliament", "The Judiciary"],
    answer: 1,
    explain: "Article 1(1) states all sovereign power belongs to the people of Kenya.",
  },
  {
    q: "How many counties does the Constitution establish?",
    options: ["8", "47", "54", "67"],
    answer: 1,
    explain: "Article 6 and the First Schedule establish 47 counties.",
  },
  {
    q: "Which chapter contains the Bill of Rights?",
    options: ["Chapter 2", "Chapter 4", "Chapter 6", "Chapter 11"],
    answer: 1,
    explain: "Chapter 4 (Articles 19–59) is the Bill of Rights.",
  },
  {
    q: "What is the minimum voting age in Kenya?",
    options: ["16", "18", "21", "25"],
    answer: 1,
    explain: "Article 38 & 83: every adult citizen (18+) has the right to vote.",
  },
  {
    q: "Which Article protects the right to a clean and healthy environment?",
    options: ["Article 27", "Article 42", "Article 56", "Article 68"],
    answer: 1,
    explain: "Article 42 guarantees every person the right to a clean and healthy environment.",
  },
  {
    q: "Which body is responsible for conducting elections in Kenya?",
    options: ["KNCHR", "IEBC", "EACC", "JSC"],
    answer: 1,
    explain: "The Independent Electoral and Boundaries Commission (IEBC) is established by Article 88.",
  },
  {
    q: "What is the term limit of a Kenyan President?",
    options: ["One 5-year term", "Two 5-year terms", "Two 4-year terms", "No limit"],
    answer: 1,
    explain: "Article 142: President serves a maximum of two five-year terms.",
  },
  {
    q: "Which article guarantees freedom of expression?",
    options: ["Article 27", "Article 33", "Article 43", "Article 50"],
    answer: 1,
    explain: "Article 33 protects freedom of expression, with limits on hate speech and incitement.",
  },
  {
    q: "How many members make up a county assembly's elected ward representatives?",
    options: ["Determined per county", "47", "290", "350"],
    answer: 0,
    explain: "Each county has wards delimited by IEBC; the number varies per county.",
  },
  {
    q: "Which chapter of the Constitution covers Leadership and Integrity?",
    options: ["Chapter 4", "Chapter 6", "Chapter 9", "Chapter 12"],
    answer: 1,
    explain: "Chapter 6 sets out leadership and integrity principles for state officers.",
  },
];

function QuizzesPage() {
  const { user } = useAuth();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  // Stable client-generated id makes saving the attempt idempotent — retries
  // (network errors, double-click) will hit the unique (user_id, attempt_id)
  // constraint and upsert instead of duplicating.
  const attemptId = useMemo(
    () => (typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
    [done],
  );

  const q = questions[i];
  const progress = ((i + (picked !== null ? 1 : 0)) / questions.length) * 100;

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
        quiz_slug: "katiba-basics",
        score: finalScore,
        total: questions.length,
        xp_earned: finalScore * 20,
      },
      { onConflict: "user_id,attempt_id" },
    );
    if (error) toast.error("Couldn't save your score");
    else toast.success(`+${finalScore * 20} XP saved to your profile!`);
  };

  const next = () => {
    if (i + 1 >= questions.length) {
      finish(score);
    } else {
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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">Civic Quizzes</div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Test your Katiba IQ</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Earn XP, build streaks, climb the leaderboard.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 card-elevated sm:p-10">
          {!done ? (
            <>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Zap className="h-4 w-4 text-gold" /> Question {i + 1} of {questions.length}
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
                    {q.options.map((opt, idx) => {
                      const isCorrect = picked !== null && idx === q.answer;
                      const isWrong = picked === idx && idx !== q.answer;
                      return (
                        <button
                          key={opt}
                          onClick={() => pick(idx)}
                          disabled={picked !== null}
                          className={cn(
                            "group flex items-center justify-between rounded-2xl border-2 border-border bg-background px-5 py-4 text-left font-medium transition-all hover:border-flag-green hover:bg-flag-green/5",
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
                      {i + 1 >= questions.length ? "See results" : "Next question"}
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
                You scored {score} / {questions.length}
              </h2>
              <p className="mt-2 text-muted-foreground">
                +{score * 20} XP {user ? "saved to your profile" : "(sign in to save)"}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <Button onClick={reset} className="rounded-full" size="lg" variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" /> Try again
                </Button>
                {user ? (
                  <Link to="/dashboard">
                    <Button className="rounded-full" size="lg">View dashboard</Button>
                  </Link>
                ) : (
                  <Link to="/auth" search={{ redirect: "/quizzes" }}>
                    <Button className="rounded-full" size="lg">
                      <Lock className="mr-2 h-4 w-4" /> Sign in to save XP
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
