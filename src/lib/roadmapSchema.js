export const roadmapSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: {
      type: "string",
    },

    description: {
      type: "string",
    },

    duration: {
      type: "string",
    },

    timePerDay: {
      type: "string",
    },

    experience: {
      type: "string",
    },

    phases: {
      type: "array",
      minItems: 3,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: {
            type: "integer",
          },

          title: {
            type: "string",
          },

          duration: {
            type: "string",
          },

          goal: {
            type: "string",
          },

          description: {
            type: "string",
          },

          skills: {
            type: "array",
            items: {
              type: "string",
            },
          },

          projects: {
            type: "array",
            items: {
              type: "string",
            },
          },

          milestones: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        required: [
          "id",
          "title",
          "duration",
          "goal",
          "description",
          "skills",
          "projects",
          "milestones",
        ],
      },
    },
  },

  required: [
    "title",
    "description",
    "duration",
    "timePerDay",
    "experience",
    "phases",
  ],
};
