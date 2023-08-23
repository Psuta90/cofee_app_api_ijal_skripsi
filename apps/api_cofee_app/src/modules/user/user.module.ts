import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UtilsModule } from '@app/utils';

@Module({
  imports: [UtilsModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
