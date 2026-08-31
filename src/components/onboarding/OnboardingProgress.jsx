export default function OnboardingProgress({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-12">
      <div className="mb-3 flex items-center justify-between text-xs text-muted">
        <span>Personalize your roadmap</span>
        <span>
          {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-card">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
