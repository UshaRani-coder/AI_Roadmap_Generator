const timeOptions = [
  "Less than 30 minutes a day",
  "30–60 minutes a day",
  "1–2 hours a day",
  "2–4 hours a day",
  "4+ hours a day",
];

export default function TimeAvailabilityStep({ value, onChange }) {
  return (
    <section>
      <p className="mb-4 text-sm font-medium text-accent">
        Let's plan around your schedule
      </p>

      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        How much time can you commit?
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        Your roadmap should fit into your life, not the other way around.
      </p>

      <div className="mt-10 grid gap-3">
        {timeOptions.map((option) => {
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
