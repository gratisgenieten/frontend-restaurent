'use client';

import React, { useState } from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

export interface PartnerData {
  partner_id?: number;
  user_id: number;
  name: string;
  description: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  city: string;
  postal_code: string;
  payout_iban: string;
  category_id: number;
  status_id: number;
}

interface PartnerModalProps {
  onClose: () => void;
  onSave: (data: PartnerData) => void;
  initialData?: PartnerData;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<PartnerData>(
    initialData || {
      user_id: 0,
      name: '',
      description: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      address: '',
      city: '',
      postal_code: '',
      payout_iban: '',
      category_id: 0,
      status_id: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'user_id' || name === 'category_id' || name === 'status_id' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input name="user_id" type="number" value={formData.user_id} onChange={handleChange} placeholder="User ID" required />
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Partner Name" required />
        <Input name="contact_name" value={formData.contact_name} onChange={handleChange} placeholder="Contact Name" required />
        <Input name="contact_email" value={formData.contact_email} onChange={handleChange} placeholder="Contact Email" required />
        <Input name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="Contact Phone" required />
        <Input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <Input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        <Input name="postal_code" value={formData.postal_code} onChange={handleChange} placeholder="Postal Code" required />
        <Input name="payout_iban" value={formData.payout_iban} onChange={handleChange} placeholder="Payout IBAN" required />
        <Input name="category_id" type="number" value={formData.category_id} onChange={handleChange} placeholder="Category ID" required />
        <Input name="status_id" type="number" value={formData.status_id} onChange={handleChange} placeholder="Status ID" required />
      </div>

      <label className="block">
        <span className="text-neutral-700 dark:text-neutral-300">Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="mt-1 w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        ></textarea>
      </label>

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default PartnerModal;
