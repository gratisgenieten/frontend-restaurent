'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Input from '@/shared/Input';

export interface ReferralData {
  referral_id?: number;
  referrer_user_id: number;
  referred_user_id: number;
  bonus_awarded: boolean;
  bonus_transaction_id: number | null;
  created_at: string;
}

interface ReferralModalProps {
  initialData?: ReferralData;
  onClose: () => void;
  onSave: (data: ReferralData) => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<ReferralData>(
    initialData || {
      referrer_user_id: 0,
      referred_user_id: 0,
      bonus_awarded: false,
      bonus_transaction_id: null,
      created_at: new Date().toISOString(),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : name === 'referrer_user_id' || name === 'referred_user_id' || name === 'bonus_transaction_id'
          ? parseInt(value)
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
          name="referrer_user_id"
          value={formData.referrer_user_id.toString()}
          onChange={handleChange}
          placeholder="Referrer User ID"
          required
        />
        <Input
          name="referred_user_id"
          value={formData.referred_user_id.toString()}
          onChange={handleChange}
          placeholder="Referred User ID"
          required
        />
        <Input
          name="bonus_transaction_id"
          value={formData.bonus_transaction_id?.toString() || ''}
          onChange={handleChange}
          placeholder="Transaction ID (optional)"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bonus_awarded"
            checked={formData.bonus_awarded}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Bonus Awarded
        </label>
        <Input
          name="created_at"
          value={formData.created_at}
          onChange={handleChange}
          type="datetime-local"
          placeholder="Created At"
        />
      </div>

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>Cancel</ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default ReferralModal;
