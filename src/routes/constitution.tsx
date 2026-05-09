import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookMarked, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/constitution")({
  head: () => ({
    meta: [
      { title: "Constitution Explorer — Jua Katiba" },
      { name: "description", content: "Browse and search the Constitution of Kenya 2010, chapter by chapter." },
    ],
  }),
  component: ConstitutionPage,
});

const chapters = [
  { n: 1, title: "Sovereignty of the People & Supremacy of the Constitution", articles: "1–3" },
  { n: 2, title: "The Republic", articles: "4–11" },
  { n: 3, title: "Citizenship", articles: "12–18" },
  { n: 4, title: "The Bill of Rights", articles: "19–59" },
  { n: 5, title: "Land and Environment", articles: "60–72" },
  { n: 6, title: "Leadership and Integrity", articles: "73–80" },
  { n: 7, title: "Representation of the People", articles: "81–92" },
  { n: 8, title: "The Legislature", articles: "93–128" },
  { n: 9, title: "The Executive", articles: "129–155" },
  { n: 10, title: "Judiciary", articles: "159–173" },
  { n: 11, title: "Devolved Government", articles: "174–200" },
  { n: 12, title: "Public Finance", articles: "201–231" },
  { n: 13, title: "The Public Service", articles: "232–236" },
  { n: 14, title: "National Security", articles: "238–247" },
  { n: 15, title: "Commissions and Independent Offices", articles: "248–254" },
  { n: 16, title: "Amendment of the Constitution", articles: "255–257" },
  { n: 17, title: "General Provisions", articles: "258–264" },
  { n: 18, title: "Transitional and Consequential Provisions", articles: "Sched." },
];

function ConstitutionPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => chapters.filter((c) => `${c.n} ${c.title}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">Constitution Explorer</div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">The Constitution of Kenya, 2010</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            18 chapters. 264 articles. Searchable, explained in plain language.
          </p>

          <div className="relative mt-8 max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles, e.g. 'right to housing', 'devolution', 'IEBC'..."
              className="h-14 rounded-2xl border-border bg-card pl-12 pr-4 text-base shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <motion.button
              key={c.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              whileHover={{ y: -2 }}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-shadow hover:shadow-soft"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-flag-green/10 font-display text-lg font-bold text-flag-green">
                {c.n}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BookMarked className="h-3 w-3" /> Articles {c.articles}
                </div>
                <h3 className="mt-1 font-display font-semibold leading-tight">{c.title}</h3>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-flag-green" />
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No chapters match "{q}".
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
