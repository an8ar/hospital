import { AuthUser } from '~/features/auth';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  data: {
    user: AuthUser
  }
  status: number;
}

export interface CSRFResponse {
  _csrf: string
}
