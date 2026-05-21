import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  CheckCircle2,
  Flame,
  Globe2,
  Heart,
  ScrollText,
  Sparkles,
  Trophy,
  Users,
  Vote,
} from "lucide-react";
import heroImg from "@/assets/hero-civic.jpg";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

const lessons = [
  {
    icon: ScrollText,
    title: "Bill of Rights — Chapter 4",
    desc: "Your fundamental rights & freedoms, from dignity to fair trial.",
    duration: "12 min",
    level: "Beginner",
    accent: "from-flag-green to-emerald-600",
  },
  {
    icon: Building2,
    title: "Devolution & Counties",
    desc: "How the 47 counties share power with the national government.",
    duration: "18 min",
    level: "Intermediate",
    accent: "from-amber-500 to-gold",
  },
  {
    icon: Vote,
    title: "Elections & Public Participation",
    desc: "Voting, recall, referenda — your power between elections.",
    duration: "15 min",
    level: "Beginner",
    accent: "from-flag-red to-rose-600",
  },
  {
    icon: Users,
    title: "National Values & Governance",
    desc: "Article 10: patriotism, rule of law, integrity, sustainable development.",
    duration: "10 min",
    level: "Beginner",
    accent: "from-indigo-500 to-flag-green",
  },
];

const highlights = [
  { num: "Art. 1", title: "Sovereignty of the People", text: "All sovereign power belongs to the people of Kenya." },
  { num: "Art. 10", title: "National Values", text: "Patriotism, rule of law, democracy and participation of the people." },
  { num: "Art. 27", title: "Equality & Non-Discrimination", text: "Every person is equal before the law and has equal protection." },
  { num: "Art. 174", title: "Objects of Devolution", text: "To give powers of self-governance to the people and enhance participation." },
];

const trending = [
  "Public Participation Bill",
  "County Budget 2025/26",
  "IEBC Reforms",
  "Healthcare Devolution",
  "Right to Protest",
  "Digital Rights",
];

const civicPulse = [
  { icon: Vote, label: "Youth voices", metric: "42 county forums this week" },
  { icon: Globe2, label: "Policy watch", metric: "18 active civic debates" },
  { icon: Trophy, label: "Learning streaks", metric: "2,300 learners on fire" },
  { icon: Flame, label: "Daily challenge", metric: "Day 22 opened by 8,400 users" },
];

