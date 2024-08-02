import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types, Document, Schema as SchemaMongo } from 'mongoose'
import { Product } from './product.entity';
import { Customer } from './customer.entity';

export type WarrantyDocument = Warranty & Document

@Schema({ collection: 'warranties', timestamps: true })
export class Warranty {
    id: string

    @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Customer', required: true })
    customer: Customer;

    @Prop({ type: SchemaMongo.Types.ObjectId, ref: 'Product', required: true })
    product: Product;

    @Prop({ type: SchemaTypes.String, required: true })
    description: string

    createdAt: Date
    updatedAt: Date
}

export const WarrantySchema = SchemaFactory.createForClass(Warranty)
WarrantySchema.set('toJSON', { transform: function(doc, data, options) {
    data.id = data._id
    
    delete data.__v
    delete data._id
    
    return data
} })