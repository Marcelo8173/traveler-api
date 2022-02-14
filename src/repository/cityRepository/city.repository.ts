import { Repository } from "typeorm";
import { CreateCityDTO, ListCityDTO } from "../../DTOs/cityDTO";
import { CityModel } from "../../models/cityModel";
import { CityRepositoryProtocols } from "../../protocols/cityRepositoryProtcol/cityRepositoryProtcol.protocol";

class CityRepository implements CityRepositoryProtocols {
  private cityRepository: Repository<CityModel>;

  constructor(repository: Repository<CityModel>) {
    this.cityRepository = repository;
  }

  async create(data: CreateCityDTO): Promise<CityModel> {
    const dataToSave = this.cityRepository.create(data);

    await this.cityRepository.query(
      `INSERT INTO "city" (id, name, description, created_at, updated_at)
        values(
            '${dataToSave.id}', 
            '${dataToSave.name}', 
            '${dataToSave.description}', 
            '${new Date().toLocaleString()}', 
            '${new Date().toLocaleString()}')
        `,
    );

    return dataToSave;
  }

  async listAll(): Promise<ListCityDTO[]> {
    const cities = await this.cityRepository.query(
      `SELECT * FROM "city"
      `,
    );

    return cities;
  }

  async listCitiesWithLocations(): Promise<any[]> {
    const citielsWithLocations = await this.cityRepository.query(
      `
      select c.name, count(l.name) as locations from "city" c inner join "location" l ON c.id = l.city_id group by c.name
      `,
    );
    return citielsWithLocations;
  }

  async getCityBiId(id: string): Promise<CityModel> {
    const cities = await this.cityRepository.query(
      `SELECT * FROM "city" where id = '${id}'
      `,
    );
    return cities;
  }
}

export default CityRepository;
