import { Repository } from "typeorm";
import { CreateNewUserDTO } from "../../DTOs/createUserDTO";
import { UserModel } from "../../models/userModel";
import { UserRepositoryProtocols } from "../../protocols/userRespositoryProtocol/userRepository.protocol";

class UserRepository implements UserRepositoryProtocols {
  private userRepository:Repository<UserModel>;

  constructor(repository:Repository<UserModel>) {
    this.userRepository = repository;
  }

  async create(data: CreateNewUserDTO): Promise<UserModel> {
    const dataToSave = this.userRepository.create(data);
    await this.userRepository.query(
      `INSERT INTO "user" (id, name, email, password, created_at, updated_at)
              values(
                  '${dataToSave.id}', 
                   '${dataToSave.name}', 
                   '${dataToSave.email}', 
                   '${dataToSave.password}', 
                   '${new Date().toLocaleString()}', 
                   '${new Date().toLocaleString()}')
              `,
    );
    return dataToSave;
  }
}

export { UserRepository };
