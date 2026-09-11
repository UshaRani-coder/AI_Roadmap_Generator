"use client";

import { useEffect, useState } from "react";

import RoadmapHeader from "./RoadmapHeader";
import RoadmapTimeline from "./RoadmapTimeline";
import { generateRoadmap } from "@/lib/generateRoadmap";

export default function RoadmapContent() {
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    async function createRoadmap() {
      const savedAnswers = localStorage.getItem("roadmapAnswers");

      if (!savedAnswers) return;

      try {
        const answers = JSON.parse(savedAnswers);

        const generatedRoadmap = await generateRoadmap(answers);

        setRoadmap(generatedRoadmap);
      } catch (error) {
        console.error("Failed to generate roadmap:", error);
      }
    }

    createRoadmap();
  }, []);
  
  if (!roadmap) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted">
          Creating your personalized roadmap...
        </p>
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
