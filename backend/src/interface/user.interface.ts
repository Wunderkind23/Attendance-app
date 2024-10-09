export interface UserAttributesI {
  name: string;
  email: string;
  password: string;
  id: number;
  role?: Role;
  isVerified: boolean;
  clockInTime:Date,
  clockOutTime:Date,
}

export interface UserProfileAttributeI {
  address: string;
  phone: number;
  id: number;
  userId: number;
}

export enum Role {
  admin = 'admin',
  user = 'user',
}
