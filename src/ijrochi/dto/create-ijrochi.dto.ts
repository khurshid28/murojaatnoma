import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateIjrochiDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsNumber()
    chat_id: string;


    @IsNotEmpty()
    @IsString()
    nomi: string;



}
