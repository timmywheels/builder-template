import { FastifyPluginAsync } from "fastify";
import FastifyOauth2 from "@fastify/oauth2";

const oauth: FastifyPluginAsync = async (fastify, _opts) => {
  await fastify.register(FastifyOauth2.default, {
    name: "Google", // naming here is weird, refer to the docs if changing this
    scope: ["email", "profile", "openid"],
    credentials: {
      client: {
        id: fastify.config.GOOGLE_CLIENT_ID,
        secret: fastify.config.GOOGLE_CLIENT_SECRET,
      },
      auth: FastifyOauth2.default.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/auth/google",
    callbackUri: `${fastify.config.API_BASE_URL}/auth/google/callback`,
  });
};

export default oauth;

declare module "fastify" {
  interface FastifyInstance {
    oauth2Google: FastifyOauth2.OAuth2Namespace;
  }
}
