const currentStatus = [
  "I’m completely new to this",
  "I’ve started learning or exploring",
  "I’m actively working towards this",
  "I already have experience",
];

export default function CurrentStatusStep({ value, onChange }) {
  return (
    <section>
      <p className="mb-4 text-sm font-medium text-accent">
        Tell us about your starting point
      </p>

      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
        Where are you right now?
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        This helps us understand how far you are from your goal and create a
        roadmap that actually fits you.
      </p>

      <div className="mt-10 grid gap-3">
        {currentStatus.map((situation) => {
          const isSelected = value === situation;

          return (
            <button
              key={situation}
              type="button"
              onClick={() => onChange(situation)}
              className={`group rounded-2xl border p-5 text-left transition-all duration-200 ${
                isSelected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card/40 hover:border-accent/50 hover:bg-card-hover"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-foreground" : "text-muted"
                }`}
              >
                {situation}
              </span>

              {isSelected && <span className="ml-2 text-accent">✓</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
