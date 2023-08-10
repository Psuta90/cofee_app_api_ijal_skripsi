import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuth {
    @IsEmail()
    email : string
    @IsNotEmpty()
    password : string
    role_id ? : string
}