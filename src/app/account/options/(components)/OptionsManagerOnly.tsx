'use client';

import React, { useState, useEffect } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import OptionModal from '../model/OptionModal';
import {
  getOptions,
  getOptionGroups,
  createOption,
  updateOptionById,
  deleteOptionById,
} from '@/hooks/apis/useAdmin';

import { Option, OptionGroup } from '@/types/all.type';
import { FaEdit, FaTrash } from 'react-icons/fa';

const OptionsManagerOnly = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [groups, setGroups] = useState<OptionGroup[]>([]);
  const [editingOption, setEditingOption] = useState<Option | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [optionRes, groupRes] = await Promise.all([getOptions(), getOptionGroups()]);
      setOptions(optionRes);
      setGroups(groupRes);
    } catch (error) {
      console.error('Failed to fetch options/groups:', error);
    }
  };

  const handleSaveOption = async (data: Option) => {
    try {
      if (data.id) {
        await updateOptionById(data.id, {
          value: data.value,
          option_group_id: data.option_group_id,
        });
      } else {
        await createOption({
          value: data.value,
          option_group_id: data.option_group_id,
        });
      }
      await fetchData();
    } catch (error) {
      console.error('Error saving option:', error);
    }
    setEditingOption(null);
    setIsModalOpen(false);
  };

  const handleDeleteOption = async (id: number) => {
    try {
      await deleteOptionById(id);
      await fetchData();
    } catch (error) {
      console.error('Error deleting option:', error);
    }
  };

  const getGroupName = (groupId: number) => {
    return groups.find((g) => g.id === groupId)?.name || `Group ID: ${groupId}`;
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Options</h2>
        <ButtonPrimary
          onClick={() => {
            setEditingOption(null);
            setIsModalOpen(true);
          }}
        >
          + Add Option
        </ButtonPrimary>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-sm transition hover:shadow-md"
          >
            {/* Left side: option & group */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <div className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-white">
                  {opt.value}
                </div>
                <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  {getGroupName(opt.option_group_id)}
                </div>
              </div>
            </div>

            {/* Right side: actions */}
            <div className="flex items-center gap-3 sm:ml-auto">
              <button
                onClick={() => {
                  setEditingOption(opt);
                  setIsModalOpen(true);
                }}
                title="Edit"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteOption(opt.id)}
                title="Delete"
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {options.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            No options available.
          </div>
        )}
      </div>

      {isModalOpen && (
        <NcModal
          modalTitle={editingOption ? 'Edit Option' : 'Add Option'}
          contentExtraClass="max-w-md"
          isOpenProp={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          renderContent={() => (
            <OptionModal
              initialData={editingOption || undefined}
              groups={groups}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveOption}
            />
          )}
        />
      )}
    </div>
  );
};

export default OptionsManagerOnly;
