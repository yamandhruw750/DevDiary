import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChartNoAxesColumn,
  ChevronRight,
  Circle,
  Flame,
  GitBranch,
  Github,
  Globe2,
  LineChart,
  MessageCircle,
  PencilLine,
  Rocket,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/container/Container";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const features = [
  { icon: PencilLine, title: "Markdown Blogging", copy: "Write elegant technical posts with a focused editor and clean publishing flow." },
  { icon: Rocket, title: "Project Showcase", copy: "Present shipped work with cards that feel like a polished product launch." },
  { icon: LineChart, title: "Progress Tracking", copy: "See your momentum with growth snapshots, streaks, and milestone history." },
  { icon: Flame, title: "Daily Coding Streak", copy: "Keep the habit visible with a simple ritual that rewards consistency." },
  { icon: BookOpen, title: "Learning Journal", copy: "Capture notes, snippets, and lessons learned without interrupting flow." },
  { icon: BadgeCheck, title: "Achievement Badges", copy: "Celebrate wins with milestones that make growth feel tangible." },
  { icon: Users, title: "Developer Community", copy: "Share insights and discover thoughtful updates from other builders." },
  { icon: Globe2, title: "Public Portfolio", copy: "Turn your writing into a professional public identity that compounds over time." },
];

const timeline = [
  { day: "Day 1", title: "Learn HTML" },
  { day: "Day 18", title: "First React App" },
  { day: "Day 43", title: "Portfolio" },
  { day: "Day 72", title: "First Internship" },
  { day: "Day 130", title: "Open Source Contributor" },
];

const communityPosts = [
  { title: "Shipping a clean auth flow in Remix", name: "Ava Chen", likes: "2.3K", comments: "48", time: "6 min read", tag: "Frontend" },
  { title: "How I refactored a legacy API without downtime", name: "Noah Patel", likes: "1.8K", comments: "31", time: "8 min read", tag: "Backend" },
  { title: "Designing developer dashboards that feel calm", name: "Mia Rivera", likes: "3.2K", comments: "76", time: "5 min read", tag: "Design" },
  { title: "Building a streak tracker that people actually use", name: "Leo Kim", likes: "1.1K", comments: "22", time: "4 min read", tag: "Product" },
];

const stats = [
  { value: 150, suffix: "K+", label: "Developers" },
  { value: 2, suffix: "M+", label: "Blog Posts" },
  { value: 450, suffix: "K+", label: "Projects" },
  { value: 35, suffix: "M+", label: "Lines of Code Shared" },
];

function useCountUp(target, suffix = "") {
  const [value, setValue] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const end = Number(target);
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / Math.max(end, 1)), 12);
        const timer = setInterval(() => {
          start += Math.max(1, Math.ceil(end / 85));
          if (start >= end) {
            setValue(`${end}${suffix}`);
            clearInterval(timer);
          } else {
            setValue(`${start.toLocaleString()}${suffix}`);
          }
        }, stepTime);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return [ref, value];
}

