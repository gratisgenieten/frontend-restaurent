import service from "@/helper/axios";
import { CategoryPayload } from "@/types/all.type";

interface StatusPayload {
  entity_type: string;
  code: string;
  label: string;
  color_hex: string;
  sort_order: number;
}

interface StatusUpdatePayload extends StatusPayload {
  id: number;
  created_at?: string;
  updated_at?: string;
}

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

export async function getCategoriesTree(): Promise<any> {
  try {
    const response = await service.get('categories/tree');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch category");
  }
}

// Inside useAdmin.ts
export async function createCategoriesTree(payload: CategoryPayload): Promise<any> {
  try {
    const response = await service.post('/categories', payload);
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Throw full data for zod handler
    if (status === 422 && data?.errors) {
      throw new Error(JSON.stringify(data)); // <-- send full JSON string
    }

    throw new Error(error.response?.data?.message || 'Failed to create category');
  }
}


export async function createStatus(payload: any): Promise<any> {
  try {
    const response = await service.post(`/statuses`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}


export async function updateStatusById(id: number, payload: any): Promise<any> {
  try {
    const response = await service.put(`/statuses/${id}`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
}

export async function deleteStatusById(id: number): Promise<any> {
  try {
    const response = await service.delete(`/statuses/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || `Failed to delete status with ID: ${id}`);
  }
}

export async function getStatusesByEntityType(entityType: string): Promise<any[]> {
  try {
    const response = await service.get(`/statuses/entity/${entityType}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || `Failed to fetch statuses for ${entityType}`);
  }
}

