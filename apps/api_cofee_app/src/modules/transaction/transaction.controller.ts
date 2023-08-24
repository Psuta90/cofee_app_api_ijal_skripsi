import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaymentMethodDto } from './dto/payment-method.dto';
import { JwtAuthGuard } from '@app/jwt/jwt_guard/jwt_guard.guard';
import { RoleGuardGuard } from '../../role-guard/role-guard.guard';
import { Roles } from 'libs/custom_decorators/roles.decorators';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Controller('api/v1/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(2)
  @Post("/buy")
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Post("/payment_method")
  async addPaymentMethod(@Body() paymentMethodDto: PaymentMethodDto) {
    return await this.transactionService.addPaymentMethod(paymentMethodDto);
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Get("list/payment_method")
  async findAllPaymentMethod() {
    return await this.transactionService.findAllPaymentMethod();
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Delete("list/payment_method/:id")
  async deletePaymentMethod(@Param('id') id:string) {
    return await this.transactionService.deletePaymentMethod(+id);
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Patch("list/payment_method/:id")
  async updatePaymentMethod(@Param('id') id:string, @Body() update : UpdatePaymentMethodDto) {
    return await this.transactionService.updatePaymentMethod(+id, update);
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Get('list')
  async findAll() {
    return await this.transactionService.findAll();
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(2,1)
  @Get('listuser')
  async findOne() {
    return await this.transactionService.findOneTransaction();
  }

  @UseGuards(JwtAuthGuard,RoleGuardGuard)
  @Roles(1)
  @Patch('list/:id')
  update(@Param('id') id: string) {
    return this.transactionService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
