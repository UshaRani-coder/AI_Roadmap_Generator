
export default function RoadmapPreview() {
  const phases = [
    {
      number: "01",
      title: "Discover",
      description: "Understand your goals and starting point.",
      status: "complete",
    },
    {
      number: "02",
      title: "Build your foundation",
      description: "Develop the skills you need to move forward.",
      status: "active",
    },
    {
      number: "03",
      title: "Practice & build",
      description: "Turn knowledge into real-world experience.",
      status: "locked",
    },
    {
      number: "04",
      title: "Reach your goal",
      description: "Prepare for the next step in your journey.",
      status: "locked",
    },
  ];

  return (
    <section className="relative px-6 pb-32">
      <div className="mx-auto max-w-3xl">
        <div className="roadmap-card overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Your roadmap
              </p>

              <h2 className="mt-1 text-lg font-semibold text-foreground">
                Become a Software Engineer
              </h2>
            </div>

            <div className="text-right">
              <p className="text-2xl font-semibold text-accent">
                32%
              </p>

              <p className="text-xs text-muted">
                complete
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="h-1 bg-border">
            <div className="roadmap-progress h-full bg-accent" />
          </div>

          {/* Phases */}
          <div className="divide-y divide-border">
            {phases.map((phase, index) => (
              <div
                key={phase.number}
                className={`roadmap-phase roadmap-phase-${index} flex items-center gap-5 px-6 py-5 transition-all duration-300 hover:bg-card-hover ${
                  phase.status === "active" ? "roadmap-active" : ""
                }`}
              >
                {/* Phase number */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-all duration-300 ${
                    phase.status === "complete"
                      ? "border-accent bg-accent/10 text-accent"
                      : phase.status === "active"
                        ? "border-accent bg-accent/5 text-accent shadow-[0_0_20px_rgba(59,130,246,0.12)]"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {phase.status === "complete" ? "✓" : phase.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground">
                    {phase.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted">
                    {phase.description}
                  </p>
                </div>

                {/* Active status */}
                {phase.status === "active" && (
                  <span className="hidden rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs text-accent sm:block">
                    In progress
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

