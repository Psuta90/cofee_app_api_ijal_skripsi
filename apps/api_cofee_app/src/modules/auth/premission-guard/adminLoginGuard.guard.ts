import { UtilsService } from '@app/utils';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AdminLoginGuard implements CanActivate {
  constructor (private utilService : UtilsService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let body = request.body

    let havePremission :boolean;
    
    return this.utilService.db.user.findUnique({
      where :{email : body.email}
    }).then((data) => {
      if (data.role_id == 1){
        request.body.role_id = data.role_id
        return havePremission = true
      }else{
        request.body.role = data.role_id
        return havePremission = false
      }
      
    })
  }
}
