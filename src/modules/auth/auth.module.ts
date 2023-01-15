import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DOTENV } from '../../configs';
import { UsersModule } from '../users';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: DOTENV.JWT.secret,
      signOptions: { expiresIn: DOTENV.JWT.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
