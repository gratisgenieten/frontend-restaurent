'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Input from '@/shared/Input';

export interface AffiliateClickData {
  click_id?: number;
  user_id: number;
  partner_id: number;
  click_time: string;
  external_session_id: string;
  converted: boolean;
  conversion_amount: number;
  points_earned: number;
  status: string;
  confirmed_at: string;
}

interface AffiliateClickModalProps {
  initialData?: AffiliateClickData;
  onClose: () => void;
  onSave: (data: AffiliateClickData) => void;
}

const AffiliateClickModal: React.FC<AffiliateClickModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<AffiliateClickData>(
    initialData || {
      user_id: 0,
      partner_id: 0,
      click_time: new Date().toISOString(),
      external_session_id: '',
      converted: false,
      conversion_amount: 0,
      points_earned: 0,
      status: 'pending',
      confirmed_at: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name.includes('amount') || name.includes('earned') || name.includes('_id') ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input name="user_id" value={formData.user_id.toString()} onChange={handleChange} placeholder="User ID" required />
        <Input name="partner_id" value={formData.partner_id.toString()} onChange={handleChange} placeholder="Partner ID" required />
        <Input name="external_session_id" value={formData.external_session_id} onChange={handleChange} placeholder="External Session ID" required />
        <Input name="conversion_amount" type="number" value={formData.conversion_amount.toString()} onChange={handleChange} placeholder="Conversion Amount" />
        <Input name="points_earned" type="number" value={formData.points_earned.toString()} onChange={handleChange} placeholder="Points Earned" />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          required
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <Input
          name="confirmed_at"
          value={formData.confirmed_at}
          onChange={handleChange}
          placeholder="Confirmed At (ISO)"
          type="datetime-local"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="converted"
            checked={formData.converted}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Converted
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>Cancel</ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default AffiliateClickModal;
