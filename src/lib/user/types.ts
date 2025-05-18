export interface UserType {
  id: number; 
  user: string; 
  password: string; 
  name: string; 
  active: boolean; 
  dateJoined: Date;
  lastLogin: Date | null;
  updatedAt: Date;
}

export interface Session {
  user: UserType;
  expires: Date;
}

export interface CreateUserType {
  user: string; 
  password: string; 
  name: string;
}

export interface SendEditUserType {
  user: string; 
  password: string | undefined; 
  name: string;
  active: boolean; 
}

export interface EditUserType {
  id: number;
  user: string; 
  password: string | undefined; 
  name: string;
  active: boolean; 
}