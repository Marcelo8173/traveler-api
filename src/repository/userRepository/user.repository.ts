/* eslint-disable no-else-return */
import { Repository } from "typeorm";
import { CreateNewUserDTO } from "../../DTOs/createUserDTO";
import { UserModel } from "../../models/userModel";
import { UserRepositoryProtocols } from "../../protocols/userRespositoryProtocol/userRepository.protocol";

class UserRepository implements UserRepositoryProtocols {
  private userRepository: Repository<UserModel>;

  constructor(repository: Repository<UserModel>) {
    this.userRepository = repository;
  }

  async findByEmail(email: string): Promise<boolean> {
    const emailExist = await this.userRepository.query(
      `SELECT * FROM "user" where email = '${email}'
      `,
    );

    if (emailExist.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    const findUser = await this.userRepository.query(
      `SELECT * FROM "user" where email = '${email}'`,
    );
    return findUser[0];
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
