import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Building2, Compass, Gavel, Globe2, HandHeart, Scale, Users, Vote } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Jua Katiba" },
      { name: "description", content: "Bite-sized lessons on the Constitution of Kenya, devolution, elections and citizen responsibilities." },
    ],
  }),
  component: LearnPage,
});

const tracks = [
  { icon: Scale, title: "Constitution Foundations", lessons: 12, color: "from-flag-green to-emerald-600", desc: "Sovereignty, supremacy, and the architecture of our nation." },
  { icon: HandHeart, title: "Bill of Rights", lessons: 18, color: "from-flag-red to-rose-600", desc: "Every right in Chapter 4 — explained with real-life cases." },
  { icon: Building2, title: "National & County Government", lessons: 9, color: "from-amber-500 to-gold", desc: "Three arms, two levels — how power actually flows." },
  { icon: Globe2, title: "Devolution", lessons: 10, color: "from-indigo-500 to-flag-green", desc: "What your county can (and cannot) do for you." },
  { icon: Vote, title: "Elections & Public Participation", lessons: 8, color: "from-flag-red to-amber-500", desc: "Voting, recall, referenda, and your voice between cycles." },
  { icon: Gavel, title: "Governance & National Values", lessons: 7, color: "from-flag-green to-flag-black", desc: "Article 10 in your daily life: integrity and accountability." },
  { icon: Users, title: "Citizen Responsibilities", lessons: 6, color: "from-gold to-flag-red", desc: "Beyond rights — what we owe each other and the nation." },
  { icon: Compass, title: "Public Participation Toolkit", lessons: 5, color: "from-flag-green to-amber-500", desc: "Practical guides: petitions, hearings, county budgeting." },
];

function LearnPage() {
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
          {tracks.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 card-elevated"
            >
              <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-white`}>
                <t.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" /> {t.lessons} lessons
                </span>
                <Link to="/constitution" className="inline-flex items-center gap-1 text-sm font-semibold text-flag-green">
                  Start <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
