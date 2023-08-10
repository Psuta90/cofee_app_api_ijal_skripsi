import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UtilsService } from '@app/utils';
import { JwtService } from '@nestjs/jwt';
import { LoginAuth } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private utilService:UtilsService,
    private jwtService:JwtService
  ){}

  async register(createAuthDto: CreateAuthDto) {
    try {
      
      const register_user = await this.utilService.db.user.create(
        {
          data :{
            name : createAuthDto.name,
            email :createAuthDto.email,
            password :  await this.utilService.toolsPassword.generateHash(createAuthDto.password),
            address : createAuthDto.address,
            role_id : 2
          }
        }
      )

      if (register_user){
        const token = this.jwtService.sign({
          user_id : register_user.id,
          email : register_user.email
        })

        return await this.utilService.response.success(
          { code : 200, 
            data : {
              token,
              emaol : createAuthDto.email, 
            },
            message:"Berhasil registrasi",
            
          }
        );  
      }
    } catch (error) {
      console.log(error);
      return this.utilService.response.error({code: 400, message:"Gagal Registrasi" })
    }
    
  }

  async login(loginAuthDto : LoginAuth) {

    try {
      const getUser = await this.utilService.db.user.findUnique({
        where :{
          email : loginAuthDto.email
        }
      })
  
      if (getUser){
        
        const checkUserPass = await this.utilService.toolsPassword.matchHash(loginAuthDto.password,getUser.password)
        
        if (checkUserPass){
          
          const token = this.jwtService.sign({
            user_id : getUser.id,
            email : getUser.email,
            role_id : getUser.role_id
          })
  
          return this.utilService.response.success({
            code : 200,
            data : {
              token,  
            },
            message : "berhasil login"
          })

        }else{
          return this.utilService.response.error({code : 401, message : "silahkan masukan username atau password yang sudah terdaftar"})
        }
      }else{
        return this.utilService.response.error({code : 401, message : "silahkan masukan username atau password yang sudah terdaftar"})
      }

    } catch (error) {
      return this.utilService.response.error({code : 400 , data : error, message : "gagal login"})
    }
  
  }

  async loginadmin(loginAuthDto : LoginAuth) {

    try {
      const getUser = await this.utilService.db.user.findUnique({
        where :{
          email : loginAuthDto.email
        }
      })
  
      if (getUser){
        
        const checkUserPass = await this.utilService.toolsPassword.matchHash(loginAuthDto.password,getUser.password)
        
        if (checkUserPass){
          
          const token = this.jwtService.sign({
            user_id : getUser.id,
            email : getUser.email,
            role_id : getUser.role_id
          })
  
          return this.utilService.response.success({
            code : 200,
            data : {
              token,  
            },
            message : "berhasil login"
          })

        }else{
          return this.utilService.response.error({code : 401, message : "silahkan masukan username atau password yang sudah terdaftar"})
        }
      }else{
        return this.utilService.response.error({code : 401, message : "silahkan masukan username atau password yang sudah terdaftar"})
      }

    } catch (error) {
      return this.utilService.response.error({code : 400 , data : error, message : "gagal login"})
    }
  
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
