export default function RoadmapPhase({ phase }) {
  return (
    <article className="relative border-l border-border pl-8 pb-12">
      <div className="absolute -left-2 top-0 flex h-4 w-4 items-center justify-center rounded-full border border-accent/40 bg-background">
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-accent">
          PHASE {String(phase.id).padStart(2, "0")}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-foreground">
            {phase.title}
          </h2>

          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
            {phase.duration}
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {phase.description}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Skills to learn
          </h3>

          <ul className="space-y-2">
            {phase.skills.map((skill) => (
              <li
                key={skill}
                className="flex items-start gap-2 text-sm text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Practice & build
          </h3>

          <ul className="space-y-2">
            {phase.projects.map((project) => (
              <li
                key={project}
                className="flex items-start gap-2 text-sm text-muted"
              >
                <span className="mt-1 text-accent">→</span>
                {project}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}