export async function generateRoadmap(answers) {
  const controller = new AbortController();

  // Frontend safety timeout: 130 seconds
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 130000);

  try {
    const response = await fetch("/api/generate-roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
      signal: controller.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      throw new Error(data.error || "Failed to generate roadmap.");
    }

    return data;
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(
        "Roadmap generation is taking longer than expected. Please try again.",
      );
    }

    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect. Please check your internet connection and try again.",
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
