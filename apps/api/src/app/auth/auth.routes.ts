import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";
import { GoogleUser } from "./auth.schema.js";
import { z } from "zod";

const routes: FastifyPluginCallbackZodOpenApi = (fastify, _opts, done) => {
  fastify.get("/google", {}, (req, res) => {
    return fastify.oauth2Google.generateAuthorizationUri(req, res, (err, uri) => {
      if (err) {
        fastify.log.error(err);
        return res.status(500).send("Error generating authorization URI");
      }
      return res.redirect(uri);
    });
  });

  fastify.get("/google/callback", {}, async (req, res) => {
    const { token: providerToken } =
      await fastify.oauth2Google.getAccessTokenFromAuthorizationCodeFlow(req);

    const userInfo = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: {
        Authorization: `Bearer ${providerToken.access_token}`,
      },
    });

    const userInfoData: GoogleUser = await userInfo.json();
    const existingUser = await fastify.user.repository.user.getUserByEmail(userInfoData.email);

    if (existingUser) {
      const token = fastify.jwt.sign({ id: existingUser.id }, { expiresIn: "30d" });
      return res.status(200).send({ token });
    }

    const token = await fastify.auth.services.auth.register({
      email: userInfoData.email,
      name: userInfoData.name ?? null,
      avatar: userInfoData.picture ?? null,
      password: null,
    });

    return res.status(200).send({ token });
  });
  done();

  fastify.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { email, password } = req.body;
      const token = await fastify.auth.services.auth.login({ email, password });
      return res.status(200).send({ token });
    }
  );

  fastify.post(
    "/register",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
          name: z.string().optional(),
          avatar: z.string().optional(),
        }),
      },
    },
    async (req, res) => {
      const { email, password, name, avatar } = req.body;
      const token = await fastify.auth.services.auth.register({
        email,
        password,
        name: name ?? null,
        avatar: avatar ?? null,
      });
      return res.status(200).send({ token });
    }
  );
};

export default routes;
