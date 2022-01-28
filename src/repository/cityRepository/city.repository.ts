import { Repository } from "typeorm";
import { CreateCityDTO } from "../../DTOs/cityDTO";
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

  async listAll(): Promise<CityModel[]> {
    const cities = await this.cityRepository.query(
      `SELECT * FROM "city"
      `,
    );

    return cities;
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
