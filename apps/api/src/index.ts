import Fastify from "fastify";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import autoload from "@fastify/autoload";
import { ZodTypeProvider, validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import fastifyEnv from "@fastify/env";

// Get the current file's directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 1028,
    },
  },
};

interface AppOptions {
  logger?: boolean;
}

async function main(opts: AppOptions = {}) {
  const fastify = Fastify({
    logger: opts.logger ?? true,
  }).withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  // Register routes using autoload
  await fastify.register(autoload, {
    dir: path.join(__dirname, "routes"),
    options: {
      prefix: "/api",
    },
    autoHooks: true,
    cascadeHooks: true,
  });

  console.log(fastify.printRoutes());

  await fastify.register(fastifyEnv, { schema });

  await fastify.ready();
  await fastify.listen({ port: fastify.config.PORT });
  console.log(`Server is running on port ${fastify.config.PORT}...`);
}

main().catch((err) => console.error("Failed to start server...", err));

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
    };
  }
}
