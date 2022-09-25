import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from '../utils/dto/response.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UtilityService } from '../utils/utility.service';
import { StatusCodes } from 'http-status-codes'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    private readonly utilservice: UtilityService
  ) {}

  async findAll(): Promise<ResponseDto> {
    let users = await this.model.find().exec();
    if(!users && users.length == 0) {
      return await this.utilservice.responseGenerator("No Data Found.",StatusCodes.NOT_FOUND,false,users);  
    }
    return await this.utilservice.responseGenerator(undefined,undefined,false,users);
  }

  async findOne(userid: number): Promise<ResponseDto> {
    let user = await this.model.findOne({userid : userid}).exec()
    if(!user) {
      console.log(user);
      return await this.utilservice.responseGenerator("No Data Found.",StatusCodes.NOT_FOUND,false);  
    }
    return await this.utilservice.responseGenerator(undefined,undefined,false,[user]);
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseDto> {
    let user = await new this.model({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
    return await this.utilservice.responseGenerator(undefined,undefined,false,[user]);
  }

  async login(loginUserDto: LoginUserDto): Promise<ResponseDto> {
    let login_user = await this.model.findOne({email : loginUserDto.email, password : loginUserDto.password}).exec();
    if(!login_user) {
      return await this.utilservice.responseGenerator("No Data Found.",StatusCodes.NOT_FOUND,false);  
    }
    login_user.isLogin = true;
    let updatedUser = await this.model.findOneAndUpdate({email : loginUserDto.email}, login_user).exec()
    return await this.utilservice.responseGenerator(undefined,undefined,false,[updatedUser]);
  }

  async findMe(userid: number): Promise<ResponseDto> {
    let user = await this.model.findOne({userid : userid, isLogin : true}).exec()
    if(!user) {
      console.log(user);
      return await this.utilservice.responseGenerator("Invalid user Authentication.",StatusCodes.UNAUTHORIZED,false);  
    } 
    return await this.utilservice.responseGenerator(undefined,undefined,false,[user]);
  }

  async logout(loginUserDto: LoginUserDto): Promise<ResponseDto> {
    let logout_user = await this.model.findOne({email : loginUserDto.email, password : loginUserDto.password, isLogin : true}).exec();
    if(!logout_user) {
      return await this.utilservice.responseGenerator("No Data Found.",StatusCodes.NOT_FOUND,false);  
    }
    logout_user.isLogin = false;
    let updatedUser = await this.model.findOneAndUpdate({email : loginUserDto.email}, logout_user).exec()
    return await this.utilservice.responseGenerator(undefined,undefined,false,[updatedUser]);
  }

  async update(userid: number, updateUserDto: UpdateUserDto): Promise<ResponseDto> {
    let user = await this.model.findOneAndUpdate({userid : userid}, updateUserDto).exec();
    if(!user) {
      console.log(user);
      return await this.utilservice.responseGenerator("No Data Found.",StatusCodes.NOT_FOUND,false);  
    }
    return await this.utilservice.responseGenerator(undefined,undefined,false,[user]);
  }

  async delete(userid: number): Promise<ResponseDto> {
    let user = await this.model.findOneAndDelete({userid : userid}).exec();
    if(!user) {
      console.log(user);
      return await this.utilservice.responseGenerator("No Data Found.",StatusCodes.NOT_FOUND,false);  
    }
    return await this.utilservice.responseGenerator(undefined,undefined,false,[user]);
  }
}
