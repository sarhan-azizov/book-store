import { HttpStatus, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users';
import { AuthRequestDTO, AuthResponseDTO } from './dto';
import { CustomBusinessException, EnumModules } from '../../common';

export type TTokenPayload = {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(authRequestDTO: AuthRequestDTO): Promise<AuthResponseDTO> {
    try {
      const foundUser = await this.usersService.getUser(authRequestDTO.email);

      const isPasswordValid = compareSync(
        authRequestDTO.password,
        String(foundUser?.password),
      );

      if (!isPasswordValid) {
        throw new CustomBusinessException(
          'the pair of login and password is not valid',
          EnumModules.AUTH,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const tokenPayload: TTokenPayload = {
        id: String(foundUser?.id),
        email: authRequestDTO.email,
        password: authRequestDTO.password,
        isAdmin: Boolean(foundUser?.admin),
      };

      const token = this.jwtService.sign(tokenPayload);

      return {
        access_token: token,
      };
    } catch (err) {
      throw err;
    }
  }
}
