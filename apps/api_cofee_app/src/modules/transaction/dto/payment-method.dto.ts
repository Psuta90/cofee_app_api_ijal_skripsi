import { IsNotEmpty } from "class-validator"

export class PaymentMethodDto {
    @IsNotEmpty()
    name_bank : string
    @IsNotEmpty()
    no_rekening : bigint
}
