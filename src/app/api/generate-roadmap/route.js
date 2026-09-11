import { ROADMAP_SYSTEM_PROMPT } from "@/lib/roadmapPrompt";
import { roadmapSchema } from "@/lib/roadmapSchema";

export async function POST(request) {
  try {
    const answers = await request.json();

    const prompt = `
${ROADMAP_SYSTEM_PROMPT}

Create a personalized roadmap using the following user profile.

USER PROFILE:

Goal:
${answers.goal || "Not provided"}

Current situation:
${answers.currentSituation || "Not provided"}

Experience:
${answers.experience || "Not provided"}

Desired outcome:
${answers.desiredOutcome || "Not provided"}

Available time:
${answers.timeAvailable || answers.time || "Not provided"}

Timeline:
${answers.timeline || "Not provided"}

Return ONLY valid JSON matching this structure:

${JSON.stringify(roadmapSchema)}
`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt,
        stream: false,
        format: roadmapSchema,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.status}`);
    }

    const data = await response.json();

    const roadmap = JSON.parse(data.response);

    return Response.json(roadmap);
  } catch (error) {
    console.error("Roadmap generation failed:", error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}