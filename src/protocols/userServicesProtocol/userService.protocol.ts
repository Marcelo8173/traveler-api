/* eslint-disable no-unused-vars */
import { CreateNewUserDTO, UserAuthenticationDTO } from "../../DTOs/createUserDTO";

export interface RequestMsg {
    status: number,
    body: any
}

export interface CreateUserServiceProtocol {
    execute(data: CreateNewUserDTO): Promise<RequestMsg>;
}

export interface AuthenticationUserProtocol {
    execute(data: UserAuthenticationDTO): Promise<RequestMsg>;
}
