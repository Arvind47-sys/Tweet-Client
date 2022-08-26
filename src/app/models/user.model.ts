export interface Login {
  username: string;
  password: string;
}

export interface Register {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: Date;
  gender: string;
  username: string;
  contactNumber: number;
}

export interface User {
  username: string;
  token: string;
  name: string;
}

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  username: string;
  contactNumber: number;
}

export interface ForgotPassword {
  username: string;
  newPassword: string;
}

export interface ResetPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}
