import Hapi from "hapi";
import { getConfig } from "./config";
import { ContactRoutePlugin } from "./modules/contact/ContactRoute";

export async function getServer() {
  const port = getConfig("PORT") || 3001;

  const server = new Hapi.Server({
    port,
    routes: {
      cors: true
    }
  });

  await server.register(ContactRoutePlugin, {
    routes: {
      prefix: '/api'
    }
  })
  
  return server;
}
