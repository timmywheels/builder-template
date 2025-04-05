declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
      API_BASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
    };
  }
}

export const configSchema = {
  type: "object",
  properties: {
    PORT: {
      type: "string",
      default: 5000,
    },
    API_BASE_URL: {
      type: "string",
    },
    NODE_ENV: {
      type: "string",
    },
    DATABASE_URL: {
      type: "string",
    },
    JWT_SECRET: {
      type: "string",
    },
    GOOGLE_CLIENT_ID: {
      type: "string",
    },
    GOOGLE_CLIENT_SECRET: {
      type: "string",
    },
  },
};
