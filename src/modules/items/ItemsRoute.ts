import Joi from "joi";
import { ServerRegisterPluginObject } from "hapi";

export const ItemRoutePlugin: ServerRegisterPluginObject<never> = {
  plugin: {
    name: "Item Routes",
    async register(server) {

      await server.route({
        method: "GET",
        path: "/contact",
        options: {
          response: {}
        },
        async handler() {
          return {}
        }
      });
    }
  }
};
