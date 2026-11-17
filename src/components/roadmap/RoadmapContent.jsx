
"use client";

import { useEffect, useState, useRef } from "react";

import RoadmapHeader from "./RoadmapHeader";
import RoadmapTimeline from "./RoadmapTimeline";
import { generateRoadmap } from "@/lib/generateRoadmap";

export default function RoadmapContent() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const hasGenerated = useRef(false);

  useEffect(() => {
    if (hasGenerated.current) return;

    hasGenerated.current = true;

    async function createRoadmap() {
      try {
        setLoading(true);
        setError(null);

        const savedAnswers = localStorage.getItem("roadmapAnswers");

        if (!savedAnswers) {
          throw new Error("No roadmap answers found.");
        }

        const answers = JSON.parse(savedAnswers);

        console.time("Roadmap Generation");

        const generatedRoadmap = await generateRoadmap(answers);

        console.timeEnd("Roadmap Generation");

        if (!generatedRoadmap?.phases?.length) {
          throw new Error("Invalid roadmap response.");
        }

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

  function handleRetry() {
    hasGenerated.current = false;
    setRoadmap(null);
    setError(null);
    setRetryCount((prev) => prev + 1);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-sm text-muted">
            Creating your personalized roadmap...
          </p>
          <p className="mt-2 text-xs text-muted">
            This may take a little while.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm text-muted">
            {error}
          </p>

          <button
            onClick={handleRetry}
            className="mt-6 rounded-lg bg-accent px-5 py-2 text-sm text-white"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <RoadmapHeader roadmap={roadmap} />
      <RoadmapTimeline phases={roadmap.phases} />
    </main>
  );
}
