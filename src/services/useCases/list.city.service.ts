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
      const listAllCities = await this.cityRepository.listAll();
      const citielsWithLocations = await this.cityRepository.listCitiesWithLocations();
      const data = [...listAllCities];

      citielsWithLocations.forEach((element) => {
        const cityExist = listAllCities.findIndex((city) => city.name === element.name);
        data[cityExist].locations = element.locations;
      });

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
