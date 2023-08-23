import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilsService } from '@app/utils';

@Injectable()
export class UserService {
  constructor(
    private utilService : UtilsService
  ){}
  
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

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

  async confirmTransaction() {
    
  }
}
