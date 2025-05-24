// Core Option Group Interface
export interface OptionGroup {
  id: number;
  name: string;
}

// Core Option Interface
export interface Option {
  id: number;
  option_group_id: number;
  value: string;
  created_at?: string;
  updated_at?: string;
  group?: OptionGroup | null;
}

// Form Data for Option (used in modals or form submissions)
export interface OptionData {
  option_id?: number;
  option_group_id: number;
  value: string;
}

// Form Data for Option Group (with embedded options list)
export interface OptionGroupData {
  option_group_id?: number;
  name: string;
  options: OptionData[];
}

export interface CategoryPayload {
  parent_id: number | null;
  name: string;
  slug: string;
  category_type: string;
  sort_order?: number;
}