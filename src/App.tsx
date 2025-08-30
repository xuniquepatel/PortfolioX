import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  ExternalLink,
  Award,
  BookOpen,
  Code2,
  Trophy,
  GraduationCap,
  Users,
  Menu,
  X,
} from "lucide-react";

/* ------------------ Helpers ------------------ */
function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

/* ------------------ UI primitives ------------------ */
type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
};
function ButtonLink({ className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={cx(
        "inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium shadow-sm transition hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
        className
      )}
    >
      {children}
    </a>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};
function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium shadow-sm transition hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
        className
      )}
    >
      {children}
    </button>
  );
}

type CardProps = { className?: string; children: React.ReactNode };
function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-3xl border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md",
        "bg-white border-slate-200",
        "dark:bg-white/5 dark:border-white/10 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* Clickable card-like badge (previous look, now with link) */
function SkillBadgeLink({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block focus:outline-none"
    >
      <div
        className={cx(
          "rounded-2xl border px-4 py-3 text-sm font-medium transition",
          "bg-white border-slate-200 text-slate-800 hover:bg-slate-100",
          "dark:bg-white/5 dark:border-white/10 dark:text-white/90 hover:dark:bg-white/10",
          "flex items-center justify-between"
        )}
      >
        <span>{name}</span>
        <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-90" />
      </div>
    </a>
  );
}

