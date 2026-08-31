export default function OnboardingNavigation({
  currentStep,
  onBack,
  onContinue,
  disabled,
  totalSteps,
}) {
  return (
    <div className="mt-12 flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
        className="rounded-xl px-5 py-3 text-sm font-medium text-muted transition-opacity disabled:opacity-30"
      >
        ← Back
      </button>

      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="rounded-xl bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
      >
        {currentStep === totalSteps ? "Generate My Roadmap" : "Continue →"}
      </button>
    </div>
  );
}
