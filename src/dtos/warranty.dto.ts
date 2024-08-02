import { CustomerDto } from "./customer/customer.dto";
import { ProductDto } from "./product.dto";

export class WarrantyDto {
    id?: string
    customer: CustomerDto
    product: ProductDto
    description: string
    createdAt?: Date
    updatedAt?: Date
}