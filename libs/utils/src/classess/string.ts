import * as crypto from 'crypto';

export class UtilString {
    generateRandomString(length: number): string {
        const randomBytes = crypto.randomBytes(length);
        const randomStr = randomBytes.toString('hex');
    
        return randomStr;
      }
}