function StatCounter({ value, suffix, label }) {
  const [ref, animated] = useCountUp(value, suffix);
  return (
    <div ref={ref} className="rounded-3xl border border-border bg-card/70 px-6 py-7 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
      <div className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{animated}</div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const profileInitial = useMemo(
    () => userData?.name?.charAt(0).toUpperCase() || "D",
    [userData?.name],
  );

  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_24%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.08),transparent_22%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.14),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-size-[72px_72px] opacity-[0.35] mask-[linear-gradient(to_bottom,white,transparent_85%)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.18] mix-blend-multiply dark:bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] dark:opacity-[0.07] dark:mix-blend-soft-light" />
      <div className="absolute left-24 top-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20 animate-[float_12s_ease-in-out_infinite]" />
      <div className="absolute right-20 top-40 h-80 w-80 rounded-full bg-cyan-400/6 blur-3xl dark:bg-cyan-400/10 animate-[float_16s_ease-in-out_infinite]" />
      <div className="absolute bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/6 blur-3xl dark:bg-indigo-500/10 animate-[float_18s_ease-in-out_infinite]" />

      <div className="relative z-20">
        <Header />
      </div>

      <main className="relative">
        <section className="relative pt-20 md:pt-28">
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl">
                  <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                  Premium workspace for developer storytelling
                </div>
                <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-foreground md:text-7xl">
                  Build. Learn. Share. Grow.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                  DevDiary helps developers document projects, write technical blogs, track progress, and build a public portfolio, all in one beautiful workspace.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="h-14 rounded-full bg-white px-7 text-base font-medium text-black hover:bg-white/90" onClick={() => navigate("/add-post")}>
                    Start Writing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 rounded-full border-border bg-background px-7 text-base text-foreground backdrop-blur-xl hover:bg-muted" onClick={() => navigate("/all-posts")}>
                    Explore Posts
                  </Button>
                </div>
                <div className="mt-10 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
                  {[
                    ["Markdown-first", "Writer-friendly experience"],
                    ["Progress-aware", "Track streaks and milestones"],
                    ["Public-ready", "Showcase your growth"],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-2xl border border-border bg-card p-4 backdrop-blur-xl">
                      <div className="font-medium text-foreground">{title}</div>
                      <div className="mt-1 text-muted-foreground">{copy}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-[2rem] bg-linear-to-br from-purple-500/10 via-transparent to-cyan-400/10 blur-2xl dark:from-purple-500/15 dark:to-cyan-400/15" />
                <div className="rounded-[28px] border border-border bg-card/70 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
                  <div className="rounded-[24px] border border-border bg-background/90 p-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">Developer Workspace</div>
                        <div className="text-xs text-muted-foreground">Last synced 2 minutes ago</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_16px_rgba(52,211,153,0.55)] dark:bg-emerald-400 dark:shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
                        <span className="text-xs text-muted-foreground">Live</span>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-3xl border border-border bg-card/70 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-foreground"><PencilLine className="h-4 w-4 text-purple-500 dark:text-purple-400" /> Markdown Editor</div>
                          <span className="rounded-full border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">Draft</span>
                        </div>
                        <div className="space-y-2 rounded-2xl bg-muted/55 p-4 font-mono text-[12px] leading-6 text-foreground dark:bg-black/30">
                          <div><span className="text-cyan-600 dark:text-cyan-500">#</span> Shipping a habit tracker</div>
                          <div><span className="text-purple-600 dark:text-purple-500">-</span> Refactored the onboarding flow</div>
                          <div><span className="text-purple-600 dark:text-purple-500">-</span> Added streak analytics</div>
                          <div><span className="text-emerald-600 dark:text-emerald-500">+</span> Published in public on day 43</div>
                        </div>
                      </div>
                      <div className="grid gap-4">
                        <div className="rounded-3xl border border-border bg-card/70 p-4">
                          <div className="flex items-center justify-between text-sm text-foreground"><span>GitHub Contributions</span><Github className="h-4 w-4 text-muted-foreground" /></div>
                          <div className="mt-4 grid grid-cols-7 gap-1.5">
                            {Array.from({ length: 28 }).map((_, index) => (
                              <span key={index} className={`h-3 rounded-sm ${index % 5 === 0 ? "bg-cyan-500/80 dark:bg-cyan-400/80" : index % 3 === 0 ? "bg-purple-500/65 dark:bg-purple-400/65" : "bg-slate-200 dark:bg-muted"}`} />
                            ))}
                          </div>
                        </div>
                        <div className="rounded-3xl border border-border bg-card/70 p-4">
                          <div className="flex items-center justify-between text-sm text-foreground"><span>Coding Streak</span><Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" /></div>
                          <div className="mt-3 text-3xl font-semibold text-foreground">87 days</div>
                          <div className="mt-1 text-sm text-muted-foreground">Consistent builder mode</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl border border-border bg-card/70 p-4">
                        <div className="flex items-center justify-between text-sm text-foreground"><span>Learning Roadmap</span><ChartNoAxesColumn className="h-4 w-4 text-indigo-500 dark:text-indigo-400" /></div>
                        <div className="mt-4 space-y-3">
                          {["TypeScript deep dive", "System design notes", "Open source workflow"].map((item, index) => (
                            <div key={item} className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-emerald-500 dark:bg-emerald-400" : "bg-slate-300 dark:bg-white/20"}`} />
                              <div className="flex-1 text-sm text-muted-foreground">{item}</div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-3xl border border-border bg-card/70 p-4">
                        <div className="flex items-center justify-between text-sm text-foreground"><span>Developer Profile</span><Circle className="h-4 w-4 text-cyan-500 dark:text-cyan-400" /></div>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-indigo-500 to-cyan-400 text-xl font-semibold text-white">{profileInitial}</div>
                          <div>
                            <div className="font-medium text-foreground">{authStatus ? userData?.name : "DevDiary Studio"}</div>
                            <div className="text-sm text-muted-foreground">Full-stack developer</div>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><GitBranch className="h-3.5 w-3.5" /> Building in public</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div className="rounded-3xl border border-border bg-card/70 p-4">
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Recent Blogs</div>
                        <div className="mt-3 space-y-2 text-sm text-foreground">
                          <div>How I ship faster without burnout</div>
                          <div>My React architecture notes</div>
                          <div>What I learned from open source</div>
                        </div>
                      </div>
                      <div className="rounded-3xl border border-border bg-card/70 p-4">
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Tags</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {["React", "Next.js", "System Design", "Career"].map((tag) => (
                            <span key={tag} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-3xl border border-border bg-card/70 p-4">
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Analytics</div>
                        <div className="mt-3 text-sm text-foreground">+18% more reads this week</div>
                        <div className="mt-3 h-12 rounded-xl bg-linear-to-r from-purple-500/15 via-indigo-500/15 to-cyan-500/15 dark:from-purple-500/20 dark:via-indigo-500/20 dark:to-cyan-500/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative py-28">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Features</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">Everything developers need to document momentum.</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map(({ icon: Icon, title, copy }, index) => (
                <div key={title} className="group relative overflow-hidden rounded-[24px] border border-border bg-card/70 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_42%)]" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-foreground shadow-[0_0_24px_rgba(99,102,241,0.18)]">
                      <Icon className={`h-5 w-5 ${index % 2 ? "text-cyan-400" : "text-purple-400"} transition-transform duration-300 group-hover:scale-110`} />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-foreground">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Journey</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">A timeline that makes progress feel real.</h2>
              </div>
              <div className="relative rounded-[28px] border border-border bg-card/70 p-6 backdrop-blur-xl">
                <div className="absolute left-12 top-8 bottom-8 w-px bg-linear-to-b from-purple-500/0 via-purple-400/80 to-cyan-400/0" />
                <div className="space-y-8 pl-6">
                  {timeline.map((item, index) => (
                    <div key={item.day} className="relative flex items-center gap-6">
                      <div className="absolute left-[-1.65rem] h-4 w-4 rounded-full bg-linear-to-br from-purple-400 to-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.45)]" />
                      <div className="min-w-24 text-sm font-medium text-muted-foreground">{item.day}</div>
                      <div className="flex-1 rounded-2xl border border-border bg-background/80 px-5 py-4 text-foreground shadow-sm">{item.title}</div>
                      {index < timeline.length ? <ArrowRight className="h-4 w-4 text-muted-foreground" /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Community</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">A masonry-style feed for thoughtful developer posts.</h2>
            </div>
            <div className="mt-12 columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3">
              {communityPosts.map((post, index) => (
                <article key={post.title} className="group mb-5 break-inside-avoid rounded-[24px] border border-border bg-card/70 p-4 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-none">
                  <div className={`h-40 rounded-2xl bg-linear-to-br ${index % 3 === 0 ? "from-purple-500/20 to-indigo-500/5 dark:from-purple-500/40 dark:to-indigo-500/10" : index % 3 === 1 ? "from-cyan-500/16 to-slate-200 dark:from-cyan-500/30 dark:to-slate-900" : "from-indigo-500/16 to-purple-200 dark:from-indigo-500/30 dark:to-purple-900"}`} />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-foreground">{post.name}</div>
                    <span className="rounded-full border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">{post.tag}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-foreground">{post.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.time}</span>
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.comments} comments</span>
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">Save</span>
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">Share</span>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="rounded-[32px] border border-border bg-linear-to-br from-background via-purple-500/8 to-cyan-500/8 p-8 md:p-12 dark:from-white/8 dark:via-purple-500/10 dark:to-cyan-500/10">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Testimonials</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-5xl">Loved by builders who care about craft.</h2>
                </div>
                <div className="overflow-hidden">
                  <div className="flex gap-5 animate-[marquee_26s_linear_infinite] w-max">
                    {[
                      ["Priya Shah", "Frontend Engineer", "Linear", "DevDiary finally makes my progress feel visible and shareable."],
                      ["Jordan Lee", "Staff Developer", "Vercel", "The writing and portfolio experience feels incredibly polished."],
                      ["Samira Khan", "Product Engineer", "GitHub", "A clean home for logs, projects, and the story behind them."],
                    ].map(([name, role, company, review]) => (
                      <div key={name} className="w-[320px] shrink-0 rounded-[24px] border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:bg-black/20 dark:shadow-none">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-cyan-400 text-sm font-semibold text-white">{name.charAt(0)}</div>
                          <div>
                            <div className="font-medium text-foreground">{name}</div>
                            <div className="text-sm text-muted-foreground">{role} · {company}</div>
                          </div>
                        </div>
                        <p className="mt-5 text-sm leading-6 text-muted-foreground">{review}</p>
                        <div className="mt-5 flex gap-1 text-cyan-500 dark:text-cyan-400">
                          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <div className="rounded-[32px] border border-border bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_35%),hsl(var(--background))] px-6 py-16 text-center md:px-12 dark:bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.28),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_35%),#0b1020]">
              <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-5xl">Start documenting your developer journey today.</h2>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full bg-foreground px-7 text-background hover:bg-foreground/90" onClick={() => navigate("/signup")}>Get Started</Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-border bg-background px-7 text-foreground hover:bg-muted" onClick={() => navigate("/docs")}>Read Documentation</Button>
              </div>
            </div>
          </Container>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default Home;
