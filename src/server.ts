import Hapi from "hapi";
import { getConfig } from "./config";

export function getServer() {
  const port = getConfig("PORT") || 3001;

  const server = new Hapi.Server({
    port,
    routes: {
      cors: true
    }
  });

  await server.register()
  
  return server;
}
