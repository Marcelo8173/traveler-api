import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { LocationDTO } from "../DTOs/locationDTO";
import { LocationModel } from "../models/locationModel";
import LocationRepository from "../repository/locationRepository/location.repository";
import LocationService from "../services/useCases/create.location.service";

class LocationController {
  async createNewLocation(request:Request, response:Response): Promise<Response> {
    const requestData: LocationDTO = request.body;
    const repository = getRepository(LocationModel);
    const locationRepository = new LocationRepository(repository);
    const locationService = new LocationService(locationRepository);

    const data = await locationService.createLocationService(requestData);

    return response.status(data.status).json(data.body);
  }
}

export default LocationController;
