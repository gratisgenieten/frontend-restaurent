import service from "@/helper/axios";

export async function getWalletBalance(): Promise<any> {
  
  try {
   const response = await service.get(`wallet/balance`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to get balance";
    throw new Error(errorMessage);
  }
}


export async function getTransactions(): Promise<any> {
  try {
   const response = await service.get(`wallet/transactions`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch transactions";
    throw new Error(errorMessage);
  }
}

export async function createDeposit({
  amount
}:{amount:any}): Promise<any> {
  try {
   const response = await service.post(`wallet/deposit`,{
    amount
   });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch transactions";
    throw new Error(errorMessage);
  }
}