declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
    };
  }
}

export const configSchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 1028,
    },
  },
};
