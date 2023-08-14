export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
  tokenAuth: string;
  expiredToken: Date;
  message: string;
}