/* ------------------ 3D Scene ------------------ */
function WobblyIcosahedron() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const t0 = useRef<number>(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + t0.current;
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.x = t * 0.25;
    mesh.rotation.y = t * 0.35;
    const s = 1 + Math.sin(t * 0.8) * 0.03;
    mesh.scale.set(s, s, s);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          metalness={0.4}
          roughness={0.2}
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      className="absolute inset-0 -z-10"
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <WobblyIcosahedron />
      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={4}
        saturation={1}
        fade
        speed={1}
      />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

/* ------------------ Data ------------------ */
const BASE = import.meta.env.BASE_URL || "/";
const RESUME_PATH = `${BASE}Unique_Patel_Resume.pdf`; // works locally & on GitHub Pages

const DATA = {
  name: "Unique Patel",
  title: "M.Tech (ICT) – Software Systems",
  email: "patelunique1@gmail.com",
  socials: {
    github: "https://github.com/xuniquepatel",
    linkedin: "https://www.linkedin.com/in/uniquepatel",
    leetcode: "https://leetcode.com/patelunique",
    codeforces: "https://codeforces.com/profile/patelunique1",
  },
  skills: [
    { name: "C++", url: "https://en.cppreference.com/w/" },
    {
      name: "JavaScript",
      url: "https://developer.mozilla.org/docs/Web/JavaScript",
    },
    { name: "Python", url: "https://docs.python.org/3/" },
    { name: "SQL", url: "https://www.postgresql.org/docs/current/sql.html" },
    { name: "React.js", url: "https://react.dev/" },
    { name: "Node.js", url: "https://nodejs.org/en/docs" },
    { name: "Express.js", url: "https://expressjs.com/" },
    {
      name: "Bootstrap 5",
      url: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
    },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
    { name: "LangChain", url: "https://js.langchain.com/docs/" },
    { name: "Git", url: "https://git-scm.com/doc" },
    { name: "Postman", url: "https://learning.postman.com/docs/" },
    { name: "VS Code", url: "https://code.visualstudio.com/docs" },
    { name: "MySQL", url: "https://dev.mysql.com/doc/" },
    { name: "MongoDB", url: "https://www.mongodb.com/docs/" },
    { name: "Firebase", url: "https://firebase.google.com/docs" },
  ],
  interests: [
    "Full-Stack Development",
    "Competitive Programming",
    "System Design",
    "Generative AI / LLMs",
  ],
  experience: [
    {
      company: "ConfidoSoft Solutions Pvt. Ltd.",
      role: "Software Developer Intern",
      period: "Dec 2023 – Jun 2024",
      location: "Vadodara, Gujarat",
      points: [
        "Improved Innrly’s interface for clarity and speed.",
        "Built responsive modules with Angular and Bootstrap.",
        "Fixed UI bugs and supported feature updates.",
      ],
    },
  ],
  education: [
    {
      school: "Dhirubhai Ambani University",
      degree: "M.Tech (ICT) – Software Systems",
      score: "CPI: 8.11",
      period: "2024 – Present",
      location: "Gandhinagar, Gujarat",
    },
    {
      school: "The Maharaja Sayajirao University of Baroda",
      degree: "B.E.",
      score: "CGPA: 8.95",
      period: "2020 – 2024",
      location: "Vadodara, Gujarat",
    },
  ],
  projects: [
    {
      name: "NeuroCanvas Infinity",
      stack: [
        "React",
        "Node",
        "Express",
        "PostgreSQL",
        "Cloudinary",
        "Clerk",
        "Google Gemini API",
      ],
      desc: "A simple workspace to create blog titles, edit images, and review résumés. Clean UI, easy navigation, and subscription features.",
      href: "https://github.com/xuniquepatel/NeuroCanvas-Infinity",
    },
    {
      name: "Queue Pilot",
      stack: ["Python", "Flask", "Redis"],
      desc: "A small task-queue service with worker status, retries, and a live dashboard for health and progress.",
      href: "https://github.com/xuniquepatel/Queue-Pilot",
    },
  ],
  achievements: [
    "INSPIRE Scholarship (Top 1% in Class XII, DST, GoI)",
    "Graduate Rotational Internship Program – The Sparks Foundation",
    "Top-ranked Geek at MSU Baroda on GeeksforGeeks",
  ],
  certificates: [
    "LLM Engineering: Master AI, LLMs & Agents – Udemy (2025)",
    "AWS Cloud Practitioner Essentials – AWS (2022)",
    "Crash Course on Python – Google/Coursera (2022)",
    "Google Cloud Essentials – Google Cloud (2021)",
  ],
  positions: [
    {
      org: "Internshala",
      role: "Internshala Student Partner (ISP 31)",
      period: "Oct 2022 – Nov 2022",
      details: [
        "Helped students find internships and resources.",
        "Contributed to the “Light a Diya” registrations drive.",
      ],
    },
  ],
};

/* ------------------ Sections ------------------ */
type SectionProps = {
  id: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
};
function Section({ id, title, kicker, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <div className="mb-8">
        {kicker && (
          <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-white/60">
            {kicker}
          </p>
        )}
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Pill({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
                 bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100
                 dark:bg-white/5 dark:border-white/10 dark:text-white/90 hover:dark:bg-white/10"
    >
      <Icon className="h-4 w-4 opacity-80 transition group-hover:opacity-100" />
      <span>{label}</span>
      <ExternalLink className="h-3.5 w-3.5 opacity-50" />
    </a>
  );
}

/* ------------------ Main ------------------ */
export default function Portfolio3D() {
  const [dark, setDark] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // mount 'dark' class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  // Force a true PDF download with a stable file name (works locally & on GH Pages)
  const downloadResume = async () => {
    const res = await fetch(RESUME_PATH);
    if (!res.ok) return window.open(RESUME_PATH, "_blank"); // fallback
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Unique_Patel_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const wrapperClass = cx(
    "min-h-screen text-slate-900 dark:text-white",
    "bg-slate-50",
    "dark:bg-gradient-to-b dark:from-[#0A0A1F] dark:via-[#0A0A1F] dark:to-[#0B1227]"
  );

  const navItems = [
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Experience", "experience"],
    ["Education", "education"],
    ["Leadership", "por"],
    ["Contact", "contact"],
  ] as const;

  return (
    <div className={wrapperClass}>
      <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
        <Scene />
      </div>

      {/* Header / Nav */}
      <header
        className={cx(
          "sticky top-0 z-20 border-b backdrop-blur-md",
          "bg-white/70 border-slate-200",
          "dark:bg-black/30 dark:border-white/10"
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 text-sm font-bold text-white">
              UP
            </div>
            <span className="hidden text-sm font-semibold text-slate-800 dark:text-white/90 sm:block">
              Unique Patel
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-2 text-sm md:flex">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-slate-100 dark:text-white/80 hover:dark:bg-white/10"
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => setDark((d) => !d)}
              className="ml-2 rounded-full border px-3 py-1.5 text-slate-700 hover:bg-slate-100 dark:text-white/70 dark:border-white/10 border-slate-200 hover:dark:bg-white/10"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>

          {/* Mobile: theme + burger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="rounded-full border p-2 text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:border-white/10 border-slate-200 hover:dark:bg-white/10"
            >
              {dark ? "A" : "🌙"}
            </button>
            <button
              onClick={() => setMenuOpen((m) => !m)}
              aria-label="Open menu"
              className="rounded-xl border p-2 text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:border-white/10 border-slate-200 hover:dark:bg-white/10"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="md:hidden">
            <div className="mx-auto max-w-6xl px-6 pb-4">
              <div className="grid gap-2">
                {navItems.map(([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl border px-4 py-2 text-slate-800 hover:bg-slate-100 dark:text-white/90 dark:border-white/10 border-slate-200 hover:dark:bg-white/10"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-12 sm:pt-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl font-extrabold leading-tight sm:text-6xl"
        >
          {DATA.name}
          <span className="block bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-indigo-300 dark:to-fuchsia-300">
            {DATA.title}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Résumé download: guaranteed .pdf */}
          <Button
            onClick={downloadResume}
            className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black hover:dark:bg-white/90"
          >
            <FileDown className="h-4 w-4" /> Download Résumé
          </Button>

          <ButtonLink
            href={`mailto:${DATA.email}`}
            className="border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 dark:border-white/20 dark:bg-transparent dark:text-white hover:dark:bg-white/10"
          >
            <Mail className="h-4 w-4" /> Email Me
          </ButtonLink>

          <Pill href={DATA.socials.github} icon={Github} label="GitHub" />
          <Pill href={DATA.socials.linkedin} icon={Linkedin} label="LinkedIn" />
          <Pill href={DATA.socials.leetcode} icon={Code2} label="LeetCode" />
          <Pill
            href={DATA.socials.codeforces}
            icon={Trophy}
            label="Codeforces"
          />
        </motion.div>
      </section>

      {/* About */}
      <Section id="about" title="About" kicker="Overview">
        <Card>
          <p className="leading-relaxed text-slate-800 dark:text-white/85">
            I build useful web apps from start to finish. On the front end I use
            React and Tailwind to ship clean, fast interfaces. On the back end I
            keep things simple with Node and Express. I like readable code,
            quick feedback, and features that help people.
          </p>
        </Card>
      </Section>

      {/* Skills — reverted to card style, each links to official docs */}
      <Section id="skills" title="Skills" kicker="Toolbelt">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {DATA.skills.map((s) => (
            <SkillBadgeLink key={s.name} name={s.name} href={s.url} />
          ))}
        </div>

        {/* Interests emphasized */}
        <div className="mt-8">
          <h3 className="mb-3 text-xl font-extrabold text-slate-900 dark:text-white">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {DATA.interests.map((x) => (
              <span
                key={x}
                className="rounded-full bg-violet-100 px-3 py-1 text-base font-extrabold text-violet-800 dark:bg-violet-500/20 dark:text-violet-200"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Featured Projects" kicker="Builds">
        <div className="grid gap-6 md:grid-cols-2">
          {DATA.projects.map((p) => (
            <Card key={p.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-slate-700 dark:text-white/80">
                    {p.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-white/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border p-2 text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:border-white/15 hover:dark:bg-white/10 border-slate-200"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" kicker="Work">
        <div className="space-y-4">
          {DATA.experience.map((e) => (
            <Card key={e.company}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {e.role} · {e.company}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-white/70">
                    {e.location}
                  </p>
                </div>
                <p className="text-sm text-slate-500 dark:text-white/60">
                  {e.period}
                </p>
              </div>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-white/85">
                {e.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" kicker="Academics">
        <div className="grid gap-6 md:grid-cols-2">
          {DATA.education.map((ed) => (
            <Card key={ed.school}>
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-1 h-6 w-6 opacity-80" />
                <div>
                  <h3 className="text-lg font-semibold">{ed.school}</h3>
                  <p className="text-sm text-slate-700 dark:text-white/80">
                    {ed.degree} · {ed.score}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/60">
                    {ed.period} · {ed.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Achievements & Certificates */}
      <Section
        id="extras"
        title="Achievements & Certificates"
        kicker="Highlights"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <Award className="h-5 w-5" />{" "}
              <h3 className="text-lg font-semibold">Achievements</h3>
            </div>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-white/85">
              {DATA.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />{" "}
              <h3 className="text-lg font-semibold">Certificates</h3>
            </div>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-white/85">
              {DATA.certificates.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Positions of Responsibility */}
      <Section id="por" title="Leadership" kicker="Positions of Responsibility">
        {DATA.positions.map((p) => (
          <Card key={p.role}>
            <div className="flex items-start gap-3">
              <Users className="mt-1 h-6 w-6 opacity-80" />
              <div className="w-full">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {p.role} · {p.org}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-white/60">
                    {p.period}
                  </p>
                </div>
                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-white/85">
                  {p.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" kicker="Say Hello">
        <Card className="flex flex-col items-center text-center">
          <p className="max-w-xl text-slate-800 dark:text-white/85">
            Want to build something? Send a message and let’s get started.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink
              href={`mailto:${DATA.email}`}
              className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black hover:dark:bg-white/90"
            >
              <Mail className="h-4 w-4" /> {DATA.email}
            </ButtonLink>
            <ButtonLink
              href={DATA.socials.github}
              target="_blank"
              rel="noreferrer"
              className="border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 dark:border-white/20 dark:bg-transparent dark:text-white hover:dark:bg-white/10"
            >
              <Github className="h-4 w-4" /> GitHub
            </ButtonLink>
            <ButtonLink
              href={DATA.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 dark:border-white/20 dark:bg-transparent dark:text-white hover:dark:bg-white/10"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </ButtonLink>
          </div>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="border-t py-10 border-slate-200 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <p className="text-xs text-slate-600 dark:text-white/60">
            © {new Date().getFullYear()} {DATA.name}. Built with React,
            Tailwind, and a sprinkle of three.js.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="rounded-full border px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 border-slate-200 dark:text-white/80 dark:border-white/10 hover:dark:bg-white/10"
            >
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
