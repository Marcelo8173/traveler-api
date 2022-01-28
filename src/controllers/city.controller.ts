import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CreateCityDTO } from "../DTOs/cityDTO";
import { CityModel } from "../models/cityModel";
import CityRepository from "../repository/cityRepository/city.repository";
import CreateCityService from "../services/useCases/create.city.service";
import ListCityService from "../services/useCases/list.city.service";
import ListCityByIdService from "../services/useCases/list.city.id.service";

class CityController {
  async createNewCity(request:Request, response:Response): Promise<Response> {
    const dataRequest: CreateCityDTO = request.body;

    const repository = getRepository(CityModel);
    const cityRepository = new CityRepository(repository);
    const createCityService = new CreateCityService(cityRepository);

    const data = await createCityService.execute(dataRequest);
    return response.status(data.status).json(data.body);
  }

  async listAllCities(request:Request, response:Response): Promise<Response> {
    const repository = getRepository(CityModel);
    const cityRepository = new CityRepository(repository);
    const listCityService = new ListCityService(cityRepository);

    const data = await listCityService.execute();
    return response.status(data.status).json(data.body);
  }

  async getCityById(request:Request, response:Response): Promise<Response> {
    const { id } = request.params;
    const repository = getRepository(CityModel);
    const cityRepository = new CityRepository(repository);

    const ListCityById = new ListCityByIdService(cityRepository);

    const data = await ListCityById.execute(id);
    return response.status(data.status).json(data.body);
  }
}

export default CityController;
