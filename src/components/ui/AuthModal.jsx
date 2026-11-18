"use client";

import { useEffect } from "react";

export default function AuthModal({ onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-prompt-title"
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 15v2" />
            <path d="M6 10V7a6 6 0 0 1 12 0v3" />
            <rect x="4" y="10" width="16" height="11" rx="2" />
          </svg>
        </div>

        <h3
          id="auth-prompt-title"
          className="text-lg font-semibold text-foreground"
        >
          Track your progress
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          Create a free account to save your roadmap, track completed
          milestones, and pick up where you left off anytime.
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => {
              // TODO: Navigate to signup
            }}
            className="w-full cursor-pointer rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Create an account
          </button>

          <button
            type="button"
            onClick={() => {
              // TODO: Navigate to login
            }}
            className="w-full cursor-pointer rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
