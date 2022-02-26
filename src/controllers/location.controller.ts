import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { LocationDTO } from "../DTOs/locationDTO";
import { LocationModel } from "../models/locationModel";
import LocationRepository from "../repository/locationRepository/location.repository";
import LocationService from "../services/useCases/create.location.service";
import { CategoryEnum } from "../enuns";
import ListAllLocationsService from "../services/useCases/listLocation.service";

class LocationController {
  async createNewLocation(request:Request, response:Response): Promise<Response> {
    const requestData: LocationDTO = request.body;
    const repository = getRepository(LocationModel);
    const locationRepository = new LocationRepository(repository);
    const locationService = new LocationService(locationRepository);

    const data = await locationService.createLocationService(requestData);

    return response.status(data.status).json(data.body);
  }

  async listAllLocations(request:Request, response:Response): Promise<Response> {
    const repository = getRepository(LocationModel);
    const locationRepository = new LocationRepository(repository);
    const locationListService = new ListAllLocationsService(locationRepository);

    const data = await locationListService.listAllLocations();

    return response.status(data.status).json(data.body);
  }

  async listAllCategories(request:Request, response:Response): Promise<Response> {
    return response.status(200).json(CategoryEnum);
  }
}

export default LocationController;
