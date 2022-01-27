/* eslint-disable no-unused-vars */
import { CityModel } from "../../models/cityModel";
import { CreateCityDTO } from "../../DTOs/cityDTO";
import { RequestMsg } from "../userServicesProtocol/userService.protocol";

export interface CityRepositoryProtocols {
  create(data: CreateCityDTO): Promise<CityModel>;
}

export interface CreateCityServiceProtocols {
  execute(data: CreateCityDTO): Promise<RequestMsg>;
}

export interface ListCityServiceProtocols {
  execute(): Promise<RequestMsg>;
}
