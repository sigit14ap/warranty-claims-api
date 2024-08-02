import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types, Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema({ collection: 'products', timestamps: true })
export class Product {
    id: string

    @Prop({ type: SchemaTypes.String, required: true })
    name: string

    @Prop({ type: SchemaTypes.String, required: true })
    description: string

    @Prop({ type: SchemaTypes.String, required: true })
    imageName: string

    createdAt: Date
    updatedAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)
ProductSchema.set('toJSON', { transform: function(doc, data, options) {
    data.id = data._id
    
    delete data.__v
    delete data._id
    
    return data
} })