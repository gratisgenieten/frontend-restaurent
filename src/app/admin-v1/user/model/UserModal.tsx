'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

export interface UserData {
  user_id?: number;
  name: string;
  email: string;
  password_hash: string;
  phone: string;
  wallet_balance: number;
  referral_code: string;
  referred_by?: number | null;
  newsletter_opt_in: boolean;
  created_at?: string;
  updated_at?: string;
}

interface UserModalProps {
  onClose: () => void;
  onSave: (data: UserData) => void;
  initialData?: UserData;
}

const UserModal: React.FC<UserModalProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<UserData>(
    initialData || {
      name: '',
      email: '',
      password_hash: '',
      phone: '',
      wallet_balance: 0,
      referral_code: '',
      referred_by: null,
      newsletter_opt_in: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'wallet_balance'
          ? parseFloat(value)
          : name === 'referred_by'
          ? value === '' ? null : parseInt(value)
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
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
        <input
          name="password_hash"
          type="password"
          value={formData.password_hash}
          onChange={handleChange}
          placeholder="Password"
          required
          className="rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
        <input
          name="wallet_balance"
          type="number"
          value={formData.wallet_balance}
          onChange={handleChange}
          placeholder="Wallet Balance"
          className="rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
        <input
          name="referral_code"
          value={formData.referral_code}
          onChange={handleChange}
          placeholder="Referral Code"
          className="rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
        <input
          name="referred_by"
          type="number"
          value={formData.referred_by || ''}
          onChange={handleChange}
          placeholder="Referred By (User ID)"
          className="rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
        <label className="flex items-center gap-2 col-span-2">
          <input
            name="newsletter_opt_in"
            type="checkbox"
            checked={formData.newsletter_opt_in}
            onChange={handleChange}
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Subscribe to newsletter</span>
        </label>
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

export default UserModal;
