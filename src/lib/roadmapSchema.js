export const roadmapSchema = {
  type: "object",
  additionalProperties: false,

  properties: {
    status: {
      type: "string",
      enum: ["ready", "needs_clarification", "invalid_input"],
    },

    message: {
      type: "string",
    },

    title: { type: "string" },
    description: { type: "string" },
    duration: { type: "string" },
    timePerDay: { type: "string" },
    experience: { type: "string" },

    phases: {
      type: "array",
      minItems: 0,
      maxItems: 7,

      items: {
        type: "object",
        additionalProperties: false,

        properties: {
          id: {
            type: "integer",
            minimum: 1,
            maximum: 7,
          },

          title: { type: "string" },

          durationWeeks: {
            type: "integer",
            minimum: 1,
          },

          goal: { type: "string" },
          description: { type: "string" },

          focusAreas: {
            type: "array",
            minItems: 1,
            items: { type: "string" },
          },

          actions: {
            type: "array",
            minItems: 1,
            items: { type: "string" },
          },

          successIndicators: {
            type: "array",
            minItems: 1,
            items: { type: "string" },
          },
        },

        required: [
          "id",
          "title",
          "durationWeeks",
          "goal",
          "description",
          "focusAreas",
          "actions",
          "successIndicators",
        ],
      },
    },
  },

  required: [
    "status",
    "message",
    "title",
    "description",
    "duration",
    "timePerDay",
    "experience",
    "phases",
  ],
};
