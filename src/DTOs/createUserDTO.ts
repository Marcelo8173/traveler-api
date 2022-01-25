export interface CreateNewUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface UserAuthenticationDTO {
    email: string;
    password: string
}
