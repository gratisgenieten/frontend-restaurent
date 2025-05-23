'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Input from '@/shared/Input';

interface DepositModalProps {
  onClose: () => void;
  onSave: (amount: number) => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ onClose, onSave }) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof amount === 'number' && amount > 0) {
      onSave(amount);
      setAmount('');
      setError(null);
    } else {
      setError('Please enter a valid amount greater than 0.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="number"
        name="amount"
        placeholder="Enter deposit amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">
          Deposit
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default DepositModal;
