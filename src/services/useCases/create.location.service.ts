import { LocationDTO } from "../../DTOs/locationDTO";
import { RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import LocationRepository from "../../repository/locationRepository/location.repository";

class CreationLocationService {
  private readonly locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  async createLocationService(data:LocationDTO): Promise<RequestMsg> {
    try {
      const locationCreated = await this.locationRepository.create(data);

      return {
        status: 201,
        body: locationCreated,
      };
    } catch (error) {
      return {
        status: 500,
        body: error,
      };
    }
  }
}

export default CreationLocationService;
