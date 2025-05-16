'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Input from '@/shared/Input';

export interface ReservationData {
  reservation_id?: number;
  deal_id: number;
  partner_id: number;
  user_id: number;
  persons: number;
  reservation_at: string;
  booked_on: string;
  wallet_spent: number;
  cash_paid: number;
  status_id: number;
  partner_payout: number;
  payout_status: string;
}

interface ReservationModalProps {
  initialData?: ReservationData;
  onClose: () => void;
  onSave: (data: ReservationData) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState<ReservationData>(
    initialData || {
      deal_id: 0,
      partner_id: 0,
      user_id: 0,
      persons: 2,
      reservation_at: '',
      booked_on: new Date().toISOString(),
      wallet_spent: 0,
      cash_paid: 0,
      status_id: 1,
      partner_payout: 0,
      payout_status: 'pending',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'persons' || name.includes('_id') || name.includes('payout') || name.includes('paid') || name.includes('spent')
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
        <Input name="deal_id" value={formData.deal_id.toString()} onChange={handleChange} placeholder="Deal ID" required />
        <Input name="partner_id" value={formData.partner_id.toString()} onChange={handleChange} placeholder="Partner ID" required />
        <Input name="user_id" value={formData.user_id.toString()} onChange={handleChange} placeholder="User ID" required />
        <Input name="persons" value={formData.persons.toString()} onChange={handleChange} placeholder="Persons" type="number" />
        <Input name="reservation_at" value={formData.reservation_at} onChange={handleChange} type="datetime-local" required />
        <Input name="booked_on" value={formData.booked_on} onChange={handleChange} type="datetime-local" />
        <Input name="wallet_spent" value={formData.wallet_spent.toString()} onChange={handleChange} placeholder="Wallet Spent" type="number" />
        <Input name="cash_paid" value={formData.cash_paid.toString()} onChange={handleChange} placeholder="Cash Paid" type="number" />
        <Input name="status_id" value={formData.status_id.toString()} onChange={handleChange} placeholder="Status ID" required />
        <Input name="partner_payout" value={formData.partner_payout.toString()} onChange={handleChange} placeholder="Partner Payout" type="number" />
        <Input name="payout_status" value={formData.payout_status} onChange={handleChange} placeholder="Payout Status" />
      </div>

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>Cancel</ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default ReservationModal;
