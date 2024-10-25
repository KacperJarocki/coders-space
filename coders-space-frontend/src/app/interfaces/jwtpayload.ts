export interface Jwtpayload {
  id: number;
  role: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
