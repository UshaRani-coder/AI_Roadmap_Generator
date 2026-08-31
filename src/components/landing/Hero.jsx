import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="hero-glow-secondary absolute left-[20%] top-[55%] h-72 w-72 rounded-full bg-accent/5 blur-[120px]" />

        <div className="hero-glow-tertiary absolute right-[15%] top-[35%] h-64 w-64 rounded-full bg-[#B8AEFF]/4 blur-[110px]" />

        <div className="hero-grid absolute inset-0 opacity-[0.1]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted backdrop-blur-xl">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          AI-powered career planning
        </div>

        {/* Heading */}
        <h1 className="fade-up hero-delay-1 text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl">
          Turn your ambition
          <span className="hero-gradient mt-2 block bg-linear-to-r from-accent via-[#B8AEFF] to-accent bg-clip-text text-transparent">
            into a roadmap.
          </span>
        </h1>

        {/* Description */}
        <p className="fade-up hero-delay-2 mx-auto mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Tell us where you want to go, where you are today, and what you want
          to achieve. Roadmap AI creates a personalized path to help you get
          there.
        </p>

        {/* CTA */}
        <div className="fade-up hero-delay-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/onboarding"
            className="hero-cta group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-90"
          >
            <span>Create My Roadmap</span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <button className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-card">
            <span>See how it works</span>

            <span className="text-muted transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Supporting text */}
        <p className="fade-up hero-delay-4 mt-6 text-xs text-muted-foreground">
          Personalized for any career, skill, or goal.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
