/* eslint-disable no-unused-vars */
import { LocationDTO } from "../../DTOs/locationDTO";
import { LocationModel } from "../../models/locationModel";

export interface LocationRepositoryProtocols {
    create(data: LocationDTO): Promise<LocationModel>
}
