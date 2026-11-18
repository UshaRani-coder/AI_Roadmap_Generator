"use client";

import { useEffect, useState, useRef } from "react";

import RoadmapHeader from "./RoadmapHeader";
import RoadmapTimeline from "./RoadmapTimeline";
import { generateRoadmap } from "@/lib/generateRoadmap";

const loadingMessages = [
  "Understanding your goals...",
  "Designing your personalized phases...",
  "Organizing milestones and resources...",
];

export default function RoadmapContent() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [validationMessage, setValidationMessage] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  const [retryCount, setRetryCount] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const hasGenerated = useRef(false);

  // Rotate loading messages
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading]);

  // Generate roadmap
  useEffect(() => {
    if (hasGenerated.current) return;

    hasGenerated.current = true;

    async function createRoadmap() {
      try {
        setLoading(true);
        setError(null);
        setValidationMessage(null);
        setResponseStatus(null);
        setMessageIndex(0);

        const savedAnswers = localStorage.getItem("roadmapAnswers");

        if (!savedAnswers) {
          throw new Error("No roadmap answers found.");
        }

        const answers = JSON.parse(savedAnswers);

        console.time("Roadmap Generation");

        const generatedRoadmap = await generateRoadmap(answers);

        console.timeEnd("Roadmap Generation");

        // Validate basic response
        if (
          !generatedRoadmap ||
          typeof generatedRoadmap !== "object" ||
          !["ready", "invalid_input", "needs_clarification"].includes(
            generatedRoadmap.status,
          ) ||
          typeof generatedRoadmap.message !== "string"
        ) {
          throw new Error("Invalid roadmap response.");
        }

        // Handle invalid input
        if (generatedRoadmap.status === "invalid_input") {
          setResponseStatus("invalid_input");
          setValidationMessage(generatedRoadmap.message);
          return;
        }

        // Handle ambiguous input
        if (generatedRoadmap.status === "needs_clarification") {
          setResponseStatus("needs_clarification");
          setValidationMessage(generatedRoadmap.message);
          return;
        }

        // Validate successful roadmap
        if (
          !Array.isArray(generatedRoadmap.phases) ||
          generatedRoadmap.phases.length < 3 ||
          generatedRoadmap.phases.length > 7
        ) {
          throw new Error("Invalid roadmap response.");
        }

        // Display roadmap
        setRoadmap(generatedRoadmap);
      } catch (err) {
        console.error("Roadmap generation failed:", err);
        setError(err.message || "Failed to generate your roadmap.");
      } finally {
        setLoading(false);
      }
    }

    createRoadmap();
  }, [retryCount]);

  // Retry generation
  function handleRetry() {
    hasGenerated.current = false;
    setRoadmap(null);
    setError(null);
    setValidationMessage(null);
    setResponseStatus(null);
    setMessageIndex(0);
    setRetryCount((prev) => prev + 1);
  }

  // Navigate back to onboarding
  function handleUpdateAnswers() {
    window.location.href = "/onboarding";
  }

  // Loading screen
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Crafting your roadmap
            <span className="text-accent">.</span>
          </h2>

          <div
            key={messageIndex}
            className="mt-5 flex items-center justify-center gap-3 animate-loading-message"
          >
            <span className="flex h-4 w-4 items-center justify-center">
              <span className="loading-check">
                <span className="loading-spinner" />
                <span className="loading-tick">✓</span>
              </span>
            </span>

            <p className="text-sm text-muted md:text-md">
              {loadingMessages[messageIndex]}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Technical error screen
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <h2 className="text-xl md:text-2xl font-semibold">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm text-muted md:text-md">{error}</p>

          <button
            onClick={handleRetry}
            className="mt-6 rounded-lg bg-accent px-5 py-2 text-sm text-white cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // AI validation screen
  if (validationMessage) {
    const isInvalidInput = responseStatus === "invalid_input";

    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            {isInvalidInput
              ? "Let's clarify your goal"
              : "A little more detail needed"}
            <span className="text-accent">.</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted md:text-md">
            {validationMessage}
          </p>

          <button
            onClick={handleUpdateAnswers}
            className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white cursor-pointer transition hover:opacity-90"
          >
            Update My Answers
          </button>
        </div>
      </main>
    );
  }

  // Successful roadmap
  return (
    <main className="min-h-screen bg-background">
      <RoadmapHeader roadmap={roadmap} />
      <RoadmapTimeline phases={roadmap.phases} />
    </main>
  );
}
