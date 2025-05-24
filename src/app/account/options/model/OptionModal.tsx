'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { OptionData, OptionGroup } from '@/types/all.type';
import { createOption, updateOptionById } from '@/hooks/apis/useAdmin';

interface Props {
  initialData?: OptionData;
  groups: OptionGroup[];
  onClose: () => void;
  onSave: (data: any) => any;
}

const OptionModal = ({ initialData, groups, onClose, onSave }: any) => {
  const [value, setValue] = useState(initialData?.value || '');
  const [option_group_id, setOptionGroupId] = useState<number>(
    initialData?.option_group_id || (groups[0]?.id ?? 1)
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!value.trim()) return alert('Option name cannot be empty');

    try {
      setIsSaving(true);

      if (initialData?.id) {
        await updateOptionById(initialData.id, { value, option_group_id });
        onSave({
          id: initialData.id, 
          value,
          option_group_id,
        });
      } else {
        const created = await createOption({ value, option_group_id });
        onSave(created);
      }
    } catch (error) {
      console.error('Failed to save option:', error);
    } finally {
      setIsSaving(false);
      onClose();
    }
  };

  return (
    <div className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-md shadow-md">
      <input
        type="text"
        placeholder="Option Name"
        className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <select
        value={option_group_id}
        onChange={(e) => setOptionGroupId(Number(e.target.value))}
        className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
      >
        {groups.map((group:any) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>

      <div className="flex justify-end">
        <ButtonPrimary onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Option'}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default OptionModal;
