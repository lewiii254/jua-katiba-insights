import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-flag-gradient text-white">
              <Scale className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">Jua Katiba</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A modern civic education platform empowering every Kenyan to know, live and defend the
            Constitution.
          </p>
        </div>

        <FooterCol
          title="Learn"
          links={[
            ["Constitution Explorer", "/constitution"],
            ["Bill of Rights", "/learn"],
            ["Devolution", "/learn"],
            ["Civic Quizzes", "/quizzes"],
          ]}
        />
        <FooterCol
          title="Engage"
          links={[
            ["Current Issues", "/issues"],
            ["Counties", "/counties"],
            ["Public Participation", "/learn"],
            ["Civic Assistant", "/dashboard"],
          ]}
        />
        <FooterCol
          title="About"
          links={[
            ["Our Mission", "/about"],
            ["Partners", "/about"],
            ["Contact", "/about"],
            ["Privacy", "/about"],
          ]}
        />
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Jua Katiba. Built for the Republic of Kenya.</p>
          <p>Harambee · Uhuru · Umoja</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
