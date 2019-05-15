import Joi from 'joi';
import Boom from '@hapi/boom';
import { ServerRegisterPluginObject } from 'hapi';
import {
  ItemSchema,
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from 'src/models/Item';

export const ItemRoutePlugin: ServerRegisterPluginObject<never> = {
  plugin: {
    name: 'Item Routes',
    async register(server) {
      await server.route({
        method: 'GET',
        path: '/',
        options: {
          response: {
            schema: Joi.array()
              .items(ItemSchema.optional())
              .required(),
          },
        },
        async handler() {
          return getAllItems();
        },
      });

      await server.route({
        method: 'GET',
        path: '/:id',
        options: {
          response: {
            schema: ItemSchema.required(),
          },
          validate: {
            params: Joi.object({
              id: Joi.string().required(),
            }).required(),
          },
        },
        async handler(request) {
          const { id } = request.params;
          
          const item = await getItemById(id);
          if (!item) {
            throw Boom.notFound('Item not found!');
          }

          return item;
        },
      });
    },
  },
};
