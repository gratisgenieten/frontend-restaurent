import service from "@/helper/axios";
import { LoginPayload, LoginResponse, SignupAdminPayload, SignupAdminResponse, SignUpData } from "@/types/auth.types";


export async function loginAdmin({ email, password }: LoginPayload): Promise<LoginResponse> {
  return service
    .post("/auth/login", { email, password })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    });
}

export async function signUpAdmin(data: any ,whichUserSignup:any): Promise<any> {
  try {
    const response = await service.post(`auth/${whichUserSignup}/register`, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      kvk_number: data.kvk_number
    });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function signUpPartner(data: any): Promise<any> {
  
  try {
   const response = await service.post(`register/partner`, {
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone,
      address: data.address,
      city: data.city,
      postal_code: data.postal_code,
      payout_iban: data.payout_iban,
      category_id: data.category_id,
      status_id: data.status_id,
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to create user";
    throw new Error(errorMessage);
  }
}
