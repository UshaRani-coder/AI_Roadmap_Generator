export default function ExperienceStep({ value, onChange }) {
  return (
    <section>
      <p className="mb-4 text-sm font-medium text-accent">
        Tell us about your experience
      </p>

      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        What experience do you have with this?
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        Tell us about anything you've learned, tried, built, or
        experienced so far. It's completely fine if you're starting
        from zero.
      </p>

      <div className="mt-10">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. I'm completely new to this..."
          rows={6}
          className="w-full resize-none rounded-2xl border border-border bg-card/40 px-5 py-4 text-base leading-7 text-foreground outline-none backdrop-blur transition-all duration-200 placeholder:text-muted-foreground focus:border-accent/60 focus:ring-2 focus:ring-accent/10"
        />

        <p className="mt-3 text-xs text-muted">
          No experience is perfectly fine. Just tell us where you're
          starting from.
        </p>
      </div>
    </section>
  );
}