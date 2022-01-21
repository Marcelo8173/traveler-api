import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserModel } from "../models/userModel";

class CreateUser {
  async createNewUser(request:Request, response:Response): Promise<Response> {
    const { name, email, password } = request.body;
    try {
      // validar dados
      // ve se email já existe
      // criptografia da senha
      const repository = getRepository(UserModel);
      const create = repository.create({
        name,
        email,
        password,
      });

      const data = await repository.save(create);

      return response.status(201).json(data);
    } catch (error) {
      return response.status(500);
    }
  }
}

export default CreateUser;
