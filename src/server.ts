import Hapi from "hapi";
import { getConfig } from "./config";
import { ContactRoutePlugin } from "./modules/contact/ContactRoute";
import { ItemRoutePlugin } from "./modules/items/ItemsRoute";

export async function getServer() {
  const port = getConfig("PORT") || 3001;

  const server = new Hapi.Server({
    port,
    routes: {
      cors: true
    }
  });

  server.events.on({ name: 'request', channels: 'error' }, (_request, event, _tags) => {
    console.error(event.error);
  });

  await server.register(ContactRoutePlugin, {
    routes: {
      prefix: "/api"
    }
  });

  await server.register(ItemRoutePlugin, {
    routes: {
      prefix: "/api/items"
    }
  });

  return server;
}
