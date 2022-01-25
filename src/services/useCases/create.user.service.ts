import { UserRepository } from "../../repository/userRepository/user.repository";
import { CreateNewUserDTO } from "../../DTOs/createUserDTO";
import { CreateUserServiceProtocol, RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import BCryptHashProvider from "../../utils/encription";

class CreateUserService implements CreateUserServiceProtocol {
  private readonly userRepository: UserRepository;

  private readonly bCryptHash: BCryptHashProvider;

  constructor(userRepository:UserRepository, bCryptHash:BCryptHashProvider) {
    this.userRepository = userRepository;
    this.bCryptHash = bCryptHash;
  }

  async execute(payload: CreateNewUserDTO): Promise<RequestMsg> {
    const emailExist = await this.userRepository.findByEmail(payload.email);

    if (emailExist) {
      return {
        status: 400,
        body: {
          msg: `this email, ${payload.email}, alredy exist`,
        },
      };
    }

    const data = await this.userRepository.create({
      email: payload.email,
      name: payload.name,
      password: await this.bCryptHash.generateHash(payload.password),
    });

    return {
      status: 201,
      body: data,
    };
  }
}

export default CreateUserService;
