import Fastify from "fastify";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import autoload from "@fastify/autoload";
import { ZodTypeProvider, validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface AppOptions {
  port?: number;
}

async function main(opts: AppOptions = {}) {
  const fastify = Fastify().withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.register(autoload, {
    dir: path.join(__dirname, "routes"),
    options: {
      prefix: "/api",
    },
  });

  await fastify.listen({ port: opts.port ?? 1028 });
  console.log(`Server is running on port ${opts.port ?? 1028}...`);
}

main().catch((err) => console.error("Failed to start server...", err));
