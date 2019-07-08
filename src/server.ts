import Hapi from 'hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

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

  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: 'Across Stack Hapi API Documentation',
    },
    reuseDefinitions: false,
  };

  await server.register([
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger, options: swaggerOptions
    }
  ] as any);

  await server.register({ plugin: ContactRoutePlugin });
  await server.register({ plugin: ItemRoutePlugin }, {
    routes: {
      prefix: '/items',
    },
  });

  return server;
}
