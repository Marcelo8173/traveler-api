import { CreateCityDTO } from "../../DTOs/cityDTO";
import { CreateCityServiceProtocols } from "../../protocols/cityRepositoryProtcol/cityRepositoryProtcol.protocol";
import { RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import CityRepository from "../../repository/cityRepository/city.repository";

class CreateCityService implements CreateCityServiceProtocols {
  private cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(data: CreateCityDTO): Promise<RequestMsg> {
    try {
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
