import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserModel } from "../models/userModel";
import { CreateNewUserDTO } from "../DTOs/createUserDTO";
import { UserRepository } from "../repository/userRepository/user.repository";

class UserController {
  async createNewUser(request:Request, response:Response): Promise<Response> {
    const dataRequest:CreateNewUserDTO = request.body;

    const repository = getRepository(UserModel);
    const userRepository = new UserRepository(repository);

    try {
      const data = await userRepository.create(dataRequest);
      return response.status(201).json({
        name: data.name,
        email: data.email,
      });
    } catch (error) {
      return response.status(500);
    }
  }
}

export default UserController;
