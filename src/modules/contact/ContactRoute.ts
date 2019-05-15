import Joi from "joi";
import { ServerRegisterPluginObject } from "hapi";

export const ContactRoutePlugin: ServerRegisterPluginObject<never> = {
  plugin: {
    name: "Contact Routes",
    async register(server) {
      await server.route({
        method: "GET",
        path: "/contact",
        options: {
          response: {
            schema: Joi.object({
              author: Joi.string().required(),
              email: Joi.string()
                .email()
                .required(),
              webpage: Joi.string()
                .uri()
                .required(),
              twitterName: Joi.string().required()
            })
          }
        },
        async handler() {
          return {
            author: 'Michał Miszczyszyn',
            email: 'hi@typeofweb.com',
            webpage: 'https://typeofweb.com/',
            twitterName: 'mmiszy',
          }
        }
      });
    }
  }
};
