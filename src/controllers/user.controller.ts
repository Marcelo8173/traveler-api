import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserModel } from "../models/userModel";
import { CreateNewUserDTO, UserAuthenticationDTO } from "../DTOs/createUserDTO";
import { UserRepository } from "../repository/userRepository/user.repository";
import CreateUserService from "../services/useCases/create.user.service";
import BCryptHashProvider from "../utils/encription";
import AuthenticationUserService from "../services/useCases/authentication.user.service";

class UserController {
  async createNewUser(request: Request, response: Response): Promise<Response> {
    const dataRequest: CreateNewUserDTO = request.body;

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

  async authenticationUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const requestData: UserAuthenticationDTO = request.body;
    const repository = getRepository(UserModel);
    const userRepository = new UserRepository(repository);
    const bCryptHash = new BCryptHashProvider();
    const authenticationUserService = new AuthenticationUserService(userRepository, bCryptHash);
    try {
      const data = await authenticationUserService.execute(requestData);
      // retornar um status de sucesso e um token jwt para athenticação
      return response.status(data.status).json(data.body);
    } catch (error) {
      return response.status(500);
    }
  }
}

export default UserController;
