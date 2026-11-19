import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { BookMarked, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/constitution")({
  head: () => ({
    meta: [
      { title: "Constitution Explorer — Jua Katiba" },
      {
        name: "description",
        content: "Browse and search the Constitution of Kenya 2010, chapter by chapter.",
      },
    ],
  }),
  component: ConstitutionPage,
});

type Article = { n: string; title: string; summary: string };
type Chapter = { n: number; title: string; articles: string; highlights: Article[] };

const chapters: Chapter[] = [
  {
    n: 1,
    title: "Sovereignty of the People & Supremacy of the Constitution",
    articles: "1–3",
    highlights: [
      {
        n: "1",
        title: "Sovereignty of the people",
        summary:
          "All sovereign power belongs to the people of Kenya and is exercised only in accordance with the Constitution.",
      },
      {
        n: "2",
        title: "Supremacy of the Constitution",
        summary:
          "The Constitution is the supreme law and binds all persons and all State organs at both levels of government.",
      },
      {
        n: "3",
        title: "Defence of the Constitution",
        summary: "Every person has an obligation to respect, uphold and defend the Constitution.",
      },
    ],
  },
  {
    n: 2,
    title: "The Republic",
    articles: "4–11",
    highlights: [
      {
        n: "4",
        title: "Declaration of the Republic",
        summary:
          "Kenya is a sovereign Republic and a multi-party democratic State founded on national values in Article 10.",
      },
      {
        n: "10",
        title: "National values & principles of governance",
        summary:
          "Patriotism, rule of law, democracy, human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination, integrity, transparency, and sustainable development.",
      },
      {
        n: "11",
        title: "Culture",
        summary:
          "Culture is the foundation of the nation and the cumulative civilisation of the Kenyan people.",
      },
    ],
  },
  {
    n: 3,
    title: "Citizenship",
    articles: "12–18",
    highlights: [
      {
        n: "13",
        title: "Retention and acquisition of citizenship",
        summary:
          "Citizenship may be acquired by birth or registration; it is not lost by acquiring another citizenship.",
      },
      {
        n: "14",
        title: "Citizenship by birth",
        summary:
          "A person is a citizen by birth if at the time of birth, either parent is a citizen.",
      },
    ],
  },
  {
    n: 4,
    title: "The Bill of Rights",
    articles: "19–59",
    highlights: [
      {
        n: "27",
        title: "Equality and freedom from discrimination",
        summary:
          "Every person is equal before the law. No one shall be discriminated against on any ground including race, sex, ethnicity, disability, religion, or age.",
      },
      {
        n: "33",
        title: "Freedom of expression",
        summary:
          "Every person has the right to seek, receive and impart information — but not propaganda for war, incitement, or hate speech.",
      },
      {
        n: "37",
        title: "Assembly, demonstration, picketing, petition",
        summary:
          "Every person has the right, peaceably and unarmed, to assemble, demonstrate, picket and present petitions to public authorities.",
      },
      {
        n: "42",
        title: "Environment",
        summary: "Every person has the right to a clean and healthy environment.",
      },
      {
        n: "43",
        title: "Economic & social rights",
        summary:
          "Health, housing, food, water, social security, and education — progressively realised by the State.",
      },
      {
        n: "47",
        title: "Fair administrative action",
        summary:
          "Administrative action must be expeditious, efficient, lawful, reasonable and procedurally fair.",
      },
      {
        n: "50",
        title: "Fair hearing",
        summary:
          "Every person has the right to have any dispute decided in a fair and public hearing before a court or tribunal.",
      },
    ],
  },
  {
    n: 5,
    title: "Land and Environment",
    articles: "60–72",
    highlights: [
      {
        n: "60",
        title: "Principles of land policy",
        summary:
          "Land must be held, used and managed equitably, efficiently, productively and sustainably.",
      },
      {
        n: "69",
        title: "Obligations of the State on environment",
        summary:
          "The State shall ensure sustainable exploitation, utilisation and conservation of the environment and natural resources.",
      },
    ],
  },
  {
    n: 6,
    title: "Leadership and Integrity",
    articles: "73–80",
    highlights: [
      {
        n: "73",
        title: "Responsibilities of leadership",
        summary:
          "Authority assigned to a State officer is a public trust to be exercised in a manner consistent with the purposes of the Constitution.",
      },
      {
        n: "75",
        title: "Conduct of State officers",
        summary:
          "A State officer shall behave in a way that avoids conflict of interest and demeaning the office.",
      },
    ],
  },
  {
    n: 7,
    title: "Representation of the People",
    articles: "81–92",
    highlights: [
      {
        n: "81",
        title: "General principles for the electoral system",
        summary:
          "Free and fair elections by secret ballot, free from violence, intimidation, improper influence or corruption.",
      },
      {
        n: "88",
        title: "Independent Electoral and Boundaries Commission",
        summary: "The IEBC is responsible for conducting and supervising elections and referenda.",
      },
    ],
  },
  {
    n: 8,
    title: "The Legislature",
    articles: "93–128",
    highlights: [
      {
        n: "93",
        title: "Establishment of Parliament",
        summary: "Parliament consists of the National Assembly and the Senate.",
      },
      {
        n: "96",
        title: "Role of the Senate",
        summary: "The Senate represents the counties and protects their interests and governments.",
      },
    ],
  },
  {
    n: 9,
    title: "The Executive",
    articles: "129–155",
    highlights: [
      {
        n: "129",
        title: "Principles of executive authority",
        summary:
          "Executive authority derives from the people of Kenya and shall be exercised in accordance with the Constitution.",
      },
      {
        n: "131",
        title: "Authority of the President",
        summary:
          "The President is the Head of State and Government and Commander-in-Chief of the Defence Forces.",
      },
    ],
  },
  {
    n: 10,
    title: "Judiciary",
    articles: "159–173",
    highlights: [
      {
        n: "159",
        title: "Judicial authority",
        summary:
          "Judicial authority is derived from the people and vests in the courts and tribunals established by the Constitution.",
      },
      {
        n: "160",
        title: "Independence of the Judiciary",
        summary:
          "In the exercise of judicial authority, the Judiciary shall be subject only to the Constitution and the law.",
      },
    ],
  },
  {
    n: 11,
    title: "Devolved Government",
    articles: "174–200",
    highlights: [
      {
        n: "174",
        title: "Objects of devolution",
        summary:
          "To promote democratic and accountable exercise of power; foster national unity by recognising diversity; give powers of self-governance to the people.",
      },
      {
        n: "176",
        title: "County governments",
        summary:
          "There is a county government for each county, consisting of a county assembly and a county executive.",
      },
      {
        n: "186",
        title: "Functions and powers of national & county governments",
        summary: "The Fourth Schedule distributes functions between the two levels of government.",
      },
    ],
  },
  {
    n: 12,
    title: "Public Finance",
    articles: "201–231",
    highlights: [
      {
        n: "201",
        title: "Principles of public finance",
        summary:
          "Openness, accountability, public participation, equitable sharing of revenue and burdens.",
      },
      {
        n: "203",
        title: "Equitable share & other financial laws",
        summary: "At least 15% of national revenue shall be allocated to county governments.",
      },
    ],
  },
  {
    n: 13,
    title: "The Public Service",
    articles: "232–236",
    highlights: [
      {
        n: "232",
        title: "Values and principles of public service",
        summary:
          "High standards of professional ethics, efficient and effective use of resources, accountability for administrative acts.",
      },
    ],
  },
  {
    n: 14,
    title: "National Security",
    articles: "238–247",
    highlights: [
      {
        n: "238",
        title: "Principles of national security",
        summary:
          "National security shall be pursued in compliance with the law and with utmost respect for the rule of law, democracy, human rights, and fundamental freedoms.",
      },
    ],
  },
  {
    n: 15,
    title: "Commissions and Independent Offices",
    articles: "248–254",
    highlights: [
      {
        n: "249",
        title: "Objects, authority & funding",
        summary:
          "Commissions protect the sovereignty of the people, secure observance of democratic values, and promote constitutionalism.",
      },
    ],
  },
  {
    n: 16,
    title: "Amendment of the Constitution",
    articles: "255–257",
    highlights: [
      {
        n: "255",
        title: "Amendment by referendum",
        summary:
          "Certain provisions (sovereignty, Bill of Rights, etc.) may be amended only through a referendum.",
      },
      {
        n: "257",
        title: "Amendment by popular initiative",
        summary:
          "An amendment may be proposed by a popular initiative signed by at least one million registered voters.",
      },
    ],
  },
  {
    n: 17,
    title: "General Provisions",
    articles: "258–264",
    highlights: [
      {
        n: "258",
        title: "Enforcement of the Constitution",
        summary:
          "Every person has the right to institute court proceedings, claiming that the Constitution has been contravened.",
      },
    ],
  },
  {
    n: 18,
    title: "Transitional and Consequential Provisions",
    articles: "Sched.",
    highlights: [
      {
        n: "Sixth Schedule",
        title: "Transitional provisions",
        summary:
          "Provided continuity of government, laws, and institutions during the transition to the 2010 Constitution.",
      },
    ],
  },
];

function ConstitutionPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return chapters;
    return chapters.filter((c) => {
      if (`${c.n} ${c.title}`.toLowerCase().includes(needle)) return true;
      return c.highlights.some(
        (a) =>
          a.title.toLowerCase().includes(needle) ||
          a.summary.toLowerCase().includes(needle) ||
          a.n.toLowerCase().includes(needle),
      );
    });
  }, [q]);

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">
            Constitution Explorer
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            The Constitution of Kenya, 2010
          </h1>
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

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {filtered.map((c, i) => {
            const isOpen = open === c.n;
            return (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.2) }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : c.n)}
                  className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-muted/40"
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
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180 text-flag-green",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-border/60 bg-background/40"
                    >
                      <div className="space-y-3 p-5">
                        {c.highlights.map((a) => (
                          <div key={a.n} className="rounded-xl border border-border/60 bg-card p-4">
                            <div className="flex items-baseline gap-2">
                              <span className="font-display text-sm font-bold text-flag-green">
                                Art. {a.n}
                              </span>
                              <span className="font-semibold">{a.title}</span>
                            </div>
                            <p className="mt-1.5 text-sm text-muted-foreground">{a.summary}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No chapters match "{q}".
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
