import Groq from "groq-sdk";
import { ROADMAP_SYSTEM_PROMPT } from "@/lib/roadmapPrompt";
import { roadmapSchema } from "@/lib/roadmapSchema";

const MODEL = "openai/gpt-oss-120b";

export async function POST(request) {
  const startTime = Date.now();

  try {
    // Check API key
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing from environment variables.");
    }

    // Validate incoming user profile
    const answers = await request.json();

    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      return Response.json({ error: "Invalid user profile." }, { status: 400 });
    }

    // Build the user-specific prompt
    const userPrompt = `
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

Additional context:
${answers.additionalContext || "Not provided"}
`;

    // Initialize Groq
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
      timeout: 120000,
      maxRetries: 0,
    });

    console.log("Sending roadmap request to Groq...");
    console.log("Model:", MODEL);
    console.log("Prompt length:", userPrompt.length);

    //Generate the roadmap
    const generationStart = Date.now();

    const completion = await groq.chat.completions.create({
      model: MODEL,

      messages: [
        {
          role: "system",
          content: ROADMAP_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "roadmap",
          strict: false,
          schema: roadmapSchema,
        },
      },

      temperature: 0.3,
      max_completion_tokens: 8192,
      reasoning_effort: "medium",
    });

    console.log(
      "Groq generation duration:",
      ((Date.now() - generationStart) / 1000).toFixed(2),
      "seconds",
    );

    // Extract generated content
    const choice = completion.choices?.[0];
    const generatedText = choice?.message?.content;

    console.log("Groq response diagnostics:", {
      model: completion.model,
      finishReason: choice?.finish_reason,
      promptTokens: completion.usage?.prompt_tokens,
      completionTokens: completion.usage?.completion_tokens,
      totalTokens: completion.usage?.total_tokens,
    });

    if (!generatedText) {
      throw new Error("Groq returned an empty response.");
    }

    if (choice.finish_reason === "length") {
      throw new Error(
        "Roadmap generation was cut off because the output token limit was reached.",
      );
    }

    // Parse the generated JSON
    let roadmap;

    try {
      roadmap = JSON.parse(generatedText);
    } catch {
      throw new Error(
        `Groq returned invalid JSON. Output length: ${generatedText.length}.`,
      );
    }

    // Validate the roadmap structure

    if (
      !roadmap ||
      typeof roadmap !== "object" ||
      !["ready", "needs_clarification", "invalid_input"].includes(
        roadmap.status,
      ) ||
      typeof roadmap.message !== "string" ||
      !Array.isArray(roadmap.phases)
    ) {
      throw new Error("Groq returned an invalid roadmap structure.");
    }

    // Handle clarification and invalid input responses
    if (
      roadmap.status === "needs_clarification" ||
      roadmap.status === "invalid_input"
    ) {
      if (roadmap.phases.length !== 0 || !roadmap.message.trim()) {
        throw new Error("Groq returned an invalid roadmap structure.");
      }

      console.log("Roadmap status:", roadmap.status);

      return Response.json(roadmap);
    }

    // Validate successful roadmap responses
    if (roadmap.phases.length < 3 || roadmap.phases.length > 7) {
      throw new Error("Groq returned an invalid roadmap structure.");
    }

    // Validate sequential phase IDs
    const hasSequentialIds = roadmap.phases.every(
      (phase, index) => phase.id === index + 1,
    );

    if (!hasSequentialIds) {
      throw new Error("Groq returned invalid phase IDs.");
    }
    // Return the generated roadmap
    console.log("Generated phases:", roadmap.phases.length);

    console.log(
      "Total API duration:",
      ((Date.now() - startTime) / 1000).toFixed(2),
      "seconds",
    );

    return Response.json(roadmap);
  } catch (error) {
    console.error("Groq roadmap generation failed:", error);

    // Detect timeout errors
    const isTimeout =
      error.name?.toLowerCase().includes("timeout") ||
      error.code === "ETIMEDOUT" ||
      error.message?.toLowerCase().includes("timeout") ||
      error.message?.toLowerCase().includes("timed out");

    // Determine HTTP status
    const status = isTimeout
      ? 504
      : error.status === 429
        ? 429
        : error.status === 503
          ? 503
          : error.status === 400
            ? 400
            : 500;

    // Set user-friendly error message
    let message = error.message || "Roadmap generation failed.";

    if (isTimeout) {
      message =
        "Roadmap generation is taking longer than expected. Please try again in a moment.";
    } else if (status === 429) {
      message = "Groq rate limit reached. Please try again later.";
    } else if (status === 503) {
      message = "Groq is temporarily unavailable. Please try again shortly.";
    }

    return Response.json({ error: message }, { status });
  }
}
