import { UserRepository } from "../../repository/userRepository/user.repository";
import { UserAuthenticationDTO } from "../../DTOs/createUserDTO";
import { AuthenticationUserProtocol, RequestMsg } from "../../protocols/userServicesProtocol/userService.protocol";
import BCryptHashProvider from "../../utils/encription";

class AuthenticationUserService implements AuthenticationUserProtocol {
  private readonly userRepository: UserRepository;

  private readonly bCryptHash: BCryptHashProvider;

  constructor(userRepository:UserRepository, bCryptHash:BCryptHashProvider) {
    this.userRepository = userRepository;
    this.bCryptHash = bCryptHash;
  }

  async execute(payload: UserAuthenticationDTO): Promise<RequestMsg> {
    const userExist = await this.userRepository.findByEmail(payload.email);
    if (!userExist) {
      return {
        status: 404,
        body: {
          msg: "User or password incorrect",
        },
      };
    }
    const findUser = await this.userRepository.findUserByEmail(payload.email);
    const comparePAssword = await this.bCryptHash.compareHash(
      payload.password,
      findUser.password,
    );
    if (!comparePAssword) {
      return {
        status: 404,
        body: {
          msg: "User or password incorrect",
        },
      };
    }

    return {
      status: 200,
      body: {
        msg: "ok",
      },
    };
  }
}

export default AuthenticationUserService;
