import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  userid: number;

  @Prop()
  username?: string;

  @Prop()
  password?: string;

  @Prop()
  email?: string;

  @Prop()
  firstname?: string;

  @Prop()
  lastname?: string;

  @Prop()
  isLogin?: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
