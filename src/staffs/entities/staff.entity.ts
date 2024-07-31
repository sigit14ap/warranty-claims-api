import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema({ collection: 'staffs' })
export class Staff {
    id: string;

    @Prop({ type: SchemaTypes.String, required: true, unique: true })
    email: string;

    @Prop({ type: SchemaTypes.String, required: true })
    name: string;

    @Prop({ type: SchemaTypes.String, required: true })
    password: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
StaffSchema.set('toJSON', { transform: function(doc, data, options) {
    data.id = data._id

    delete data.password
    delete data.__v
    delete data._id
    
    return data
} })