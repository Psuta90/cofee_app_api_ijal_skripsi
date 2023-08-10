import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UtilsModule } from '@app/utils';

@Module({
  imports : [UtilsModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
