const suggestions = [
  "Become a software engineer",
  "Become a pilot",
  "Start a YouTube channel",
  "Learn photography",
  "Start a business",
  "Learn a new language",
];

export default function GoalStep({ value, onChange }) {
  return (
    <section>
      <p className="mb-4 text-sm font-medium text-accent">
        Let's start with your destination
      </p>

      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        What do you want to achieve?
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        It can be a career, a skill, a business, or any goal you want to work
        towards.
      </p>

      <div className="mt-10">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Learn guitar, start a business, become a software engineer, run a marathon..."
          rows={3}
          className="w-full resize-none rounded-2xl border border-border bg-card/40 px-5 py-4 text-base text-foreground outline-none backdrop-blur transition-all duration-200 placeholder:text-muted-foreground focus:border-accent/60 focus:ring-2 focus:ring-accent/10"
        />

        <p className="mt-3 text-xs text-muted">
          Be as specific or as open-ended as you want.
        </p>
      </div>

      <div className="mt-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
          Looking for Ideas?
        </p>

        <div className="flex flex-wrap gap-2.5">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onChange(suggestion)}
              className="rounded-full border border-border bg-card/30 px-4 py-2.5 text-sm text-muted transition-all duration-200 hover:border-accent/50 hover:bg-card-hover hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
