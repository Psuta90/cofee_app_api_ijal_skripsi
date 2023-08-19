import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator"
import { PaymentMethodDto } from "./payment-method.dto";

export class UpdatePaymentMethodDto extends PartialType(PaymentMethodDto) {
    name_bank?: string;
    no_rekening?: bigint;
}
