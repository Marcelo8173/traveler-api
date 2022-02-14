import { LocationDTO } from "../../DTOs/locationDTO";
import { RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import LocationRepository from "../../repository/locationRepository/location.repository";
import { schemaCreateNewLocation, isValid } from "../../utils/encription/validations";

class CreationLocationService {
  private readonly locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  async createLocationService(data:LocationDTO): Promise<RequestMsg> {
    try {
      const validSchema = await isValid(schemaCreateNewLocation, data);
      if (validSchema.errors) {
        return {
          status: 400,
          body: validSchema.errors,
        };
      }
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
