import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaymentMethodDto } from './dto/payment-method.dto';
import { UtilsService } from '@app/utils';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { error } from 'console';

@Injectable()
export class TransactionService {

  constructor(private utilService : UtilsService){}

  async findOneTransaction() {
    try {
      const getTransaction = await this.utilService.db.user_Transaction.findMany({
        where : {
          user_id : this.utilService.request.user.user_id
        },
        include : {
          User :true,
          product : true,
          payment_method : true
        }
      })

      

      if (getTransaction.length > 0){
        const datares = getTransaction.map((values) => {
          const data = {
            ...values,
            payment_method: {
              ...values.payment_method,
              no_rekening: parseInt(values.payment_method.no_rekening.toString()),
            }
           }

           return data
        })

        return await this.utilService.response.success({
          data : datares,
          message : "berhasil mendapatkan data"
        })
      }else{
        return await this.utilService.response.success({
          data : [],
          message : "data tidak di temukan"
        })
      }


    } catch (error) {
      return this.utilService.response.error({
        data : error,
        message : "telah tejadi error"
      })
    }
  }

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      
      const user_id = this.utilService.request.user.user_id

      const checkProduct  = await this.utilService.db.product.findUnique({
        where : {
          id : createTransactionDto.product_id
        }
      })

      const checkPaymentMethod = await this.utilService.db.payment_Method.findUnique({
        where : {
          id : createTransactionDto.payment_method
        }
      })
      
      if(checkPaymentMethod.id){
        
        if (checkProduct){
          
          const stockProduct = checkProduct.stock - createTransactionDto.stock

          if (stockProduct > 0){
            
            const updateStockProduct = await this.utilService.db.product.update({
              where : {
                id : createTransactionDto.product_id
              },
              data : {
                stock : stockProduct
              }
            })

            if(updateStockProduct) {
              
              const insertPayment = await this.utilService.db.user_Transaction.create({
                data : {
                  product_id : createTransactionDto.product_id,
                  stock : createTransactionDto.stock,
                  payment_method_id : createTransactionDto.payment_method,
                  user_id,
                  status : "PENDING",
                  final_amount : createTransactionDto.final_amount                      
                }
              })

              if(insertPayment){
                return await this.utilService.response.success({code :200, data : {
                  product_name : checkProduct.name,
                  image : checkProduct.image,
                  total_amount : createTransactionDto.final_amount,
                  nama_rekening : checkPaymentMethod.name_bank,
                  no_rekening : parseInt(checkPaymentMethod.no_rekening.toString())
                }, message : "berhasil melakukan pemesanan"})

              }else{
                return await this.utilService.response.error({
                  code : 400,
                  message : "terjadi masalah pada server saat pembelian"
                })
              }


            }else {
              return await this.utilService.response.error({
                code : 400,
                message : "terjadi masalah pada server"
              })
            }
            
            

          }else{
            return await this.utilService.response.error({
              code : 400,
              message : "stock habis atau tidak cukup silahkan pilih stock sesuai stock yang available"
            })
          }

        }else {
          return await this.utilService.response.error({
            code : 400,
            message : "product yang anda pilih sudah tidak tesedia"
          })
        }
  
      }else{
        return await this.utilService.response.error({code : 400, message : "silahkan pilih payment method yang sesuai"})
      }

      
    } catch (error) {
      console.log(error);
      
    }
  }

  async addPaymentMethod(paymentMethodDto: PaymentMethodDto) {
    try {
      const insertPaymentMethod = await this.utilService.db.payment_Method.create({
        data : {
          name_bank : paymentMethodDto.name_bank,
          no_rekening : paymentMethodDto.no_rekening
        }
      })

      return this.utilService.response.success({data : insertPaymentMethod.id , message : "berhasil insert payment method"})


    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400, data : error, message : "gaga insert payment method"})
      
    }
  }

  async findAllPaymentMethod() {
    try {
      const data = await this.utilService.db.payment_Method.findMany()
      

      if(data){
        const response = data.map((values) => {
          let data = {
            ...values,
            no_rekening : parseInt(values.no_rekening.toString())
          }

          return data
        })
        
        return await this.utilService.response.success({data: response, message : "berhasil mendapatkan data"})
      }else {
        return this.utilService.response.error({code : 400 , data, message : "data tidak ditemukan"})
      }

    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400, data : error , message : "terjadi error"})
      
    }
  }

  async deletePaymentMethod(id : number){
    try {
      const deletePaymentMethod = await this.utilService.db.payment_Method.delete({
        where : {id}
      })

      if (deletePaymentMethod) {
        return this.utilService.response.success({data : deletePaymentMethod.id, message : "berhasil menghapus payment method"})
      }else{
        return this.utilService.response.error({code : 400 , data : deletePaymentMethod , message : "gagal delete payment method"})
      }
    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400 , data : error, message : "gagal error"})
      
    }
  }

  async updatePaymentMethod(id : number, update : UpdatePaymentMethodDto){
    try {

      const updatePaymentMethod = await this.utilService.db.payment_Method.update({
        where : {id},
        data : {
          name_bank : update.name_bank,
          no_rekening : update.no_rekening
        }
      })

      if (updatePaymentMethod) {
        return this.utilService.response.success({data : updatePaymentMethod.id, message : "berhasil update payment method"})
      }else{
        return this.utilService.response.error({code : 400 , data : updatePaymentMethod , message : "gagal update payment method"})
      }
    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400 , data : error, message : "gagal error"})
      
    }
  }

  async findAll() {
    try {
      const getAllTransaction = await this.utilService.db.user_Transaction.findMany({
        include : {
          product : {
            select :{
              name : true
            }
          },
          payment_method : {
            select : {
              name_bank : true,
              no_rekening : true
            }
          }
        }
      })

      const datares = getAllTransaction.map((values) => {
         const data = {
          ...values,
          payment_method: {
            ...values.payment_method,
            no_rekening: parseInt(values.payment_method.no_rekening.toString()),
          }
         }
         return data
      })

      return await this.utilService.response.success({
        code : 200,
        data : datares,
        message : "berhasil mendapatkan semua data transactions"
      })
      
    } catch (error) {
      console.log(error);
      
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(id: number) {
    try {
      const updateUserTransaction = await this.utilService.db.user_Transaction.update({
        where : {id},
        data : {
          status : "PROCESSED"
        }
      })

      return await this.utilService.response.success({data:updateUserTransaction, message : "berhasil update data"})
      
    } catch (error) {
      return await this.utilService.response.error({code : 400, data : error, message : "terjadi error update transactions"})
    }
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
