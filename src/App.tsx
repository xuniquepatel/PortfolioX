import { useEffect, useRef, useState } from "react";
import type { ReactNode, ComponentType } from "react";
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
  Trophy,
  BookOpen,
  Code2,
  GraduationCap,
} from "lucide-react";
import * as THREE from "three";
import "./index.css";

// ————————————————————————————————
// Minimal UI primitives (typed)
// ————————————————————————————————
type CardProps = { className?: string; children?: ReactNode };
const Card = ({ className = "", children }: CardProps) => (
  <div
    className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

type TagProps = { children?: ReactNode };
const Tag = ({ children }: TagProps) => (
  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
    {children}
  </span>
);

// Polymorphic Button: <Button as="a" href=...> or <Button as="button" onClick=...>
type AnchorBtn =
  | ({ as?: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ as: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>);
type ButtonProps = AnchorBtn & { className?: string; children?: ReactNode };

const Button = ({
  as = "a",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const cls =
    `inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium shadow-sm ` +
    `transition hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 ${className}`;

  if (as === "button") {
    const p = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button className={cls} {...p}>
        {children}
      </button>
    );
  }
  const p = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
  return (
    <a className={cls} {...p}>
      {children}
    </a>
  );
};

// ————————————————————————————————
// 3D Scene
// ————————————————————————————————
function WobblyIcosahedron() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const t0 = useRef<number>(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + t0.current;
    const m = meshRef.current;
    if (!m) return;
    m.rotation.x = t * 0.25;
    m.rotation.y = t * 0.35;
    const s = 1 + Math.sin(t * 0.8) * 0.03;
    m.scale.set(s, s, s);
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
      <color attach="background" args={["#07071A"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <WobblyIcosahedron />
      <Stars
        radius={80}
        depth={50}
        count={4000}
        factor={4}
        saturation={1}
        fade
        speed={1}
      />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

// ————————————————————————————————
// Content
// ————————————————————————————————
const DATA = {
  name: "Unique Patel",
  title: "M.Tech (ICT) – Software Systems",
  email: "202411013@dau.ac.in",
  socials: {
    github: "https://github.com/xuniquepatel",
    linkedin: "https://www.linkedin.com/in/uniquepatel",
    leetcode: "https://leetcode.com/patelunique",
    codeforces: "https://codeforces.com/profile/patelunique1",
  },
  resumeHref: "/Unique_Patel_Resume.pdf",
  skills: [
    "C++",
    "Python",
    "JavaScript",
    "SQL",
    "React.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Bootstrap 5",
    "Git",
    "Postman",
    "VS Code",
    "MySQL",
    "MongoDB",
    "Firebase",
  ],
  interests: [
    "Full-Stack Development",
    "Competitive Programming",
    "Generative AI / LLMs",
  ],
  experience: [
    {
      company: "ConfidoSoft Solutions Pvt. Ltd.",
      role: "Software Developer Intern",
      period: "Dec 2023 – Jun 2024",
      location: "Vadodara, Gujarat",
      points: [
        "Built and refined interfaces for Innrly, a real-time hospitality accounting platform.",
        "Developed dynamic, responsive modules with Angular & Bootstrap 5.",
        "Fixed front-end bugs and improved workflows to enhance stability and UX.",
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
      stack: ["React", "Node", "Express", "PostgreSQL"],
      desc: "AI workspace for title generation, image tools, BG removal, and resume review with a clean dashboard.",
      href: "https://github.com/xuniquepatel/NeuroCanvas-Infinity",
    },
    {
      name: "WordWave Express",
      stack: ["React", "Node", "Express", "MySQL"],
      desc: "Blogging platform with rich editing, images, author pages, and responsive navigation.",
      href: "https://github.com/xuniquepatel/WordWave-Express",
    },
  ],
  achievements: [
    "INSPIRE Scholarship (Top 1% in Class XII, DST, GoI)",
    "Graduate Rotational Internship Program – The Sparks Foundation (Excellence + Bronze/Silver/Gold badges)",
    "Top-ranked Geek at MSU Baroda on GeeksforGeeks",
  ],
  certificates: [
    "Create a Website Using WordPress (Coursera)",
    "LLM Engineering: Master AI, LLMs & Agents (Udemy)",
    "AWS Cloud Practitioner Essentials (AWS)",
  ],
};

// ————————————————————————————————
// Helpers
// ————————————————————————————————
type SectionProps = {
  id: string;
  title: string;
  kicker?: string;
  children?: ReactNode;
};
const Section = ({ id, title, kicker, children }: SectionProps) => (
  <section id={id} className="mx-auto w-full max-w-6xl px-6 py-20">
    <div className="mb-8">
      {kicker && (
        <p className="text-xs uppercase tracking-widest text-white/60">
          {kicker}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

type IconType = ComponentType<React.SVGProps<SVGSVGElement>>;
type PillProps = { href: string; icon: IconType; label: string };
const Pill = ({ href, icon: Icon, label }: PillProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
  >
    <Icon className="h-4 w-4 opacity-80 transition group-hover:opacity-100" />
    <span>{label}</span>
    <ExternalLink className="h-3.5 w-3.5 opacity-50" />
  </a>
);

// ————————————————————————————————
// Main
// ————————————————————————————————
export default function Portfolio3D() {
  const [dark, setDark] = useState<boolean>(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1F] via-[#0A0A1F] to-[#0B1227] text-white">
      <Scene />

      {/* Header / Nav */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/30 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 text-sm font-bold">
              UP
            </div>
            <span className="hidden text-sm font-semibold text-white/90 sm:block">
              Unique Patel
            </span>
          </a>
          <div className="flex items-center gap-2 text-sm">
            {[
              ["About", "about"],
              ["Skills", "skills"],
              ["Projects", "projects"],
              ["Experience", "experience"],
              ["Education", "education"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full px-3 py-1.5 text-white/80 hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <Button
              as="button"
              onClick={() => setDark((d) => !d)}
              className="ml-2 border border-white/10 bg-transparent text-white/70 hover:bg-white/10"
            >
              {dark ? "Light" : "Dark"}
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-16 sm:pt-24"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl font-extrabold leading-tight sm:text-6xl"
        >
          {DATA.name}
          <span className="block bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
            {DATA.title}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-4 max-w-2xl text-center text-white/80"
        >
          Full-stack developer with a soft spot for elegant UI and sturdy
          backend plumbing. Competitive coder; tinkers with LLMs; ships
          polished, pragmatic web apps.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            as="a"
            href={DATA.resumeHref}
            className="bg-white text-black hover:bg-white/90"
          >
            <FileDown className="h-4 w-4" /> Download Résumé
          </Button>
          <Button
            as="a"
            href={`mailto:${DATA.email}`}
            className="border border-white/20 bg-transparent hover:bg-white/10"
          >
            <Mail className="h-4 w-4" /> Email Me
          </Button>
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
          <p className="leading-relaxed text-white/85">
            I craft web experiences end-to-end: React + Tailwind on the front,
            Node/Express on the back, with SQL/NoSQL where it fits. I like clean
            abstractions, fast feedback loops, and leaving codebases tidier than
            I found them.
          </p>
        </Card>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" kicker="Toolbelt">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {DATA.skills.map((s) => (
            <Card
              key={s}
              className="flex items-center justify-center py-4 text-sm font-medium text-white/90"
            >
              {s}
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/60">
          Interests: {DATA.interests.join(" · ")}
        </p>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Featured Projects" kicker="Builds">
        <div className="grid gap-6 md:grid-cols-2">
          {DATA.projects.map((p) => (
            <Card key={p.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-white/80">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 p-2 text-white/80 hover:bg-white/10"
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
                  <p className="text-sm text-white/70">{e.location}</p>
                </div>
                <p className="text-sm text-white/60">{e.period}</p>
              </div>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-white/85">
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
                  <p className="text-sm text-white/80">
                    {ed.degree} · {ed.score}
                  </p>
                  <p className="text-xs text-white/60">
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
            <ul className="list-inside list-disc space-y-1 text-sm text-white/85">
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
            <ul className="list-inside list-disc space-y-1 text-sm text-white/85">
              {DATA.certificates.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" kicker="Say Hello">
        <Card className="flex flex-col items-center text-center">
          <p className="max-w-xl text-white/85">
            Want to collaborate or chat about an idea? Drop a line and let's
            explore it.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Button
              as="a"
              href={`mailto:${DATA.email}`}
              className="bg-white text-black hover:bg-white/90"
            >
              <Mail className="h-4 w-4" /> {DATA.email}
            </Button>
            <Button
              as="a"
              href={DATA.socials.github}
              target="_blank"
              rel="noreferrer"
              className="border border-white/20 bg-transparent hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> GitHub
            </Button>
            <Button
              as="a"
              href={DATA.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border border-white/20 bg-transparent hover:bg-white/10"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Button>
          </div>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {DATA.name}. Built with React,
            Tailwind, and a sprinkle of three.js stardust.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
            >
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
