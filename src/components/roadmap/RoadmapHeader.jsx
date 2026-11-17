export default function RoadmapHeader({ roadmap }) {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-4 pt-10 pb-8 sm:mt-20 sm:px-6 sm:pt-12 sm:pb-10">
      <p className="mb-3 text-sm font-medium text-accent">
        Your personalized roadmap
      </p>

      <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {roadmap.title}
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
        {roadmap.description}
      </p>

      <div className="mt-7 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 sm:justify-start sm:gap-3 sm:rounded-full sm:py-2.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            Timeline
          </span>

          <span className="hidden h-3.5 w-px bg-border sm:block" />

          <span className="text-sm font-medium text-foreground">
            {roadmap.duration}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 sm:justify-start sm:gap-3 sm:rounded-full sm:py-2.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            Time per day
          </span>

          <span className="hidden h-3.5 w-px bg-border sm:block" />

          <span className="text-sm font-medium text-foreground">
            {roadmap.timePerDay}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 sm:justify-start sm:gap-3 sm:rounded-full sm:py-2.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            Experience
          </span>

          <span className="hidden h-3.5 w-px bg-border sm:block" />

          <span className="text-sm font-medium text-foreground">
            {roadmap.experience}
          </span>
        </div>
      </div>
    </section>
  );
}
