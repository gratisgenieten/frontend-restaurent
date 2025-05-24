'use client';

import React, { useState, useEffect } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import OptionGroupModal from '../model/OptionGroupModal';
import {
  getOptionGroups,
  getOptions,
  createOptionGroup,
  updateOptionGroupById,
  deleteOptionGroupById,
} from '@/hooks/apis/useAdmin';
import { Option, OptionGroupData } from '@/types/all.type';
import { FaEdit, FaTrash } from 'react-icons/fa';

const OptionGroupsOnly = () => {
  const [groups, setGroups] = useState<OptionGroupData[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [editingGroup, setEditingGroup] = useState<OptionGroupData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [groupRes, optionRes] = await Promise.all([getOptionGroups(), getOptions()]);

      const groupedOptions: { [key: number]: Option[] } = {};
      optionRes.forEach((opt:any) => {
        if (!groupedOptions[opt.option_group_id]) groupedOptions[opt.option_group_id] = [];
        groupedOptions[opt.option_group_id].push(opt);
      });

      const merged = groupRes.map((g: any) => ({
        option_group_id: g.id,
        name: g.name,
        options: groupedOptions[g.id] || [],
      }));

      setGroups(merged);
      setOptions(optionRes);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleSaveGroup = async (group: OptionGroupData) => {
    try {
      if (group.option_group_id) {
        await updateOptionGroupById(group.option_group_id, { name: group.name });
      } else {
        await createOptionGroup({ name: group.name });
      }
      await fetchAll();
    } catch (error) {
      console.error('Error saving group:', error);
    }
    setEditingGroup(null);
    setIsModalOpen(false);
  };

  const handleDeleteGroup = async (id: any) => {
    try {
      await deleteOptionGroupById(id);
      await fetchAll();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Option Groups</h2>
        <ButtonPrimary
          onClick={() => {
            setEditingGroup(null);
            setIsModalOpen(true);
          }}
        >
          + Add Group
        </ButtonPrimary>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.option_group_id}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {group.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Group ID: {group.option_group_id}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                  <strong>{group.options.length}</strong> option
                  {group.options.length !== 1 && 's'}:
                  <br />
                  <span className="block mt-1 text-sm">
                    {group.options.length > 0
                      ? group.options.map((opt) => opt.value).join(', ')
                      : '—'}
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <button
                  title="Edit"
                  onClick={() => {
                    setEditingGroup(group);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDeleteGroup(group.option_group_id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            No groups found.
          </div>
        )}
      </div>

      {isModalOpen && (
        <NcModal
          modalTitle={editingGroup ? 'Edit Group' : 'Add Group'}
          contentExtraClass="max-w-md"
          isOpenProp={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          renderContent={() => (
            <OptionGroupModal
              initialData={editingGroup || undefined}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveGroup}
            />
          )}
        />
      )}
    </div>
  );
};

export default OptionGroupsOnly;
