"use client";

import { useState } from "react";
import AuthModal from "@/components/ui/AuthModal.jsx";

export default function RoadmapPhase({ phase }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <article className="relative border-l border-border pl-8 pb-12">
      {/* Timeline dot */}
      <div className="absolute -left-2 top-0 flex h-4 w-4 items-center justify-center rounded-full border border-accent/40 bg-background">
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>

      {/* Phase header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-accent">
          PHASE {String(phase.id).padStart(2, "0")}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-foreground">
            {phase.title}
          </h2>

          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
            {phase.durationWeeks} {phase.durationWeeks === 1 ? "week" : "weeks"}
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          {phase.description}
        </p>
      </div>

      {/* Focus Areas and Action Steps */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Key Focus Areas
          </h3>

          <ul className="space-y-2">
            {phase.focusAreas?.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Action Steps
          </h3>

          <ul className="space-y-2">
            {phase.actions?.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted"
              >
                <span className="shrink-0 text-accent">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Success Indicators */}
      {phase.successIndicators?.length > 0 && (
        <div className="mt-8 rounded-xl border border-border bg-card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Success Indicators
            </h3>

            <p className="mt-1 text-xs leading-5 text-muted">
              What you should achieve before completing this phase.
            </p>
          </div>

          <ul className="space-y-3">
            {phase.successIndicators.map((indicator, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="group flex w-full items-start gap-3 text-left cursor-pointer"
                  aria-label={`Track success indicator: ${indicator}`}
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-muted/50 transition-colors group-hover:border-accent"></span>

                  <span className="text-sm leading-6 text-muted transition-colors group-hover:text-foreground">
                    {indicator}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Login / Signup Prompt */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </article>
  );
}
