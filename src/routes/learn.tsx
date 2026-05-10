import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Building2, CheckCircle2, Circle, Compass, Gavel, Globe2, HandHeart, Lock, Scale, Users, Vote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Jua Katiba" },
      { name: "description", content: "Bite-sized lessons on the Constitution of Kenya, devolution, elections and citizen responsibilities." },
    ],
  }),
  component: LearnPage,
});

type Lesson = { slug: string; title: string; body: string };
type Track = { slug: string; icon: typeof Scale; title: string; color: string; desc: string; lessons: Lesson[] };

const tracks: Track[] = [
  {
    slug: "foundations", icon: Scale, title: "Constitution Foundations", color: "from-flag-green to-emerald-600",
    desc: "Sovereignty, supremacy, and the architecture of our nation.",
    lessons: [
      { slug: "foundations-1", title: "Sovereignty of the People", body: "Article 1 affirms that all sovereign power belongs to the people of Kenya. The people exercise this power directly or through elected representatives. Sovereignty is delegated to Parliament, the Executive, and the Judiciary at both national and county levels." },
      { slug: "foundations-2", title: "Supremacy of the Constitution", body: "Article 2 makes the Constitution the supreme law. Any law inconsistent with it is void. Treaties and customary international law form part of the law of Kenya." },
      { slug: "foundations-3", title: "National Values (Article 10)", body: "Patriotism, rule of law, democracy, human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination, integrity, transparency and sustainable development." },
    ],
  },
  {
    slug: "bill-of-rights", icon: HandHeart, title: "Bill of Rights", color: "from-flag-red to-rose-600",
    desc: "Every right in Chapter 4 — explained with real-life cases.",
    lessons: [
      { slug: "bor-1", title: "Right to Life & Dignity", body: "Articles 26 and 28 guarantee the right to life and inherent dignity. The death penalty is permitted but the right to life begins at conception." },
      { slug: "bor-2", title: "Equality & Non-Discrimination", body: "Article 27 forbids discrimination on grounds including race, sex, ethnicity, disability, religion, age, dress, language, or birth." },
      { slug: "bor-3", title: "Freedom of Expression", body: "Article 33 protects expression — but excludes propaganda for war, incitement to violence, hate speech, and advocacy of hatred." },
      { slug: "bor-4", title: "Economic & Social Rights", body: "Article 43: health, accessible housing, food, water, social security and education — to be progressively realised by the State." },
    ],
  },
  {
    slug: "government", icon: Building2, title: "National & County Government", color: "from-amber-500 to-gold",
    desc: "Three arms, two levels — how power actually flows.",
    lessons: [
      { slug: "gov-1", title: "The Three Arms", body: "Legislature makes law (Parliament: National Assembly + Senate). Executive implements (President + Cabinet). Judiciary interprets and protects the Constitution." },
      { slug: "gov-2", title: "The Two Levels", body: "National government deals with foreign affairs, defence, monetary policy. County governments handle health services, agriculture, county roads, pre-primary education and more (Fourth Schedule)." },
    ],
  },
  {
    slug: "devolution", icon: Globe2, title: "Devolution", color: "from-indigo-500 to-flag-green",
    desc: "What your county can (and cannot) do for you.",
    lessons: [
      { slug: "dev-1", title: "Why Devolution?", body: "Article 174: to bring services closer, foster unity through diversity, share resources equitably, and give people powers of self-governance." },
      { slug: "dev-2", title: "County Revenue", body: "Article 203 guarantees counties at least 15% of the most recently audited national revenue. The Equalisation Fund supports marginalised areas." },
    ],
  },
  {
    slug: "elections", icon: Vote, title: "Elections & Public Participation", color: "from-flag-red to-amber-500",
    desc: "Voting, recall, referenda, and your voice between cycles.",
    lessons: [
      { slug: "elec-1", title: "Free & Fair Elections", body: "Article 81 sets principles: secret ballot, free from violence, transparent and administered impartially by the IEBC." },
      { slug: "elec-2", title: "Public Participation", body: "Beyond elections, Articles 10, 118, 196 and 201 require public participation in legislation, county budgeting, and use of public resources." },
    ],
  },
  {
    slug: "values", icon: Gavel, title: "Governance & National Values", color: "from-flag-green to-flag-black",
    desc: "Article 10 in your daily life: integrity and accountability.",
    lessons: [
      { slug: "val-1", title: "Leadership & Integrity (Ch. 6)", body: "State officers hold authority as a public trust. They must avoid conflicts of interest and submit to Article 75 conduct standards." },
    ],
  },
  {
    slug: "responsibilities", icon: Users, title: "Citizen Responsibilities", color: "from-gold to-flag-red",
    desc: "Beyond rights — what we owe each other and the nation.",
    lessons: [
      { slug: "resp-1", title: "Defend the Constitution", body: "Article 3: every person has an obligation to respect, uphold and defend the Constitution." },
      { slug: "resp-2", title: "Civic Duties", body: "Pay taxes, register and vote, participate in public affairs, respect the rights of others, and protect the environment." },
    ],
  },
  {
    slug: "toolkit", icon: Compass, title: "Public Participation Toolkit", color: "from-flag-green to-amber-500",
    desc: "Practical guides: petitions, hearings, county budgeting.",
    lessons: [
      { slug: "tool-1", title: "How to Petition Parliament", body: "Article 119 allows any person to petition Parliament. Submit in writing through the Clerk; Parliament must respond within 60 days." },
      { slug: "tool-2", title: "County Budget Cycle", body: "Counties publish a CIDP and annual budget. Public hearings happen between February and April — that's your moment to influence priorities." },
    ],
  },
];

function LearnPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [active, setActive] = useState<Track | null>(null);

  const { data: progress } = useQuery({
    queryKey: ["progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("lesson_progress").select("lesson_slug,completed").eq("user_id", user!.id);
      return new Set((data ?? []).filter((d) => d.completed).map((d) => d.lesson_slug));
    },
  });

  const completeMutation = useMutation({
    mutationFn: async ({ slug, completed }: { slug: string; completed: boolean }) => {
      if (!user) throw new Error("Sign in to track progress");
      const { error } = await supabase.from("lesson_progress").upsert(
        { user_id: user.id, lesson_slug: slug, completed, progress: completed ? 100 : 0 },
        { onConflict: "user_id,lesson_slug" },
      );
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["progress", user?.id] });
      toast.success(vars.completed ? "Lesson complete! +10 XP" : "Marked incomplete");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const trackProgress = (t: Track) => {
    if (!progress) return 0;
    const done = t.lessons.filter((l) => progress.has(l.slug)).length;
    return Math.round((done / t.lessons.length) * 100);
  };

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">Learn</div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Pick a path. Build your civic mind.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Eight curated tracks covering everything from the supremacy of the Constitution to county budgeting.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => {
            const pct = trackProgress(t);
            return (
              <motion.button
                key={t.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setActive(t)}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 text-left card-elevated"
              >
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-white`}>
                  <t.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <BookOpen className="h-3.5 w-3.5" /> {t.lessons.length} lessons
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-flag-green">
                    {pct > 0 ? `${pct}%` : "Start"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                {pct > 0 && <Progress value={pct} className="mt-3 h-1.5" />}
              </motion.button>
            );
          })}
        </div>
      </section>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {active && (
            <>
              <SheetHeader>
                <div className={`mb-2 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${active.color} text-white`}>
                  <active.icon className="h-6 w-6" />
                </div>
                <SheetTitle className="font-display text-2xl">{active.title}</SheetTitle>
                <SheetDescription>{active.desc}</SheetDescription>
              </SheetHeader>

              {!user && (
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-dashed border-border p-4 text-sm">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Lock className="h-4 w-4" /> Sign in to save progress
                  </span>
                  <Link to="/auth" search={{ redirect: "/learn" }}>
                    <Button size="sm" className="rounded-full">Sign in</Button>
                  </Link>
                </div>
              )}

              <div className="mt-6 space-y-3">
                {active.lessons.map((l, idx) => {
                  const done = progress?.has(l.slug) ?? false;
                  return (
                    <div key={l.slug} className={cn("rounded-2xl border p-4 transition-colors", done ? "border-flag-green/40 bg-flag-green/5" : "border-border bg-card")}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-xs font-semibold text-muted-foreground">{idx + 1}</div>
                        <div className="flex-1">
                          <div className="font-display font-semibold">{l.title}</div>
                          <p className="mt-1.5 text-sm text-muted-foreground">{l.body}</p>
                        </div>
                      </div>
                      <Button
                        variant={done ? "outline" : "default"}
                        size="sm"
                        disabled={!user || completeMutation.isPending}
                        onClick={() => completeMutation.mutate({ slug: l.slug, completed: !done })}
                        className="mt-3 w-full rounded-full"
                      >
                        {done ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Completed</> : <><Circle className="mr-2 h-4 w-4" /> Mark complete</>}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </SiteShell>
  );
}
