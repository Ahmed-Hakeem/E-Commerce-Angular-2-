import { Role } from './Role';

export interface User {
  Username: string;
  Password: string;
  Role: Role;
}
export interface unAuthorizedUser {
  Username: string;
  Password: string;
}

export type NullableUser = User | null;
