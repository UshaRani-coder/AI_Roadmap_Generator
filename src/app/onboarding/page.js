"use client";

import { useState } from "react";

import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import OnboardingNavigation from "@/components/onboarding/OnboardingNavigation";

import GoalStep from "@/components/onboarding/GoalStep";
import CurrentStatusStep from "@/components/onboarding/CurrentStatusStep";
import ExperienceStep from "@/components/onboarding/ExperienceStep";
import DesiredOutcomeStep from "@/components/onboarding/DesiredOutcomeStep";
import TimeAvailabilityStep from "@/components/onboarding/TimeAvailabilityStep";
import TimelineStep from "@/components/onboarding/TimelineStep";
import AdditionalContextStep from "@/components/onboarding/AdditionalContextStep";

const TOTAL_STEPS = 7;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [answers, setAnswers] = useState({
    goal: "",
    currentSituation: "",
    experience: "",
    desiredOutcome: "",
    timeAvailable: "",
    timeline: "",
    additionalContext: "",
  });

  const updateAnswer = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return answers.goal.trim();

      case 2:
        return answers.currentSituation;

      case 3:
        return answers.experience.trim();

      case 4:
        return answers.desiredOutcome.trim();

      case 5:
        return answers.timeAvailable;

      case 6:
        return answers.timeline;

      case 7:
        return true;

      default:
        return false;
    }
  };

  const handleContinue = () => {
    if (!isCurrentStepValid()) return;

    if (currentStep === TOTAL_STEPS) {
      console.log("Final roadmap data:", answers);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <GoalStep
            value={answers.goal}
            onChange={(value) => updateAnswer("goal", value)}
          />
        );

      case 2:
        return (
          <CurrentStatusStep
            value={answers.currentSituation}
            onChange={(value) => updateAnswer("currentSituation", value)}
          />
        );

      case 3:
        return (
          <ExperienceStep
            value={answers.experience}
            onChange={(value) => updateAnswer("experience", value)}
          />
        );

      case 4:
        return (
          <DesiredOutcomeStep
            value={answers.desiredOutcome}
            onChange={(value) => updateAnswer("desiredOutcome", value)}
          />
        );

      case 5:
        return (
          <TimeAvailabilityStep
            value={answers.timeAvailable}
            onChange={(value) => updateAnswer("timeAvailable", value)}
          />
        );

      case 6:
        return (
          <TimelineStep
            value={answers.timeline}
            onChange={(value) => updateAnswer("timeline", value)}
          />
        );

      case 7:
        return (
          <AdditionalContextStep
            value={answers.additionalContext}
            onChange={(value) => updateAnswer("additionalContext", value)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 pt-24">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center">
        <OnboardingProgress
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
        />

        {renderStep()}

        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onBack={handleBack}
          onContinue={handleContinue}
          disabled={!isCurrentStepValid()}
        />
      </div>
    </main>
  );
}
