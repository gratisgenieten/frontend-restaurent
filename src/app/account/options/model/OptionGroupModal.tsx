'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { OptionGroupData, OptionData } from '@/types/all.type';
import {
  createOptionGroup,
  updateOptionGroupById,
  createOption,
  updateOptionById,
} from '@/hooks/apis/useAdmin';

interface Props {
  initialData?: OptionGroupData;
  onClose: () => void;
  onSave: (group: OptionGroupData) => void;
}

const OptionGroupModal = ({ initialData, onClose, onSave }: Props) => {
  const [name, setName] = useState(initialData?.name || '');
  const [options, setOptions] = useState<OptionData[]>(initialData?.options || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddOption = () => {
    setOptions([...options, { value: '', option_group_id: initialData?.option_group_id || 0 }]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index].value = value;
    setOptions(updated);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let groupId = initialData?.option_group_id;

      if (groupId) {
        await updateOptionGroupById(groupId, { name });
      } else {
        const created = await createOptionGroup({ name });
        groupId = created.id;
      }

      for (const opt of options) {
        if (opt.option_id) {
          await updateOptionById(opt.option_id, { value: opt.value, option_group_id: groupId });
        } else {
          await createOption({ value: opt.value, option_group_id: groupId });
        } 
      }

      onSave({ option_group_id: groupId, name, options });
    } catch (error) {
      console.error('Failed to save option group:', error);
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-[75vh] overflow-hidden text-gray-900 dark:text-white">
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Group Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto pr-1 border-y border-gray-200 dark:border-gray-700 py-2 space-y-4">
        {options.map((opt, idx) => (
          <div key={idx}>
            <label className="block mb-1 text-sm font-medium">Option {idx + 1}</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={opt.value}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center gap-4 pt-4">
        <ButtonPrimary onClick={handleAddOption}>+ Add Option</ButtonPrimary>
        <ButtonPrimary onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Group'}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default OptionGroupModal;
