import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UtilsModule } from '@app/utils';

@Module({
  imports : [UtilsModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
