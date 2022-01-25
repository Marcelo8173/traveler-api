/* eslint-disable no-unused-vars */
import { CreateNewUserDTO } from "../../DTOs/createUserDTO";

export interface RequestMsg {
    status: number,
    body: any
}

export interface CreateUserServiceProtocol {
    execute(data: CreateNewUserDTO): Promise<RequestMsg>;
}
