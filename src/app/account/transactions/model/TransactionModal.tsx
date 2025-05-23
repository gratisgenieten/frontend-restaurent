'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Input from '@/shared/Input';

export interface TransactionData {
  transaction_id?: number;
  user_id: number;
  type: string;
  amount: number;
  related_reservation_id: number | null;
  related_partner_id: number | null;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TransactionModalProps {
  initialData?: TransactionData;
  onClose: () => void;
  onSave: (data: TransactionData) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<TransactionData>(
    initialData || {
      user_id: 0,
      type: '',
      amount: 0,
      related_reservation_id: null,
      related_partner_id: null,
      description: '',
      status: 'confirmed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'amount' || name.includes('_id')
          ? value === '' ? null : parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, updated_at: new Date().toISOString() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input name="user_id" value={formData?.user_id?.toString()} onChange={handleChange} placeholder="User ID" required />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          required
        >
          <option value="">Select Type</option>
          <option value="affiliate_earn">Affiliate Earn</option>
          <option value="wallet_spend">Wallet Spend</option>
          <option value="reservation_cash_part">Reservation Cash Part</option>
          <option value="referral_bonus">Referral Bonus</option>
          <option value="adjustment">Adjustment</option>
        </select>
        <Input name="amount" value={formData?.amount?.toString()} onChange={handleChange} placeholder="Amount" type="number" required />
        <Input
          name="related_reservation_id"
          value={formData.related_reservation_id ?? ''}
          onChange={handleChange}
          placeholder="Reservation ID (optional)"
        />
        <Input
          name="related_partner_id"
          value={formData.related_partner_id ?? ''}
          onChange={handleChange}
          placeholder="Partner ID (optional)"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          required
        >
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        rows={3}
      />

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>Cancel</ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default TransactionModal;
