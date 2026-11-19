import {
  BookOpen,
  Building2,
  Compass,
  Gavel,
  Globe2,
  HandHeart,
  Scale,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";

export type LessonSection = { heading: string; body: string };
export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  sections: LessonSection[];
  takeaways: string[];
  articles: string[];
};
export type Track = {
  slug: string;
  icon: LucideIcon;
  title: string;
  color: string;
  desc: string;
  longDesc: string;
  lessons: Lesson[];
};

export const tracks: Track[] = [
  {
    slug: "foundations",
    icon: Scale,
    title: "Constitution Foundations",
    color: "from-flag-green to-emerald-600",
    desc: "Sovereignty, supremacy, and the architecture of our nation.",
    longDesc:
      "Every right, every institution, every act of government in Kenya flows from a handful of foundational ideas in Chapters 1 and 2 of the Constitution. This track unpacks them — sovereignty, supremacy, citizenship, national symbols and the values in Article 10 — so you can read any later chapter with confidence.",
    lessons: [
      {
        slug: "foundations-1",
        title: "Sovereignty of the People",
        summary: "Where power begins — and to whom it returns.",
        duration: "8 min",
        level: "Beginner",
        articles: ["Article 1", "Article 2", "Article 3"],
        sections: [
          {
            heading: "All power belongs to the people",
            body: "Article 1(1) is the opening promise of the Constitution: 'All sovereign power belongs to the people of Kenya.' This is not symbolic. It means every institution — Parliament, the Presidency, the Judiciary, county governments — holds power on loan from citizens, and must use it for citizens.",
          },
          {
            heading: "Direct and delegated exercise",
            body: "Article 1(2) allows the people to exercise that power directly (through referenda, public participation, recall of MPs, petitions) or indirectly through elected representatives. Both routes are equally legitimate; the indirect route is not a substitute for the direct one.",
          },
          {
            heading: "Two levels of government",
            body: "Article 1(4) splits delegated power between the national government and 47 county governments. Neither is subordinate to the other — they are 'distinct and inter-dependent' (Article 6).",
          },
          {
            heading: "Defending the Constitution",
            body: "Article 3 places a duty on every person — citizen or not — to 'respect, uphold and defend' the Constitution. Refusing an unconstitutional order, blowing the whistle on corruption, or attending a public participation forum are all forms of defending the Constitution.",
          },
        ],
        takeaways: [
          "Sovereignty is yours; institutions are stewards.",
          "You can act directly — referenda, petitions, recall, public participation.",
          "National and county governments are equal partners, not parent and child.",
          "Defending the Constitution is a duty, not a favour.",
        ],
      },
      {
        slug: "foundations-2",
        title: "Supremacy of the Constitution",
        summary: "Why the Constitution beats every other law.",
        duration: "7 min",
        level: "Beginner",
        articles: ["Article 2"],
        sections: [
          {
            heading: "The supreme law",
            body: "Article 2(1) declares the Constitution the supreme law of the Republic. Any other law — Act of Parliament, county legislation, customary rule, presidential decree — that is inconsistent with it is void to the extent of the inconsistency (Article 2(4)).",
          },
          {
            heading: "International law in Kenya",
            body: "Article 2(5) makes general rules of international law part of the law of Kenya, and Article 2(6) does the same for treaties Kenya has ratified. This is how international human rights, trade and environmental obligations enter Kenyan courts.",
          },
          {
            heading: "No one is above it",
            body: "Article 2(3) is blunt: 'The validity or legality of this Constitution is not subject to challenge by or before any court or other State organ.' Even courts cannot strike it down — only the people, through the amendment process in Chapter 16, can change it.",
          },
        ],
        takeaways: [
          "If any law contradicts the Constitution, the Constitution wins.",
          "Ratified treaties become enforceable Kenyan law automatically.",
          "Only the people — through the Chapter 16 process — can amend the Constitution.",
        ],
      },
      {
        slug: "foundations-3",
        title: "National Values (Article 10)",
        summary: "The moral compass binding every public actor.",
        duration: "10 min",
        level: "Beginner",
        articles: ["Article 10"],
        sections: [
          {
            heading: "When the values apply",
            body: "Article 10 binds every State organ, State officer, public officer and 'all persons' whenever any of them applies or interprets the Constitution, enacts/applies any law, or makes/implements public policy. In practice, this means almost every government decision is reviewable against these values.",
          },
          {
            heading: "The values, in plain language",
            body: "Patriotism, national unity, sharing and devolution of power, rule of law, democracy and participation of the people; human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination and protection of the marginalised; good governance, integrity, transparency and accountability; and sustainable development.",
          },
          {
            heading: "Why this matters in court",
            body: "Courts have used Article 10 to invalidate budgets passed without public participation, to strike down appointments that ignored gender balance, and to require transparency in procurement. It is not a wish-list — it is enforceable.",
          },
        ],
        takeaways: [
          "Article 10 applies to every public decision, big or small.",
          "Public participation is a constitutional value, not a courtesy.",
          "Courts routinely strike down decisions that ignore Article 10.",
        ],
      },
      {
        slug: "foundations-4",
        title: "Citizenship",
        summary: "Who is Kenyan, and what does that mean?",
        duration: "9 min",
        level: "Beginner",
        articles: ["Article 12", "Article 13", "Article 14", "Article 16"],
        sections: [
          {
            heading: "Entitlements of citizens",
            body: "Article 12 guarantees every citizen the rights, privileges and benefits of citizenship and a Kenyan passport and any document of registration or identification issued to citizens.",
          },
          {
            heading: "How citizenship is acquired",
            body: "By birth (Article 14) — if either parent is Kenyan, you are Kenyan, regardless of where you were born. By registration (Article 15) — for spouses of 7+ years, lawful residents of 7+ years, and children adopted by citizens.",
          },
          {
            heading: "Dual citizenship",
            body: "Article 16 expressly allows dual citizenship for Kenyans by birth. They do not lose Kenyan citizenship by acquiring another, though some public offices (President, MP, judge) have eligibility rules.",
          },
        ],
        takeaways: [
          "Kenyan by birth = Kenyan for life, even with another passport.",
          "A foreign spouse can register after 7 years of marriage.",
          "Citizenship is more than identity — it carries enforceable rights.",
        ],
      },
    ],
  },
  {
    slug: "bill-of-rights",
    icon: HandHeart,
    title: "Bill of Rights",
    color: "from-flag-red to-rose-600",
    desc: "Every right in Chapter 4 — explained with real-life cases.",
    longDesc:
      "Chapter 4 is the heart of the 2010 Constitution. It runs from Article 19 to Article 59 and is the most progressive Bill of Rights in Africa — covering civil, political, economic, social and cultural rights, and creating real mechanisms to enforce them. This track walks you through the rights you'll use most.",
    lessons: [
      {
        slug: "bor-1",
        title: "Right to Life & Dignity",
        summary: "The two anchor rights of the Bill of Rights.",
        duration: "9 min",
        level: "Beginner",
        articles: ["Article 26", "Article 28", "Article 29"],
        sections: [
          {
            heading: "Right to life",
            body: "Article 26 protects the right to life, beginning at conception. Life may not be deliberately deprived except as authorised by the Constitution or another law. The death penalty remains lawful but in 2017 the Supreme Court (Muruatetu v Republic) held the mandatory death penalty for murder unconstitutional.",
          },
          {
            heading: "Human dignity",
            body: "Article 28 says every person has inherent dignity and the right to have that dignity respected and protected. This anchors many other rights — privacy, fair labour, freedom from torture — and is non-derogable.",
          },
          {
            heading: "Freedom and security of the person",
            body: "Article 29 protects you from arbitrary arrest, torture, cruel/inhuman/degrading treatment, and corporal punishment. The police cannot detain you without a clear lawful reason.",
          },
        ],
        takeaways: [
          "Mandatory death sentences are unconstitutional (Muruatetu, 2017).",
          "Dignity is non-derogable — even in emergencies, the State cannot strip it.",
          "Arbitrary detention is unconstitutional; you have the right to know why.",
        ],
      },
      {
        slug: "bor-2",
        title: "Equality & Non-Discrimination",
        summary: "Article 27 — the equality engine.",
        duration: "10 min",
        level: "Beginner",
        articles: ["Article 27"],
        sections: [
          {
            heading: "Equal before the law",
            body: "Article 27(1) guarantees equality before the law and equal protection and equal benefit of the law. This goes beyond formal equality to substantive equality — sometimes treating people differently is required to achieve real equality.",
          },
          {
            heading: "Protected grounds",
            body: "Article 27(4) forbids discrimination on race, sex, pregnancy, marital status, health status, ethnic or social origin, colour, age, disability, religion, conscience, belief, culture, dress, language or birth.",
          },
          {
            heading: "Two-thirds gender rule",
            body: "Article 27(8) requires the State to ensure no more than two-thirds of members of any elective or appointive body are of the same gender. Parliament has repeatedly failed to enact enabling legislation — the Supreme Court has flagged this as a constitutional crisis.",
          },
          {
            heading: "Affirmative action",
            body: "Article 27(6) allows legislative and other measures (including affirmative action programmes) to redress past disadvantage faced by groups or individuals.",
          },
        ],
        takeaways: [
          "Equality can require unequal treatment — that's substantive equality.",
          "The two-thirds gender rule applies to every appointive body, not just Parliament.",
          "Affirmative action is constitutionally protected, not optional charity.",
        ],
      },
      {
        slug: "bor-3",
        title: "Freedom of Expression",
        summary: "What you can say — and where the line is.",
        duration: "8 min",
        level: "Intermediate",
        articles: ["Article 33", "Article 34"],
        sections: [
          {
            heading: "What is protected",
            body: "Article 33 protects the right to seek, receive or impart information or ideas; freedom of artistic creativity; and academic freedom and freedom of scientific research.",
          },
          {
            heading: "What is not protected",
            body: "Article 33(2) carves out four exclusions: propaganda for war; incitement to violence; hate speech; advocacy of hatred that constitutes ethnic incitement, vilification of others, or incitement to cause harm, or that is based on any discrimination ground in Article 27(4).",
          },
          {
            heading: "Media freedom",
            body: "Article 34 separately guarantees freedom of the media. The State may not exercise control over or interfere with the editorial independence of any media. Penalising journalists for protecting sources is presumptively unconstitutional.",
          },
        ],
        takeaways: [
          "Government criticism is fully protected; hate speech is not.",
          "Editorial independence is a constitutional right of media houses.",
          "Online speech enjoys the same protection as offline speech.",
        ],
      },
      {
        slug: "bor-4",
        title: "Economic & Social Rights (Article 43)",
        summary: "Health, housing, food, water, education, social security.",
        duration: "12 min",
        level: "Intermediate",
        articles: ["Article 20", "Article 21", "Article 43"],
        sections: [
          {
            heading: "The promise",
            body: "Article 43 guarantees the highest attainable standard of health (including reproductive health), accessible and adequate housing and reasonable sanitation, freedom from hunger and adequate food of acceptable quality, clean and safe water, social security, and education.",
          },
          {
            heading: "Progressive realisation",
            body: "Article 21(2) requires the State to take 'legislative, policy and other measures, including the setting of standards, to achieve the progressive realisation' of these rights. The State must show it is moving forward, not standing still.",
          },
          {
            heading: "The minimum core",
            body: "Even with progressive realisation, courts have recognised a 'minimum core' — basic shelter, emergency healthcare, primary education — that must be provided immediately, not over time.",
          },
        ],
        takeaways: [
          "Social rights are real, justiciable rights — not aspirations.",
          "The State must justify any failure to progress.",
          "A minimum core (basic shelter, ER care, primary school) is immediate.",
        ],
      },
      {
        slug: "bor-5",
        title: "Rights of Arrested Persons",
        summary: "The rules every officer must follow.",
        duration: "8 min",
        level: "Beginner",
        articles: ["Article 49", "Article 50"],
        sections: [
          {
            heading: "On arrest",
            body: "Article 49(1) entitles you to be informed promptly, in a language you understand, of the reason for arrest; the right to remain silent; the right to communicate with an advocate; the right not to be compelled to confess; the right to be held separately from convicts; the right to be brought before a court within 24 hours (or the next court day).",
          },
          {
            heading: "Right to fair trial",
            body: "Article 50 guarantees a fair, public hearing before a court; presumption of innocence; the right to be informed of the charge with sufficient detail; adequate time and facilities to prepare a defence; the right to legal representation (state-funded if substantial injustice would otherwise result).",
          },
        ],
        takeaways: [
          "Police must produce you in court within 24 hours.",
          "Silence is a constitutional right, not an admission.",
          "If you cannot afford a lawyer and injustice would result, the State must pay.",
        ],
      },
    ],
  },
  {
    slug: "government",
    icon: Building2,
    title: "National & County Government",
    color: "from-amber-500 to-gold",
    desc: "Three arms, two levels — how power actually flows.",
    longDesc:
      "Power in Kenya is split horizontally (Legislature, Executive, Judiciary) and vertically (national and county). Understanding both splits is the difference between knowing who to blame and knowing who to fix it.",
    lessons: [
      {
        slug: "gov-1",
        title: "The Three Arms",
        summary: "Separation of powers in practice.",
        duration: "10 min",
        level: "Beginner",
        articles: ["Article 93", "Article 129", "Article 159"],
        sections: [
          {
            heading: "Legislature (Parliament)",
            body: "Article 93 establishes a bicameral Parliament: the National Assembly (representing the people and the constituencies) and the Senate (representing the counties). Parliament makes law, oversees the Executive, approves budgets and ratifies treaties.",
          },
          {
            heading: "Executive",
            body: "Article 129 vests executive authority in the President, the Deputy President and the Cabinet. The Executive implements laws, conducts foreign affairs, commands the defence forces, and is collectively accountable to Parliament.",
          },
          {
            heading: "Judiciary",
            body: "Article 159 vests judicial authority in the courts and tribunals, derived from the people. The Supreme Court, Court of Appeal, High Court, magistrates' courts and tribunals interpret the law, settle disputes and enforce the Constitution.",
          },
        ],
        takeaways: [
          "Parliament has two houses — one for people, one for counties.",
          "The Executive can act only under powers given by law or the Constitution.",
          "Judicial authority comes from the people — courts serve citizens, not the State.",
        ],
      },
      {
        slug: "gov-2",
        title: "The Two Levels",
        summary: "National vs county functions in the Fourth Schedule.",
        duration: "11 min",
        level: "Intermediate",
        articles: ["Article 6", "Article 186", "Fourth Schedule"],
        sections: [
          {
            heading: "National functions",
            body: "The Fourth Schedule (Part 1) gives the national government: foreign affairs, defence, national security, immigration, monetary policy, energy regulation, education policy and universities, national referral hospitals, national roads, and disaster management.",
          },
          {
            heading: "County functions",
            body: "Part 2 gives counties: county health services, agriculture (including crop and animal husbandry), trade development and regulation, county planning, pre-primary education, village polytechnics, county roads, county public works, and firefighting.",
          },
          {
            heading: "When functions overlap",
            body: "Article 186(2) says functions not specifically assigned are residual to the national government. Article 187 allows transfer of functions between levels by agreement, with the resources following the function.",
          },
        ],
        takeaways: [
          "Health, agriculture, roads and pre-primary are county business.",
          "Defence, foreign affairs and monetary policy are strictly national.",
          "Functions can transfer between levels — but money must follow.",
        ],
      },
    ],
  },
  {
    slug: "devolution",
    icon: Globe2,
    title: "Devolution",
    color: "from-indigo-500 to-flag-green",
    desc: "What your county can (and cannot) do for you.",
    longDesc:
      "Devolution is the single biggest structural reform of the 2010 Constitution. 47 counties got their own governments, assemblies, budgets, and at least 15% of national revenue. This track explains how it works and how to make it work for you.",
    lessons: [
      {
        slug: "dev-1",
        title: "Why Devolution?",
        summary: "Article 174 — the nine objects of devolution.",
        duration: "9 min",
        level: "Beginner",
        articles: ["Article 174", "Article 175"],
        sections: [
          {
            heading: "The objects",
            body: "Article 174 lists why we devolved: to promote democratic and accountable exercise of power; foster national unity by recognising diversity; give powers of self-governance to the people; recognise the right of communities to manage their own affairs; protect and promote the interests and rights of minorities and marginalised communities; promote social and economic development and accessible services; ensure equitable sharing of resources; facilitate decentralisation; and enhance checks and balances.",
          },
          {
            heading: "Core principles",
            body: "Article 175 anchors devolution on three principles: county governments must reflect the diversity of their people; have reliable sources of revenue; and no more than two-thirds of any single gender in their assemblies and executive committees.",
          },
        ],
        takeaways: [
          "Devolution exists to bring power closer and protect minorities.",
          "Counties must have reliable, predictable funding.",
          "Two-thirds gender rule applies inside counties too.",
        ],
      },
      {
        slug: "dev-2",
        title: "County Revenue",
        summary: "Equitable share, conditional grants, and the Equalisation Fund.",
        duration: "10 min",
        level: "Intermediate",
        articles: ["Article 202", "Article 203", "Article 204"],
        sections: [
          {
            heading: "Equitable share",
            body: "Article 203(2) guarantees counties at least 15% of the most recently audited and approved national revenue. The actual share is set annually by the Division of Revenue Act and shared between counties via the County Allocation of Revenue Act.",
          },
          {
            heading: "Conditional and unconditional grants",
            body: "The national government may also give counties conditional grants (for specific purposes) or unconditional grants (for general use), in addition to the equitable share.",
          },
          {
            heading: "Equalisation Fund",
            body: "Article 204 establishes an Equalisation Fund equal to 0.5% of audited national revenue, used over 20 years to bring marginalised areas up to the standard of services enjoyed by the rest of the nation.",
          },
        ],
        takeaways: [
          "Counties get at least 15% of national revenue — by law.",
          "Conditional grants are tied to specific projects; unconditional grants are free.",
          "The Equalisation Fund targets historically marginalised areas.",
        ],
      },
      {
        slug: "dev-3",
        title: "County Structures",
        summary: "Governor, county assembly, executive committee.",
        duration: "8 min",
        level: "Beginner",
        articles: ["Article 176", "Article 179", "Article 185"],
        sections: [
          {
            heading: "County government",
            body: "Each county has a government consisting of a county assembly (legislative) and a county executive (executive). The Governor heads the executive; the Speaker presides over the assembly.",
          },
          {
            heading: "The County Executive Committee (CEC)",
            body: "Article 179 gives the Governor power to appoint a Deputy Governor and members of the CEC. CEC members run the departments (Health, Roads, Agriculture, etc.) and are accountable to the assembly.",
          },
          {
            heading: "The County Assembly",
            body: "Article 185 vests legislative authority in the assembly. It approves county budgets, passes county legislation, oversees the executive, and can remove the Governor through impeachment.",
          },
        ],
        takeaways: [
          "Counties mirror the national structure — executive and legislature.",
          "Your MCA is your closest legislator. Use them.",
          "Governors can be impeached by the county assembly and Senate.",
        ],
      },
    ],
  },
  {
    slug: "elections",
    icon: Vote,
    title: "Elections & Public Participation",
    color: "from-flag-red to-amber-500",
    desc: "Voting, recall, referenda, and your voice between cycles.",
    longDesc:
      "Voting is the loudest form of citizenship, but it isn't the only one. The Constitution gives you tools all year round: recall, referenda, petitions, county public participation, and the right to information.",
    lessons: [
      {
        slug: "elec-1",
        title: "Free & Fair Elections",
        summary: "The Article 81 standard.",
        duration: "8 min",
        level: "Beginner",
        articles: ["Article 81", "Article 82", "Article 88"],
        sections: [
          {
            heading: "Principles of an electoral system",
            body: "Article 81: freedom of citizens to exercise political rights; no more than two-thirds of members of elective bodies of the same gender; fair representation of persons with disabilities; universal suffrage based on the aspiration for fair representation and equality of vote; and free and fair elections that are by secret ballot, free from violence, intimidation, improper influence or corruption, conducted by an independent body, transparent, and administered impartially.",
          },
          {
            heading: "The IEBC",
            body: "Article 88 establishes the Independent Electoral and Boundaries Commission, responsible for the continuous registration of voters, delimitation of constituencies and wards, regulation of nomination of candidates, voter education, and conduct of elections and referenda.",
          },
        ],
        takeaways: [
          "An election can be annulled if its conduct fails Article 81.",
          "The IEBC is constitutionally independent — no executive control.",
          "Voter education is an IEBC duty, not an NGO favour.",
        ],
      },
      {
        slug: "elec-2",
        title: "Public Participation",
        summary: "How to be heard between elections.",
        duration: "10 min",
        level: "Intermediate",
        articles: ["Article 10", "Article 118", "Article 196", "Article 201"],
        sections: [
          {
            heading: "Public participation is a constitutional value",
            body: "Article 10(2)(a) makes participation of the people one of the national values. It is not an event — it is a continuous requirement.",
          },
          {
            heading: "In Parliament",
            body: "Article 118 requires Parliament to facilitate public participation in legislative and other business, and to conduct its business in an open manner.",
          },
          {
            heading: "In counties",
            body: "Article 196 puts the same duty on county assemblies. Article 201(a) makes openness, accountability and public participation governing principles of public finance.",
          },
          {
            heading: "What counts as 'meaningful' participation",
            body: "Courts have ruled that mere notice is not enough. There must be reasonable notice, accessible venues, time to consider documents, and a genuine opportunity to influence the outcome.",
          },
        ],
        takeaways: [
          "Participation must be meaningful — not a formality.",
          "Budget hearings (Feb–April) are your annual leverage point.",
          "If you weren't heard, the law can be challenged on that basis.",
        ],
      },
      {
        slug: "elec-3",
        title: "Recall of Members of Parliament",
        summary: "When elected isn't forever.",
        duration: "7 min",
        level: "Intermediate",
        articles: ["Article 104"],
        sections: [
          {
            heading: "The right to recall",
            body: "Article 104 gives voters the right to recall their MP before the end of their term. The Elections Act sets the procedure — a petition with grounds (e.g. violation of Chapter 6) signed by 30% of registered voters in the constituency.",
          },
          {
            heading: "Grounds for recall",
            body: "Recall is not for policy disagreement. Grounds are: violating Chapter 6 (leadership and integrity); mismanagement of public resources; conviction of an offence under the Elections Act.",
          },
        ],
        takeaways: [
          "Recall is real, but the bar is high (30% of registered voters).",
          "You cannot recall an MP just for unpopular votes.",
          "Recall petitions trigger a by-election if successful.",
        ],
      },
    ],
  },
  {
    slug: "values",
    icon: Gavel,
    title: "Governance & National Values",
    color: "from-flag-green to-flag-black",
    desc: "Article 10 in your daily life: integrity and accountability.",
    longDesc:
      "Leadership in Kenya is a public trust. Chapter 6 of the Constitution sets out what that means in practice and gives citizens — and courts — tools to hold state officers to it.",
    lessons: [
      {
        slug: "val-1",
        title: "Leadership & Integrity (Chapter 6)",
        summary: "The rules state officers swear to live by.",
        duration: "10 min",
        level: "Intermediate",
        articles: ["Article 73", "Article 75", "Article 80"],
        sections: [
          {
            heading: "Authority as a public trust",
            body: "Article 73 declares that the authority assigned to a state officer is a public trust, to be exercised in a manner consistent with the purposes and objects of the Constitution, to demonstrate respect for the people, to bring honour to the nation and dignity to the office, and to promote public confidence in the integrity of the office.",
          },
          {
            heading: "Conduct of state officers",
            body: "Article 75 forbids state officers from placing themselves in positions of conflict of interest, compromising public/official interests in favour of personal interests, or demeaning the office. Breach grounds removal.",
          },
          {
            heading: "Enforcement",
            body: "Article 80 directs Parliament to enact legislation to establish procedures and mechanisms for the effective administration of Chapter 6. The Leadership and Integrity Act and the EACC Act do much of this work.",
          },
        ],
        takeaways: [
          "Public office is a trust — not a prize.",
          "Conflicts of interest must be declared, not hidden.",
          "Breach of Chapter 6 is a removal-grade offence.",
        ],
      },
      {
        slug: "val-2",
        title: "Independent Commissions",
        summary: "The watchdogs Chapter 15 created.",
        duration: "9 min",
        level: "Intermediate",
        articles: ["Article 248", "Article 249"],
        sections: [
          {
            heading: "What Chapter 15 set up",
            body: "Article 248 establishes 10 commissions and 2 independent offices — including the KNCHR, IEBC, EACC, CRA, NPSC, SRC, TSC, Auditor-General and Controller of Budget. Their job: protect the sovereignty of the people, secure the observance of democratic values, and promote constitutionalism.",
          },
          {
            heading: "Independence",
            body: "Article 249(2) protects them from direction or control by any person or authority. They report to the public — through Parliament — but they don't take orders from the Executive.",
          },
        ],
        takeaways: [
          "Independent commissions are constitutional, not statutory — Parliament cannot abolish them.",
          "Their independence is enforceable in court.",
          "Knowing which commission handles which complaint is half the battle.",
        ],
      },
    ],
  },
  {
    slug: "responsibilities",
    icon: Users,
    title: "Citizen Responsibilities",
    color: "from-gold to-flag-red",
    desc: "Beyond rights — what we owe each other and the nation.",
    longDesc:
      "Citizenship is a two-way street. The Constitution lists what we are owed and what we owe. This track focuses on the second half.",
    lessons: [
      {
        slug: "resp-1",
        title: "Defend the Constitution",
        summary: "The everyday duty of every Kenyan.",
        duration: "6 min",
        level: "Beginner",
        articles: ["Article 3"],
        sections: [
          {
            heading: "Article 3 in plain terms",
            body: "Article 3(1): 'Every person has an obligation to respect, uphold and defend this Constitution.' Article 3(2): 'Any attempt to establish a government otherwise than in compliance with this Constitution is unlawful.'",
          },
          {
            heading: "What this looks like in life",
            body: "Refusing to pay a bribe, attending a public participation forum, signing a petition, voting, joining a peaceful protest, reporting corruption, voting an MCA out — all are acts of defending the Constitution.",
          },
        ],
        takeaways: [
          "Defending the Constitution is not the army's job alone.",
          "Small daily acts (refusing bribes, voting, showing up) count.",
          "Any unconstitutional takeover is — by Article 3 — already illegal.",
        ],
      },
      {
        slug: "resp-2",
        title: "Civic Duties in Practice",
        summary: "Tax, vote, participate, protect.",
        duration: "8 min",
        level: "Beginner",
        articles: ["Article 209", "Article 38", "Article 69"],
        sections: [
          {
            heading: "Pay your taxes",
            body: "Article 209 establishes the power to impose taxes (income, VAT, customs, excise) and gives counties the power to levy property and entertainment taxes. Paying tax is a constitutional act of citizenship.",
          },
          {
            heading: "Register and vote",
            body: "Article 38 protects the right to vote — but also the right to be registered, to be a candidate, to form or join a political party. Use it.",
          },
          {
            heading: "Protect the environment",
            body: "Article 69(2) places an obligation on every person 'to cooperate with State organs and other persons to protect and conserve the environment and ensure ecologically sustainable development.'",
          },
        ],
        takeaways: [
          "Tax compliance is a civic duty, not a political opinion.",
          "Voting is a right AND an act of constitutional defence.",
          "Environmental protection is on every citizen, not just NEMA.",
        ],
      },
    ],
  },
  {
    slug: "toolkit",
    icon: Compass,
    title: "Public Participation Toolkit",
    color: "from-flag-green to-amber-500",
    desc: "Practical guides: petitions, hearings, county budgeting.",
    longDesc:
      "The hard part of civic life isn't theory — it's process. This track gives you the templates and timelines that actually move policy.",
    lessons: [
      {
        slug: "tool-1",
        title: "How to Petition Parliament",
        summary: "Article 119 step by step.",
        duration: "8 min",
        level: "Intermediate",
        articles: ["Article 119"],
        sections: [
          {
            heading: "What you can ask for",
            body: "Article 119 lets any person petition Parliament to consider any matter within its authority, including to enact, amend or repeal any legislation.",
          },
          {
            heading: "The format",
            body: "Address the petition to the Clerk of the relevant House. State the prayer (what you want done), the facts, and identify the petitioner(s). National Assembly Standing Orders prescribe the form.",
          },
          {
            heading: "Timeline",
            body: "The Clerk has 7 days to admit or reject. Once admitted, the petition is committed to the relevant departmental committee, which must report back within 60 calendar days.",
          },
        ],
        takeaways: [
          "Any single person can petition — no signatures required.",
          "Parliament must respond within 60 days of admission.",
          "Use the Clerk's template — it speeds admission.",
        ],
      },
      {
        slug: "tool-2",
        title: "The County Budget Cycle",
        summary: "Six months when your voice matters most.",
        duration: "10 min",
        level: "Intermediate",
        articles: ["Article 201", "PFM Act, 2012"],
        sections: [
          {
            heading: "September — CBROP",
            body: "The County Budget Review and Outlook Paper looks back at last year and signals priorities for next year. Read it; it tells you where the money will go.",
          },
          {
            heading: "February — CFSP",
            body: "The County Fiscal Strategy Paper is the big one — sets sector ceilings and policy. Public hearings are mandatory. This is your single biggest leverage point.",
          },
          {
            heading: "April — Budget estimates",
            body: "The Governor tables estimates by 30 April. The assembly debates and passes the Appropriation Act by 30 June.",
          },
          {
            heading: "How to participate",
            body: "Attend ward and sub-county hearings, file written memoranda with the Budget & Appropriations Committee, follow your county on social media for hearing dates, and join civic budget circles.",
          },
        ],
        takeaways: [
          "Feb–April is when budgets are actually decided.",
          "Written memoranda carry more weight than meeting comments.",
          "Most counties skip notice; demand it in writing.",
        ],
      },
      {
        slug: "tool-3",
        title: "Access to Information",
        summary: "Use Article 35 to get the documents.",
        duration: "7 min",
        level: "Beginner",
        articles: ["Article 35", "Access to Information Act, 2016"],
        sections: [
          {
            heading: "The right",
            body: "Article 35 gives every citizen the right to information held by the State, and the right to information held by another person required for the exercise or protection of any right or fundamental freedom.",
          },
          {
            heading: "How to file",
            body: "Use the ATI Act form addressed to the public entity's Information Officer. They have 21 days to respond. Refusal must be in writing with reasons; you can appeal to the Commission on Administrative Justice.",
          },
        ],
        takeaways: [
          "Public entities must respond within 21 days.",
          "Refusal must be in writing — silence is itself unlawful.",
          "Appeals go to the Commission on Administrative Justice (Office of the Ombudsman).",
        ],
      },
    ],
  },
];

export const findTrack = (slug: string) => tracks.find((t) => t.slug === slug);
export const allLessons = tracks.flatMap((t) =>
  t.lessons.map((l) => ({ ...l, trackSlug: t.slug, trackTitle: t.title })),
);

// Re-export icon type for consumers
export { BookOpen };
