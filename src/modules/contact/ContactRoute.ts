import { ServerRegisterPluginObject } from "hapi";

export const ContactRoutePlugin:ServerRegisterPluginObject<never> = {
  plugin: {
    name: 'Contact Routes',
    async register(server){
      // await server.route() // @todo
    }
  }
}
