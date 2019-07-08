import Joi from "joi";
import { Plugin } from "hapi";

export const ContactRoutePlugin: Plugin<never> = {
    name: "Contact Routes",
    async register(server) {
      await server.route({
        method: "GET",
        path: "/contact",
        options: {
          tags: ['api'],
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
            }).label('Contact')
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
};
