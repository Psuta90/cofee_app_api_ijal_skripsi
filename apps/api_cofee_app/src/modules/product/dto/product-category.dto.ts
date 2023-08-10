import { IsNotEmpty } from "class-validator";

export class ProductCategory {
    @IsNotEmpty()
    name :string
}
