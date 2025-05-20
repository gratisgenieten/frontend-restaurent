'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

export interface Option {
  option_id: number;
  option_group_id: number;
  value: string;
}

export interface OptionGroupData {
  option_group_id?: number;
  name: string;
  options: Option[];
}

interface OptionGroupModalProps {
  initialData?: OptionGroupData;
  onClose: () => void;
  onSave: (data: OptionGroupData) => void;
}

const OptionGroupModal: React.FC<OptionGroupModalProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const [groupName, setGroupName] = useState(initialData?.name || '');
  const [options, setOptions] = useState<string[]>(
    initialData?.options?.map((opt) => opt.value) || ['']
  );

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedOptions: Option[] = options.map((value, index) => ({
      option_id: initialData?.options?.[index]?.option_id || Math.floor(Math.random() * 100000),
      option_group_id: initialData?.option_group_id || Math.floor(Math.random() * 100000),
      value,
    }));

    const newGroup: OptionGroupData = {
      option_group_id: initialData?.option_group_id,
      name: groupName,
      options: formattedOptions,
    };

    onSave(newGroup);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium text-neutral-700 dark:text-neutral-100">
          Group Name
        </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="e.g. Parking"
          required
          className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
      </div>

      <div className="space-y-3">
        <label className="block mb-2 font-medium text-neutral-700 dark:text-neutral-100">
          Options
        </label>
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
            required
            className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
          />
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="text-blue-600 text-sm hover:underline"
        >
          + Add Option
        </button>
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

export default OptionGroupModal;
