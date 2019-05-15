import Joi from 'joi';

export const ItemDataSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).required();

export const ItemSchema = ItemDataSchema.keys({
  id: Joi.number().required(),
  createdOn: Joi.date().required(),
}).required();

export type ItemData = Joi.SchemaValue<typeof ItemDataSchema>;
export type Item = Joi.SchemaValue<typeof ItemSchema>;

export async function getAllItems(): Promise<Item[]> {
  return [];
}

export async function getItemById(id: Item['id']): Promise<Item> {}

export async function createItem(itemData: ItemData): Promise<Item> {}

export async function updateItem(id: Item['id'], itemData: ItemData): Promise<Item> {}

export async function deleteItem(id: Item['id']): Promise<void> {}
