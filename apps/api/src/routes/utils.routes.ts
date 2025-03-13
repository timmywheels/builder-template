import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";
import { z } from "zod";
import { capitalize, slugify, formatCurrency, formatDate } from "@app/utils";

const routes: FastifyPluginCallbackZodOpenApi = (fastify, _opts, done) => {
  // String utilities demo endpoint
  fastify.get(
    "/utils/string/:text",
    {
      schema: {
        params: z.object({
          text: z.string().min(1),
        }),
        querystring: z.object({
          operation: z.enum(["capitalize", "slugify"]).default("capitalize"),
        }),
        response: {
          200: z.object({
            original: z.string(),
            result: z.string(),
            operation: z.string(),
          }),
        },
      },
    },
    (request) => {
      const { text } = request.params;
      const { operation } = request.query;

      let result = text;
      if (operation === "capitalize") {
        result = capitalize(text);
      } else if (operation === "slugify") {
        result = slugify(text);
      }

      return {
        original: text,
        result,
        operation,
      };
    }
  );

  // Number utilities demo endpoint
  fastify.get(
    "/utils/currency/:amount",
    {
      schema: {
        params: z.object({
          amount: z.string().regex(/^\d+(\.\d+)?$/),
        }),
        querystring: z.object({
          currency: z.string().default("USD"),
          locale: z.string().default("en-US"),
        }),
        response: {
          200: z.object({
            amount: z.number(),
            formatted: z.string(),
            currency: z.string(),
            locale: z.string(),
          }),
        },
      },
    },
    (request) => {
      const amount = parseFloat(request.params.amount);
      const { currency, locale } = request.query;

      return {
        amount,
        formatted: formatCurrency(amount, currency, locale),
        currency,
        locale,
      };
    }
  );

  // Date utilities demo endpoint
  fastify.get(
    "/utils/date",
    {
      schema: {
        querystring: z.object({
          date: z.string().default(() => new Date().toISOString()),
          format: z.string().default("yyyy-MM-dd"),
          locale: z.string().default("en-US"),
        }),
        response: {
          200: z.object({
            original: z.string(),
            formatted: z.string(),
            format: z.string(),
            locale: z.string(),
          }),
        },
      },
    },
    (request) => {
      const { date, format, locale } = request.query;

      return {
        original: date,
        formatted: formatDate(new Date(date), format, locale),
        format,
        locale,
      };
    }
  );

  done();
};

export default routes;
