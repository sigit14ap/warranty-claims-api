import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types, Document } from 'mongoose'

export type CustomerDocument = Customer & Document

@Schema({ collection: 'customers', timestamps: true })
export class Customer {
    id: string

    @Prop({ type: SchemaTypes.String, required: true, unique: true })
    email: string

    @Prop({ type: SchemaTypes.String, required: true })
    name: string

    @Prop({ type: SchemaTypes.String, required: true })
    password: string
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
CustomerSchema.set('toJSON', { transform: function(doc, data, options) {
    data.id = data._id

    delete data.password
    delete data.__v
    delete data._id
    
    return data
} })