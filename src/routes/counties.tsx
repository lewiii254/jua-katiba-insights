import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/counties")({
  head: () => ({
    meta: [
      { title: "Counties — Jua Katiba" },
      { name: "description", content: "Explore all 47 counties of Kenya — governors, capitals, devolved functions." },
    ],
  }),
  component: CountiesPage,
});

const counties = [
  "Mombasa","Kwale","Kilifi","Tana River","Lamu","Taita-Taveta","Garissa","Wajir","Mandera","Marsabit",
  "Isiolo","Meru","Tharaka-Nithi","Embu","Kitui","Machakos","Makueni","Nyandarua","Nyeri","Kirinyaga",
  "Murang'a","Kiambu","Turkana","West Pokot","Samburu","Trans Nzoia","Uasin Gishu","Elgeyo-Marakwet","Nandi","Baringo",
  "Laikipia","Nakuru","Narok","Kajiado","Kericho","Bomet","Kakamega","Vihiga","Bungoma","Busia",
  "Siaya","Kisumu","Homa Bay","Migori","Kisii","Nyamira","Nairobi",
];

function CountiesPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => counties.filter((c) => c.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">Counties</div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">All 47 counties of Kenya</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Devolution at a glance — the units of government closest to you.
          </p>

          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search county..."
              className="h-12 rounded-2xl bg-card pl-12"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((c, i) => (
            <motion.button
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: Math.min(i, 20) * 0.015 }}
              whileHover={{ y: -3 }}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-shadow hover:shadow-soft"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-flag-green/10 text-flag-green group-hover:bg-flag-green group-hover:text-white">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold">{c}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">County</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
