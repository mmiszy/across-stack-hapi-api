import Joi from "joi";
import { ServerRegisterPluginObject } from "hapi";
import { ItemSchema } from "src/models/Item";

export const ItemRoutePlugin: ServerRegisterPluginObject<never> = {
  plugin: {
    name: "Item Routes",
    async register(server) {

      await server.route({
        method: "GET",
        path: "/items",
        options: {
          response: {
            schema: Joi.array().items(ItemSchema.optional()).required()
          }
        },
        async handler() {
          return [];
        }
      });
    }
  }
};
