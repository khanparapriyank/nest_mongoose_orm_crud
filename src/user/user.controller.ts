import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') userid: number) {
    return await this.service.findOne(userid);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log({ createUserDto });
    return await this.service.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log({ loginUserDto });
    return await this.service.login(loginUserDto);
  }

  @Get('me/:id')
  async findMe(@Param('id') userid: number) {
    console.log({ userid });
    return await this.service.findMe(userid);
  }

  @Post('logout')
  async logout(@Body() loginUserDto: LoginUserDto) {
    console.log({ loginUserDto });
    return await this.service.logout(loginUserDto);
  }

  @Put(':id')
  async update(@Param('id') userid: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(userid, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') userid: number) {
    return await this.service.delete(userid);
  }
}
