import service from "@/helper/axios";

export async function getOptions(options = {}): Promise<any> {
  try {
    const response = await service.get('options', options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch options");
  }
}

export async function createOption(
  payload: { option_group_id: any; value: string },
  options = {}
): Promise<any> {
  try {
    const response = await service.post('options', payload, options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create option");
  }
}

export async function updateOptionById(
  id: number,
  payload: { option_group_id: any; value: string },
  options = {}
): Promise<any> {
  try {
    const response = await service.put(`options/${id}`, payload, options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || `Failed to update option with ID ${id}`);
  }
}

export async function getOptionById(id: number, options = {}): Promise<any> {
  try {
    const response = await service.get(`options/${id}`, options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || `Failed to fetch option with ID ${id}`);
  }
}

export async function deleteOptionById(id: number, options = {}): Promise<any> {
  try {
    const response = await service.delete(`options/${id}`, options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || `Failed to delete option with ID ${id}`);
  }
}


export async function getOptionGroups(options = {}): Promise<any> {
  try {
    const response = await service.get('option-groups', options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch option groups");
  }
}

export async function createOptionGroup(
  payload: { name: string },
  options = {}
): Promise<any> {
  try {
    const response = await service.post('option-groups', payload, options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create option group");
  }
}

export async function updateOptionGroupById(
  id: number,
  payload: { name: string },
  options = {}
): Promise<any> {
  try {
    const response = await service.put(`option-groups/${id}`, payload, options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || `Failed to update option group with ID ${id}`);
  }
}

export async function deleteOptionGroupById(id: number, options = {}): Promise<any> {
  try {
    const response = await service.delete(`option-groups/${id}`, options);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || `Failed to delete option group with ID ${id}`);
  }
}
