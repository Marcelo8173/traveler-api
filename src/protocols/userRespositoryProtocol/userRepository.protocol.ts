/* eslint-disable no-unused-vars */
import { CreateNewUserDTO } from "../../DTOs/createUserDTO";
import { UserModel } from "../../models/userModel";

interface UserRepositoryProtocols {
    create(data:CreateNewUserDTO): Promise<UserModel>;
    findByEmail(email:string): Promise<boolean>
}

export { UserRepositoryProtocols };
