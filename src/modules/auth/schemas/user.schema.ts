import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@lib/types/user.types';
import { Exclude } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @ApiProperty({
    description: 'user ID',
    type: Number,
    example: 2,
  })
  @Prop()
  id: number;

  @ApiProperty({
    description: 'If user is activated',
    type: Boolean,
    example: false,
  })
  @Prop()
  activated: boolean;

  @ApiProperty({
    description: 'User email',
    type: String,
    example: 'user@example.com',
  })
  @Prop()
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'fullname',
    type: String,
    example: 'John Doe',
  })
  @Prop()
  fullname: string;

  @ApiProperty({
    description: 'User role',
    enumName: 'Roles',
    enum: Roles,
    example: Roles.Admin,
  })
  @Prop({ nullable: true })
  role: string;

  @ApiProperty({
    description: 'country code',
    type: String,
    example: 'LK',
  })
  @Prop({ nullable: true })
  country: string;

  @ApiProperty({
    description: 'password last updated',
    type: Date,
  })
  @Prop({ nullable: true, default: null })
  passwordUpdatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
