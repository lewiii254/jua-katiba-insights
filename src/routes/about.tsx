import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Lightbulb, Target } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Jua Katiba" },
      {
        name: "description",
        content: "Jua Katiba is a modern civic education platform for every Kenyan.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="border-b border-border/60 bg-hero-radial">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-flag-green">
            About
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">
            A constitution is only as strong as the citizens who know it.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Jua Katiba turns the Constitution of Kenya 2010 into something every Kenyan — student,
            boda rider, mama mboga, MP — can actually understand and use.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          {
            icon: Lightbulb,
            title: "Educate",
            text: "Bite-sized, beautifully designed lessons in plain language.",
          },
          {
            icon: Target,
            title: "Engage",
            text: "Quizzes, an AI tutor, and tools for real public participation.",
          },
          {
            icon: Heart,
            title: "Empower",
            text: "Free, mobile-first, and built for the next generation of Kenyans.",
          },
        ].map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-8 card-elevated"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-flag-gradient text-white">
              <v.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold">{v.title}</h3>
            <p className="mt-2 text-muted-foreground">{v.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 card-elevated">
          <h2 className="font-display text-2xl font-bold">Built by the Developer</h2>
          <p className="mt-3 text-muted-foreground">
            Jua Katiba is built and maintained by <strong>Marklewis Mutugi</strong> (
            <a
              href="https://github.com/lewiii254"
              target="_blank"
              rel="noreferrer"
              className="text-flag-green underline underline-offset-4"
            >
              lewiii254
            </a>
            ), a Software Engineer, Full Stack Developer, and Tech Educator based in Kenya.
          </p>
          <p className="mt-4 text-muted-foreground">
            If this project helps you and you would like to support or appreciate the work, you can
            send support via <strong>M-Pesa: 0741303497</strong>.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
