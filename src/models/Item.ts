import Joi from "joi";

const ItemSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  createdOn: Joi.date().required()
}).required();

export type Item = Joi.SchemaValue<typeof ItemSchema>;
