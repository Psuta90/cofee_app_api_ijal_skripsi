import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtModule } from '@app/jwt';
import { UtilsModule } from '@app/utils';

@Module({
  imports : [AuthJwtModule,UtilsModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
