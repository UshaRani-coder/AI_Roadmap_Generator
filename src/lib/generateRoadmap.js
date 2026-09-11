export async function generateRoadmap(answers) {
  const response = await fetch("/api/generate-roadmap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("API ERROR:", data);
    throw new Error(data.error || "Failed to generate roadmap");
  }

  return data;
}