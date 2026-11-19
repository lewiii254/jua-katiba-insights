import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Tag, TrendingUp } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/issues")({
  head: () => ({
    meta: [
      { title: "Current Issues — Jua Katiba" },
      {
        name: "description",
        content: "Civic news, analysis and explainers on the issues shaping Kenya.",
      },
    ],
  }),
  component: IssuesPage,
});

const issues = [
  {
    tag: "Public Finance",
    title: "County Budget 2025/26: What changed and why",
    date: "Today",
    read: "5 min",
    tone: "from-flag-green to-emerald-600",
  },
  {
    tag: "Elections",
    title: "IEBC reconstitution: timelines & implications",
    date: "Yesterday",
    read: "7 min",
    tone: "from-amber-500 to-gold",
  },
  {
    tag: "Bill of Rights",
    title: "The right to protest after Gen-Z's wave of activism",
    date: "2 days ago",
    read: "8 min",
    tone: "from-flag-red to-rose-600",
  },
  {
    tag: "Devolution",
    title: "Healthcare devolution: county wins and gaps",
    date: "3 days ago",
    read: "6 min",
    tone: "from-indigo-500 to-flag-green",
  },
  {
    tag: "Digital Rights",
    title: "Data Protection Act: what every Kenyan should know",
    date: "1 week ago",
    read: "10 min",
    tone: "from-flag-green to-amber-500",
  },
  {
    tag: "Public Participation",
    title: "How to write a memorandum that moves Parliament",
    date: "1 week ago",
    read: "12 min",
    tone: "from-gold to-flag-red",
  },
];

function IssuesPage() {
  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">
            Current Issues
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Civic news, decoded.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every story tied to the Constitution and the law it lives by.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {issues.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card card-elevated"
            >
              <div className={`relative h-44 bg-gradient-to-br ${it.tone}`}>
                <div className="absolute inset-0 pattern-kente opacity-25" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <Tag className="h-3 w-3" /> {it.tag}
                </div>
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur">
                  <TrendingUp className="h-3 w-3" /> Trending
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold leading-snug group-hover:text-flag-green">
                  {it.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {it.date}
                  </span>
                  <span>{it.read} read</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
