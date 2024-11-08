import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateArizaDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsNumber()
  chat_id: string;


  @IsNotEmpty()
  @IsNumber()
  ijrochi_id: number;

  @IsNotEmpty()
  @IsString()
  desc: string;


  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(13)
  phone1: string;

  @IsNotEmpty()
  @IsString()
  @Length(13)
  phone2: string;

}
