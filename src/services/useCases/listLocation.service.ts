import { RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import LocationRepository from "../../repository/locationRepository/location.repository";

class ListAllLocationsService {
  private readonly locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  async listAllLocations(): Promise<RequestMsg> {
    try {
      const listAllLocations = await this.locationRepository.listAllLocations();

      return {
        status: 201,
        body: listAllLocations,
      };
    } catch (error) {
      return {
        status: 500,
        body: error,
      };
    }
  }
}

export default ListAllLocationsService;
