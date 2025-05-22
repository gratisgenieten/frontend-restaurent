import service from "@/helper/axios";
import { LoginPayload, LoginResponse, SignupAdminPayload, SignupAdminResponse } from "@/types/auth.types";


export function loginAdmin({ email, password }: LoginPayload): Promise<LoginResponse> {
  return service
    .post("/login/admin", { email, password })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    });
}
