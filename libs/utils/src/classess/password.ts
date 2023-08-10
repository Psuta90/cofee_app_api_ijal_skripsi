import * as bcrypt from 'bcrypt';

export class Password {

    async generateHash(password:string){
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash
    }

    async matchHash(password:string,hash:string){

        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;

    }



}