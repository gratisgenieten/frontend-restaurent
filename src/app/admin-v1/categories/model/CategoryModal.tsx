'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

export interface CategoryData {
  category_id?: number;
  parent_id: number | null;
  name: string;
  slug: string;
  category_type: string;
  level: number;
}

interface CategoryModalProps {
  onClose: () => void;
  onSave: (data: CategoryData) => void;
  initialData?: CategoryData;
  allCategories: CategoryData[];
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  onClose,
  onSave,
  initialData,
  allCategories,
}) => {
  const [formData, setFormData] = useState<CategoryData>(
    initialData || {
      parent_id: null,
      name: '',
      slug: '',
      category_type: '',
      level: 0,
    }
  );

  // useEffect(() => {
  //   if (formData.parent_id) {
  //     const parent = allCategories.find(c => c.category_id === formData.parent_id);
  //     if (parent) {
  //       setFormData(prev => ({ ...prev, level: parent.level + 1 }));
  //     }
  //   } else {
  //     setFormData(prev => ({ ...prev, level: 0 }));
  //   }
  // }, [formData.parent_id]);
  useEffect(() => {
    if (formData.parent_id) {
      const parent = allCategories.find(c => c.category_id === formData.parent_id);
      if (parent) {
        setFormData(prev => ({ ...prev, level: parent.level + 1 }));
      }
    } else {
      setFormData(prev => ({ ...prev, level: 0 }));
    }
  }, [formData.parent_id, allCategories]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'parent_id' ? parseInt(value) || null : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.slug.trim() || !formData.category_type.trim()) return;
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />
        <Input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="slug-value"
          required
        />
        <Input
          name="category_type"
          value={formData.category_type}
          onChange={handleChange}
          placeholder="Type (e.g. city, kitchen)"
          required
        />
        <select
          name="parent_id"
          value={formData.parent_id ?? ''}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        >
          <option value="">No Parent (root)</option>
          {allCategories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name} ({cat.category_type})
            </option>
          ))}
        </select>
        <Input
          name="level"
          type="number"
          value={formData.level.toString()}
          readOnly
        />
      </div>
      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default CategoryModal;
