import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserModel } from "../models/userModel";
import { CreateNewUserDTO } from "../DTOs/createUserDTO";
import { UserRepository } from "../repository/userRepository/user.repository";
import CreateUserService from "../services/useCases/create.user.service";
import BCryptHashProvider from "../utils/encription";

class UserController {
  async createNewUser(request:Request, response:Response): Promise<Response> {
    const dataRequest:CreateNewUserDTO = request.body;

    const repository = getRepository(UserModel);
    const userRepository = new UserRepository(repository);
    const bCryptHash = new BCryptHashProvider();
    const createUserService = new CreateUserService(userRepository, bCryptHash);

    try {
      const data = await createUserService.execute(dataRequest);

      delete data.body.password;

      return response.status(data.status).json(data.body);
    } catch (error) {
      return response.status(500);
    }
  }
}

export default UserController;
