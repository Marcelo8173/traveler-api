import { Request, Response } from "express";

class CreateUser {
  public createNewUser(request:Request, response:Response): Response {
    const { name, email, password } = request.body;
    try {
      // validar dados
      // ve se email já existe
      // criptografia da senha

      return response.json({
        name,
        email,
        password,
      });
    } catch (error) {
      return response.status(500);
    }
  }
}

export default CreateUser;
