import { BaseUserDto } from './base-user.dto';

export class LoginUserDto extends BaseUserDto {
  password?: string;
  email?: string;
}
