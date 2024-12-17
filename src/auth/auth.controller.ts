import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body) {
    let { login, password } = body;
    if (
      login == process.env.ADMIN_LOGIN &&
      password == process.env.ADMIN_PASSWORD
    ) {
      let token = await this.jwtService.signAsync({
        ...body,
        date: new Date(),
      });
      return {
        token,
        message: 'Login successfully',
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
