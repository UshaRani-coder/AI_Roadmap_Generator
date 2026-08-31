export default function DesiredOutcomeStep({ value, onChange }) {
  return (
    <section>
      <p className="mb-4 text-sm font-medium text-accent">
        Define your destination
      </p>

      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        What does success look like for you?
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        Describe what you&apos;d like to accomplish. The more specific you are,
        the more personalized your roadmap can be.
      </p>

      <div className="mt-10">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. I want to become a full-time creator and earn enough to support myself through YouTube..."
          rows={6}
          className="w-full resize-none rounded-2xl border border-border bg-card/40 px-5 py-4 text-base leading-7 text-foreground outline-none backdrop-blur transition-all duration-200 placeholder:text-muted-foreground focus:border-accent/60 focus:ring-2 focus:ring-accent/10"
        />

        <p className="mt-3 text-xs text-muted">
          You don&apos;t need to have everything figured out.
        </p>
      </div>
    </section>
  );
}
