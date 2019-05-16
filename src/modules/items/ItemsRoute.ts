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
  ItemDataSchema,
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
        path: '/{id}',
        options: {
          response: {
            schema: ItemSchema.required(),
          },
          validate: {
            params: Joi.object({
              id: Joi.number().required(),
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

      await server.route({
        method: 'POST',
        path: '/',
        options: {
          response: {
            schema: ItemSchema.required(),
          },
          validate: {
            payload: ItemDataSchema.required(),
          },
        },
        async handler(request) {
          const item = await createItem(request.payload);
          return item;
        },
      });

      await server.route({
        method: 'PUT',
        path: '/{id}',
        options: {
          response: {
            schema: null,
          },
          validate: {
            payload: ItemDataSchema.required(),
            params: Joi.object({
              id: Joi.number().required(),
            }).required(),
          },
        },
        async handler(request) {
          const { id } = request.params;
          await updateItem(id, request.payload);
          return null;
        },
      });

      await server.route({
        method: 'DELETE',
        path: '/{id}',
        options: {
          response: {
            schema: null,
          },
          validate: {
            params: Joi.object({
              id: Joi.number().required(),
            }).required(),
          },
        },
        async handler(request) {
          const { id } = request.params;
          await deleteItem(id);
          return null;
        },
      });
    },
  },
};
