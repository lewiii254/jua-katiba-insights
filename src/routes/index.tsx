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

function Home() {
  return (
    <SiteShell>
      <Hero />
      <Stats />
      <FeaturedLessons />
      <ConstitutionHighlights />
      <DailyFact />
      <Trending />
      <CTA />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
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
            Civic education for the next generation
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
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
