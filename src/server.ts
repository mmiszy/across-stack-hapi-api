import Hapi from 'hapi';
import { getConfig } from './config';
import { ContactRoutePlugin } from './modules/contact/ContactRoute';
import { ItemRoutePlugin } from './modules/items/ItemsRoute';

export async function getServer() {
  const port = getConfig('PORT') || 3001;

  const validationOptions = {
    allowUnknown: false,
    convert: true,
    stripUnknown: { objects: true },
  };

  const server = new Hapi.Server({
    port,
    routes: {
      cors: true,
      response: {
        modify: true,
        options: validationOptions,
      },
      validate: {
        options: validationOptions,
        async failAction(_request, _h, err) {
          throw err;

          // if (isProd()) … 
        },
      },
    },
  });

  server.events.on({ name: 'request', channels: 'error' }, (_request, event, _tags) => {
    console.error(event.error);
  });

  await server.register(ContactRoutePlugin);
  await server.register(ItemRoutePlugin, {
    routes: {
      prefix: '/items',
    },
  });

  return server;
}
