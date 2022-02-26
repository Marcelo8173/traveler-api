import { CreateCityDTO } from "../../DTOs/cityDTO";
import { CreateCityServiceProtocols } from "../../protocols/cityRepositoryProtcol/cityRepositoryProtcol.protocol";
import { RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import CityRepository from "../../repository/cityRepository/city.repository";
import { schemaCreateNewCity, isValid } from "../../utils/encription/validations";

class CreateCityService implements CreateCityServiceProtocols {
  private cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(data: CreateCityDTO): Promise<RequestMsg> {
    try {
      const validSchema = await isValid(schemaCreateNewCity, data);
      if (validSchema.errors) {
        return {
          status: 400,
          body: validSchema.errors,
        };
      }

      const dataCreated = await this.cityRepository.create(data);

      return {
        status: 201,
        body: dataCreated,
      };
    } catch (error) {
      return {
        status: 500,
        body: error,
      };
    }
  }
}

export default CreateCityService;
