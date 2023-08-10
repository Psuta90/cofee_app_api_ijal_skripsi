import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { UtilsModule } from '@app/utils';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ModulesModule,ServeStaticModule.forRoot({
    rootPath : join(process.cwd(), 'public')
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
