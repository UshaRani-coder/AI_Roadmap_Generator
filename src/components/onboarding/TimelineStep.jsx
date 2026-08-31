const timelineOptions = [
  "Less than 1 month",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "I'm flexible",
];

export default function TimelineStep({ value, onChange }) {
  return (
    <section>
      <p className="mb-4 text-sm font-medium text-accent">Set your pace</p>

      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        What's your timeline?
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        When would you ideally like to make meaningful progress towards your
        goal?
      </p>

      <div className="mt-10 grid gap-3">
        {timelineOptions.map((option) => {
          const isSelected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`flex items-center justify-between rounded-2xl border p-5 text-left transition-all duration-200 ${
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card/40 hover:border-accent/50 hover:bg-card"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-foreground" : "text-muted"
                }`}
              >
                {option}
              </span>

              {isSelected && <span className="text-accent">✓</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
