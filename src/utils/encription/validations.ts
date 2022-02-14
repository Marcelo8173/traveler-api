/* eslint-disable arrow-body-style */
import * as yup from "yup";
import { LocationDTO } from "../../DTOs/locationDTO";
import { CategoryEnum } from "../../enuns";

export const schemaCreateNewLocation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.mixed().oneOf([CategoryEnum.ATTRACTIONS, CategoryEnum.EVENTS, CategoryEnum.FOOD]),
  cep: yup.string().required(),
  street: yup.string().required(),
  district: yup.string().required(),
  number: yup.string().required(),
  city_id: yup.string().required(),
});

export const isValid = async (object: yup.AnyObjectSchema, data: LocationDTO) => {
  const valid = await object.validate(data).catch((err) => (err));
  return valid;
};
