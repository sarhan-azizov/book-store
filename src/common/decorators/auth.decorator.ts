import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { DOTENV } from '@/configs';

export enum EnumRoles {
  PUBLIC = 'public',
  ADMIN = 'admin',
  USER = 'user',
}
export const ROLES_KEY = 'ROLES';
export const Roles = (roles: EnumRoles[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [ROLE]: EnumRoles[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    );

    if (ROLE === EnumRoles.PUBLIC) {
      return true;
    }

    try {
      const { headers } = context.switchToHttp().getRequest();
      const token =
        headers.authorization && headers.authorization.replace('Bearer ', '');
      const parsedToken = this.jwtService.verify(token, {
        secret: DOTENV.JWT.secret,
      });

      const isValidToken = Boolean(token && parsedToken);

      if (isValidToken) {
        return ROLE === EnumRoles.USER ? true : parsedToken.isAdmin;
      }

      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
