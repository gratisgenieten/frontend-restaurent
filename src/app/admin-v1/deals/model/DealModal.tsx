'use client';

import React, { useState } from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

export interface DealData {
  deal_id?: number;
  partner_id: number;
  title: string;
  description: string;
  price_cash: number;
  partner_payout: number;
  max_reservations: number | null;
  reservations_made: number;
  valid_from: string;
  valid_to: string;
  status_id: number;
  created_at?: string;
  updated_at?: string;

}

interface DealModalProps {
  initialData?: DealData;
  onClose: () => void;
  onSave: (data: DealData) => void;
}

const DealModal: React.FC<DealModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<DealData>(
    initialData || {
      partner_id: 0,
      title: '',
      description: '',
      price_cash: 0,
      partner_payout: 0,
      max_reservations: null,
      reservations_made: 0,
      valid_from: '',
      valid_to: '',
      status_id: 1,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price_cash' ||
        name === 'partner_payout' ||
        name === 'max_reservations' ||
        name === 'partner_id' ||
        name === 'status_id'
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Deal Title"
          required
        />
        <Input
          name="partner_id"
          value={formData.partner_id.toString()}
          onChange={handleChange}
          placeholder="Partner ID"
          required
        />
        <Input
          name="price_cash"
          type="number"
          value={formData.price_cash.toString()}
          onChange={handleChange}
          placeholder="Customer Price"
          required
        />
        <Input
          name="partner_payout"
          type="number"
          value={formData.partner_payout.toString()}
          onChange={handleChange}
          placeholder="Partner Payout"
          required
        />
        <Input
          name="max_reservations"
          type="number"
          value={formData.max_reservations?.toString() || ''}
          onChange={handleChange}
          placeholder="Max Reservations"
        />
        <Input
          name="reservations_made"
          type="number"
          value={formData.reservations_made.toString()}
          readOnly
        />
        <Input
          name="valid_from"
          type="date"
          value={formData.valid_from}
          onChange={handleChange}
        />
        <Input
          name="valid_to"
          type="date"
          value={formData.valid_to}
          onChange={handleChange}
        />
        <Input
          name="status_id"
          type="number"
          value={formData.status_id.toString()}
          onChange={handleChange}
          placeholder="Status ID"
        />
      </div>

      <div className="space-y-3">
        <label className="block mb-2 font-medium text-neutral-700 dark:text-neutral-100">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Deal Description"
          rows={4}
          className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
      </div>

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save Deal</ButtonPrimary>
      </div>
    </form>
  );
};

export default DealModal;
