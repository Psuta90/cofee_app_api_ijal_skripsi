import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Request } from './classess/request';
import { Response } from './classess/response';
import { Password } from './classess/password';
import { UtilString } from './classess/string';

@Injectable()
export class UtilsService {
    constructor(
        private _db: PrismaService,
        private req: Request,
        private res: Response,
        private passwd: Password,
        private _str: UtilString
    ){}
    
    get db() {
        return this._db;
    }

    get toolsPassword(){
        return this.passwd
    }

    get toolsString(){
        return this._str
    }

    get request(): Request {
        return this.req;
      }
    
    get response(): Response {
    return this.res;
    }
}
