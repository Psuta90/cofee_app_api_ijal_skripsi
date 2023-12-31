import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilsService } from '@app/utils';
import { join } from 'path';
import * as fs from 'fs-extra';
import { Express } from 'express';

@Injectable()
export class UserService {
  constructor(
    private utilService : UtilsService
  ){}

  async findAll() {
    try {
      const getAllUser = await this.utilService.db.user.findMany({where : {role_id : 2}})    
      
      if (!getAllUser) {
        return this.utilService.response.error({
          data : getAllUser,
          message : "tidak ada data"
        })
      }

      return await this.utilService.response.success({
        data : getAllUser,
        message : "berhasil"
      })


    } catch (error) {
      console.log(error);
      return this.utilService.response.error({
        data : error,
        message : "telah terjadi error"
      })
      
    }
  }

  async findUserTransaction() {
    try {
      const user_id = this.utilService.request.user.user_id
      const listTransaction = await this.utilService.db.user_Transaction.findMany({
        where : {
          user_id
        }
      })

      if (listTransaction.length > 0){
        return this.utilService.response.success({
          data : listTransaction,
          message : "berhasil"
        })
      }else{
        return this.utilService.response.error({
          code : 400,
          data : listTransaction,
          message : "data tidak di temukan"
        })
      }
    } catch (error) {
      console.log(error);
      return this.utilService.response.error({
        data : error,
        message : "data tidak di temukan"
      }) 
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.utilService.db.user.delete({
        where : {
          id
        }
      })

      if (deletedUser){
        return this.utilService.response.success({
          code : 200,
          data : deletedUser.id
        })
      }

    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code : 400, data : error, message: "telah terjadi error"})
      
    }
  }

  async confirmTransaction(id :number, file : Express.Multer.File) {
    
    const rootdirectory = `${process.cwd()}/public`
    const folderFile = 'payment_user_image'
    const nameFile = `${this.utilService.toolsString.generateRandomString(10)}.${file.mimetype.split('/')[1]}`
    const filepath = join(rootdirectory,folderFile,nameFile)

    try {

      await fs.ensureDir(join(rootdirectory,folderFile))
      await fs.writeFile(filepath,file.buffer);

      const updateTransaction = await this.utilService.db.user_Transaction.update({
        where : {id,user_id : this.utilService.request.user.user_id},
        data : {
          confirm_payment_image : join(folderFile,nameFile)
        }
      })

      if (updateTransaction.id){
        return await this.utilService.response.success({
          data : updateTransaction,
          message : "terimakasih sudah konfirmasi pembayaran silahkan tunggu untuk pembayaranya valid atau tidak"
        })
      }

      
    } catch (error) {
      console.log(error);
      return await this.utilService.response.error({
        code : 400,
        data : error,
        message : "gagal memasukan pembayaran"
      })
      
    }
  }
}
