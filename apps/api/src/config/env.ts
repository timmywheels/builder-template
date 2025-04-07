declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
      API_BASE_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
      SENDGRID_API_KEY: string;
    };
  }
}

export const configSchema = {
  type: "object",
  required: [
    "PORT",
    "API_BASE_URL",
    "NODE_ENV",
    "DATABASE_URL",
    "JWT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "SENDGRID_API_KEY",
  ],
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
    SENDGRID_API_KEY: {
      type: "string",
    },
  },
};
