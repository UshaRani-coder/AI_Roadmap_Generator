import RoadmapPhase from "./RoadmapPhase";

export default function RoadmapTimeline({ phases }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted">
          YOUR JOURNEY
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Follow your roadmap
        </h2>
      </div>

      <div>
        {phases.map((phase) => (
          <RoadmapPhase key={phase.id} phase={phase} />
        ))}
      </div>
    </section>
  );
}