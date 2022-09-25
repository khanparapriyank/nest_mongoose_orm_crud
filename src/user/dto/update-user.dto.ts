import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends BaseUserDto {
  password?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}
