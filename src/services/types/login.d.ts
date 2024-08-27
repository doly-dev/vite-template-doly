import { ResponseData } from './common';

export type LoginDataType = {
  username: string;
  mobile: string;
  token: string;
};

declare global {
  namespace API {
    type Login = ResponseData<{
      data: LoginDataType;
    }>;
  }
}

export {};
