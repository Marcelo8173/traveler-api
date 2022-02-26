import { Repository } from "typeorm";
import { LocationDTO } from "../../DTOs/locationDTO";
import { LocationModel } from "../../models/locationModel";
import { LocationRepositoryProtocols } from "../../protocols/locationRepositoryProtcol/locationRepository.protocol";

class LocationRepository implements LocationRepositoryProtocols {
  private locationRepository: Repository<LocationModel>;

  constructor(locationRepository: Repository<LocationModel>) {
    this.locationRepository = locationRepository;
  }

  async create(data: LocationDTO): Promise<LocationModel> {
    const dataToSave = this.locationRepository.create(data);
    await this.locationRepository.query(
      `INSERT INTO "location" (id, name, description, category, cep, street, district, number, city_id, created_at, updated_at)
        values(
            '${dataToSave.id}', 
            '${dataToSave.name}', 
            '${dataToSave.description}', 
            '${dataToSave.category}', 
            '${dataToSave.cep}', 
            '${dataToSave.street}', 
            '${dataToSave.district}', 
            '${dataToSave.number}', 
            '${dataToSave.city_id}', 
            '${new Date().toLocaleString()}', 
            '${new Date().toLocaleString()}')
        `,
    );

    return dataToSave;
  }

  async listAllLocations(): Promise<LocationModel[]> {
    const data = await this.locationRepository.query(
      `
        select * from "location"
      `,
    );
    return data;
  }
}

export default LocationRepository;
