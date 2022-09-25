import { UserDocument } from '../user/schemas/user.schema';
import { ResponseDto } from './dto/response.dto';

export class UtilityService {
  constructor() {}

  async responseGenerator(msg?: string, code?: number, isError?: boolean, userDocument?: UserDocument[]): Promise<ResponseDto> {
    var responseJson = {};
    responseJson['error_status'] = (isError) ? true : false;
    responseJson['code'] = (code) ? code : (isError) ? 500 : 200;
    responseJson['message'] = (msg) ? msg : (isError) ? "Error fulfilling the request." : "The request fulfilled successfully.";
    if (userDocument) responseJson['data'] = userDocument;
    return responseJson;
  }

}