function Home() {
  return (
    <SiteShell>
      <Hero />
      <CivicPulse />
      <Stats />
      <FeaturedLessons />
      <HowItWorks />
      <ConstitutionHighlights />
      <DailyChallengeTeaser />
      <Testimonials />
      <DailyFact />
      <Trending />
      <CTA />
    </SiteShell>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Learn", text: "Pick a track. Each lesson has expandable sections, real-world examples and key takeaways." },
    { n: "02", title: "Practice", text: "Take the 30-day civic challenge — 5 questions a day, themed by topic. Streaks unlock XP." },
    { n: "03", title: "Act", text: "Use the toolkit: petition templates, county budget timelines, public participation guides." },
  ];
  return (
    <Section eyebrow="How it works" title="From confused citizen to confident participant" desc="Three steps, no jargon, built for daily use.">
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-7"
          >
            <div className="font-display text-6xl font-bold text-gradient">{s.n}</div>
            <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function DailyChallengeTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 sm:p-12"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-flag-green/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-flag-green/10 px-3 py-1 text-xs font-semibold text-flag-green">
              <Sparkles className="h-3.5 w-3.5" /> New · 30-Day Civic Challenge
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl">A month of Katiba, one day at a time.</h3>
            <p className="mt-3 max-w-xl text-muted-foreground">
              30 themed days. 150 questions. Sovereignty, devolution, the Bill of Rights, public finance, public participation — covered.
              Earn up to 3,000 XP and finish the month genuinely informed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/quizzes/day/$day" params={{ day: "1" }}>
                <Button size="lg" className="rounded-full px-6">Start Day 1 <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </Link>
              <Link to="/quizzes">
                <Button size="lg" variant="outline" className="rounded-full px-6">See all 30 days</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg border border-border bg-background/50 text-center text-[10px] font-bold leading-[1.6rem] text-muted-foreground sm:leading-[2rem]"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { name: "Wanjiru, 22", role: "University student, Nairobi", text: "I'd read Article 43 a hundred times in class. Five minutes here and I finally got what 'progressive realisation' means." },
    { name: "Otieno, 34", role: "Boda boda rider, Kisumu", text: "I knew I had rights when arrested. I didn't know I had to be in court within 24 hours. That changed how I move." },
    { name: "Achieng, 41", role: "Public participation officer", text: "I use the toolkit lessons in my ward forums. People show up better prepared. The county budget hearings improved." },
  ];
  return (
    <Section eyebrow="What learners say" title="Built for Kenyans, by the questions Kenyans actually ask" desc="Plain language, real cases, no political angle.">
      <div className="grid gap-5 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex flex-col rounded-3xl border border-border bg-card p-6"
          >
            <blockquote className="font-display text-lg leading-snug">"{q.text}"</blockquote>
            <figcaption className="mt-auto pt-5 text-sm">
              <div className="font-semibold">{q.name}</div>
              <div className="text-muted-foreground">{q.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <div className="pointer-events-none absolute -left-28 top-10 h-56 w-56 rounded-full bg-flag-green/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute inset-0 pattern-kente opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Civic education with energy and clarity
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
            Know your <span className="text-gradient">Katiba</span>.<br />
            Shape your Kenya.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Bite-sized lessons, gamified quizzes and an AI civic assistant that turn the Constitution of Kenya 2010 into
            something you actually understand — and use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/learn">
              <Button size="lg" className="rounded-full px-6 text-base">
                Start learning <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/constitution">
              <Button size="lg" variant="outline" className="rounded-full px-6 text-base">
                Explore the Constitution
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Badge text="Free forever" />
            <Badge text="Mobile-first" />
            <Badge text="Built in 🇰🇪" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Fast lessons", "Interactive quizzes", "Real civic impact"].map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border card-glow">
            <img
              src={heroImg}
              alt="Kenyan citizens raising hands with constitution and Mount Kenya"
              width={1536}
              height={1280}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <Trophy className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Daily streak: 7 days</div>
                  <div className="text-xs text-white/80">Join 12,400 active learners</div>
                </div>
              </div>
            </div>
          </div>

          <FloatingCard
            className="-left-4 top-8 hidden lg:block"
            delay={0.4}
            icon={CheckCircle2}
            title="Quiz: Bill of Rights"
            desc="Score 9/10 · +120 XP"
            tone="green"
          />
          <FloatingCard
            className="-right-4 bottom-10 hidden lg:block"
            delay={0.6}
            icon={Brain}
            title="AI Assistant"
            desc="“Explain Article 43”"
            tone="gold"
          />
        </motion.div>
      </div>
    </section>
  );
}

function CivicPulse() {
  return (
    <section className="border-y border-border/60 bg-card/70">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-flag-green">
          <Sparkles className="h-3.5 w-3.5" /> Live civic pulse
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
          >
            {[...civicPulse, ...civicPulse].map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className="flex min-w-[250px] items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 backdrop-blur"
              >
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-flag-green/10 text-flag-green">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.metric}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-flag-green" />
      {text}
    </span>
  );
}

function FloatingCard({
  icon: Icon,
  title,
  desc,
  className = "",
  delay = 0,
  tone,
}: {
  icon: typeof CheckCircle2;
  title: string;
  desc: string;
  className?: string;
  delay?: number;
  tone: "green" | "gold";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 4, delay: delay + 0.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
      className={`absolute z-10 flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 pr-5 shadow-glow backdrop-blur ${className}`}
    >
      <div
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          tone === "green" ? "bg-flag-green/15 text-flag-green" : "bg-gold/20 text-gold-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </motion.div>
  );
}

function Stats() {
  const stats = [
    ["18", "Chapters"],
    ["264", "Articles"],
    ["47", "Counties"],
    ["12K+", "Learners"],
  ];
  return (
    <section className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="font-display text-4xl font-bold text-gradient">{n}</div>
            <div className="mt-1 text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedLessons() {
  return (
    <Section
      eyebrow="Featured lessons"
      title="Start with the essentials"
      desc="Curated journeys through the most important parts of the Constitution."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {lessons.map((l, i) => (
          <motion.div
            key={l.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 card-elevated"
          >
            <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${l.accent} text-white shadow-lg`}>
              <l.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold">{l.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
            <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-2.5 py-1">{l.level}</span>
              <span>{l.duration}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-flag-green via-gold to-flag-red opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ConstitutionHighlights() {
  return (
    <Section
      eyebrow="Constitution highlights"
      title="The articles every Kenyan should know"
      desc="Pinned by educators, used by activists, taught in schools."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((h, i) => (
          <motion.div
            key={h.num}
            initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-5 rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-glow"
          >
            <div className="flex flex-col items-center">
              <div className="rounded-2xl bg-flag-green/10 px-3 py-2 font-display text-sm font-bold text-flag-green">
                {h.num}
              </div>
              <div className="mt-2 h-full w-px bg-gradient-to-b from-flag-green to-transparent" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">{h.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{h.text}</p>
              <Link to="/constitution" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-flag-green hover:underline">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function DailyFact() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] border border-border bg-flag-gradient p-8 text-white sm:p-12"
      >
        <div className="absolute inset-0 pattern-kente opacity-20" />
        <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15 backdrop-blur">
            <Flame className="h-10 w-10 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Daily Civic Fact</div>
            <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              "The Constitution is the supreme law of the Republic and binds all persons and all State organs."
            </h3>
            <p className="mt-3 text-sm text-white/90">— Article 2(1), Constitution of Kenya 2010</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Trending() {
  return (
    <Section
      eyebrow="Trending civic topics"
      title="What Kenya is talking about"
      desc="Stay informed on the issues shaping our democracy right now."
    >
      <div className="flex flex-wrap gap-3">
        {trending.map((t) => (
          <Link
            key={t}
            to="/issues"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-flag-green hover:bg-flag-green/5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-flag-red group-hover:bg-flag-green" />
            {t}
          </Link>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  const features = [
    { icon: BookOpen, label: "100+ lessons" },
    { icon: Brain, label: "AI civic tutor" },
    { icon: Globe2, label: "All 47 counties" },
    { icon: Heart, label: "Always free" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center sm:p-16">
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-flag-green/20 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold sm:text-5xl">Become a Katiba citizen.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of Kenyans learning their rights, tracking county action, and building a stronger democracy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full px-7">
                Create free account
              </Button>
            </Link>
            <Link to="/quizzes">
              <Button size="lg" variant="outline" className="rounded-full px-7">
                Take a quiz
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {features.map((f) => (
              <span key={f.label} className="inline-flex items-center gap-2">
                <f.icon className="h-4 w-4 text-flag-green" /> {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">{eyebrow}</div>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{desc}</p>
      </div>
      {children}
    </section>
  );
}
