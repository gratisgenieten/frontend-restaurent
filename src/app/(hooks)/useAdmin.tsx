import service from "../../helper/axios"; // Import the custom axios instance

interface SignUpData {
  name: string;
  email: string;
  phone_no: string;
  password: string;
  kvk_number: string;
}

// Function to handle sign-up requests
export async function signUp(data: SignUpData): Promise<any> {
  try {
    console.log("SignUp data:", data);
    const response = await service.post(`/signup`, {
      name: data.name,
      email: data.email,
      phone_no: data.phone_no,
      password: data.password,
      kvk_number: data.kvk_number
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to create user";
    throw new Error(errorMessage);
  }
}
