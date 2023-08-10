import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { PrismaModule } from '@app/prisma';
import { Request } from './classess/request';
import { Response } from './classess/response';
import { Password } from './classess/password';
import { UtilString } from './classess/string';

@Module({
  imports:[PrismaModule],
  providers: [UtilsService,Request,Response,Password,UtilString],
  exports: [UtilsService,Request,Response,Password, UtilString],
})
export class UtilsModule {}
