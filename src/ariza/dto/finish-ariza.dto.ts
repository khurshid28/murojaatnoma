import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class FinishArizaDto {

  @IsNotEmpty()
  @IsString()
  response_type: string;

  @IsString()
  response: string;


}
