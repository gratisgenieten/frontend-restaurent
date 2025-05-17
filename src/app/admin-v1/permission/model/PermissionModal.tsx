'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Input from '@/shared/Input';

export interface PermissionData {
  permission_id?: number;
  code: string;
  label: string;
}

interface PermissionModalProps {
  initialData?: PermissionData;
  onClose: () => void;
  onSave: (data: PermissionData) => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<PermissionData>(
    initialData || {
      code: '',
      label: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <Input
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Permission Code (e.g., deals.create)"
          required
        />
        <Input
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder="Permission Label (e.g., Create Deals)"
          required
        />
      </div>
      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>Cancel</ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default PermissionModal;
