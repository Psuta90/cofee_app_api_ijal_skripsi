import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as jwtmodule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt_strategies';

const JWTM = [
  PassportModule.register({
    defaultStrategy : 'jwt',
    property : 'user',
    session : false,
  }),
  jwtmodule.register({
    secret : process.env.JWT_SECRET,
    signOptions : {
      expiresIn : process.env.JWT_EXP
    }
  })
  
  
]

@Global()
@Module({
  imports : [...JWTM],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService,JwtStrategy, ...JWTM],
})

export class AuthJwtModule {}
