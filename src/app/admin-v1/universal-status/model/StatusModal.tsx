'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

export interface StatusData {
  status_id?: number;
  entity_type: string;
  code: string;
  label: string;
  color_hex: string;
  sort_order: number;
}

interface StatusModalProps {
  onClose: () => void;
  onSave: (data: StatusData) => void;
  initialData?: StatusData;
}

const StatusModal: React.FC<StatusModalProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<StatusData>(
    initialData || {
      entity_type: '',
      code: '',
      label: '',
      color_hex: '#32caff',
      sort_order: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-100">
          Status Details
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="entity_type"
            value={formData.entity_type}
            onChange={handleChange}
            placeholder="Entity Type (e.g., deal)"
            required
            className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          />
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Code (e.g., active)"
            required
            className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          />
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Label (e.g., Active)"
            required
            className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          />
          <input
            type="color"
            name="color_hex"
            value={formData.color_hex}
            onChange={handleChange}
            className="w-full h-10"
          />
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order.toString()}
            onChange={handleChange}
            placeholder="Sort Order"
            required
            className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          />
        </div>
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

export default StatusModal;
