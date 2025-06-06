import Fastify from "fastify";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import autoload from "@fastify/autoload";
import { ZodTypeProvider, validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import fastifyEnv from "@fastify/env";
import { configSchema } from "./config/env.js";

// Get the current file's directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface AppOptions {
  logger?: boolean;
}

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
} as const;

function getLogger(env: string) {
  return envToLogger[env as keyof typeof envToLogger] ?? envToLogger.development;
}

async function main(opts: AppOptions = {}) {
  const fastify = Fastify({
    logger: getLogger(process.env.NODE_ENV!) ?? opts.logger,
  }).withTypeProvider<ZodTypeProvider>();

  // set validator and serializer
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  // register env
  await fastify.register(fastifyEnv, { dotenv: true, schema: configSchema });

  // register global plugins
  await fastify.register(autoload, {
    dir: path.join(__dirname, "plugins"),
    autoHooks: true,
    cascadeHooks: true,
    encapsulate: false,
  });

  // register routes
  await fastify.register(autoload, {
    dir: path.join(__dirname, "app"),
    matchFilter: /\.plugin\.ts$/,
    autoHooks: true,
    cascadeHooks: true,
    encapsulate: false,
    dirNameRoutePrefix: true,
  });

  // print plugins
  fastify.log.info(fastify.printPlugins());

  // print routes
  fastify.log.info(fastify.printRoutes({ commonPrefix: false }));

  // start server
  await fastify.listen({ port: fastify.config.PORT });
  fastify.log.info(`Server is running on port ${fastify.config.PORT}...`);
}

main().catch((err) => console.error("Failed to start server...", err));
