import { ListCityByIdProtocols } from "../../protocols/cityRepositoryProtcol/cityRepositoryProtcol.protocol";
import { RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import CityRepository from "../../repository/cityRepository/city.repository";

class ListCityByIdService implements ListCityByIdProtocols {
  private cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(id: string): Promise<RequestMsg> {
    try {
      const data = await this.cityRepository.getCityBiId(id);
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

export default ListCityByIdService;
