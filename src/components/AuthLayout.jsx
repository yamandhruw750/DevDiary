import { Code2, Sparkles, TerminalSquare } from "lucide-react";

export default function AuthLayout({ children, title, eyebrow, description, highlights = [] }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_24%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.08),transparent_22%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.16),transparent_24%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.14),transparent_22%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-size-[72px_72px] opacity-[0.45] mask-[linear-gradient(to_bottom,white,transparent_85%)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:opacity-[0.12]" />
      <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-cyan-400/6 blur-3xl dark:bg-cyan-400/10" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="hidden border-r border-border/70 px-8 py-10 lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_0_30px_rgba(139,92,246,0.18)] backdrop-blur-xl">
              <Code2 className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.24em] uppercase">DevDiary</div>
              <div className="text-xs text-muted-foreground">Build in public</div>
            </div>
          </div>

          <div className="mt-16 max-w-lg">
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">{eyebrow || "Developer workspace"}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-foreground">
              {title || "Welcome back to your dev journal."}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              {description || "Keep your projects, notes, and public writing together in one calm, high-signal workspace."}
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {(highlights.length ? highlights : [
              { icon: Sparkles, title: "Premium writing flow", copy: "A clean auth experience that matches the product aesthetic." },
              { icon: TerminalSquare, title: "Built for builders", copy: "Fast sign-in for developers who document progress every day." },
            ]).map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-[24px] border border-border bg-card/70 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-cyan-500 dark:bg-white/5 dark:text-cyan-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{title}</div>
                    <div className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md rounded-[32px] border border-border bg-card/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:p-8">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
