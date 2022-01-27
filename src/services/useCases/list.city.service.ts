import { ListCityServiceProtocols } from "../../protocols/cityRepositoryProtcol/cityRepositoryProtcol.protocol";
import { RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import CityRepository from "../../repository/cityRepository/city.repository";

class ListCityService implements ListCityServiceProtocols {
  private cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(): Promise<RequestMsg> {
    try {
      const data = await this.cityRepository.listAll();
      return {
        status: 200,
        body: data,
      };
    } catch (error) {
      return {
        status: 500,
        body: error,
      };
    }
  }
}

export default ListCityService;
