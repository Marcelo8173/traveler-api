import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserModel } from "../models/userModel";
import { CreateNewUserDTO, UserAuthenticationDTO } from "../DTOs/createUserDTO";
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

  async authenticationUser(request:Request, response:Response): Promise<Response> {
    try {
      const requestData: UserAuthenticationDTO = request.body;
      const repository = getRepository(UserModel);
      const userRepository = new UserRepository(repository);
      const bCryptHash = new BCryptHashProvider();

      const userExist = await userRepository.findByEmail(requestData.email);

      if (!userExist) {
        return response.status(404).json({ msg: "User or password incorrect" });
      }

      const findUser = await userRepository.findUserByEmail(requestData.email);
      const comparePAssword = await bCryptHash.compareHash(requestData.password, findUser.password);
      if (!comparePAssword) {
        return response.status(404).json({ msg: "User or password incorrect" });
      }

      return response.status(200).json({ msg: "ok" });
      // retornar um status de sucesso e um token jwt para athenticação
    } catch (error) {
      return response.status(500);
    }
  }
}

export default UserController;
