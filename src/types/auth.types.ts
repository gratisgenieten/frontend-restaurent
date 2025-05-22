export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface SignupPayload {
  name: string;
  email: string;
  phone_no: string;
  password: string;
  passwordConfirm: string;
  age: number;
  gender: string;
  medical_conditions: string;
  address: string;
  pincode: string;
  state_id: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone_no: string;
  };
  token?: string;
}

export interface SignupAdminPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  kvk_number: string;
}

export interface SignupAdminResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    kvk_number: string;
  };
  token?: string;
}
