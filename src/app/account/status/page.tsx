'use client';

import React, { useState } from 'react';
import StatusModal, { StatusData } from './model/StatusModal';
import ButtonPrimary from '@/shared/ButtonPrimary';
import classNames from 'classnames';

const initialStatuses = [
  {
    status_id: 101,
    entity_type: 'reservation',
    code: 'pending',
    label: 'Pending',
    color_hex: '#facc15',
    sort_order: 1,
  },
  {
    status_id: 102,
    entity_type: 'reservation',
    code: 'confirmed',
    label: 'Confirmed',
    color_hex: '#22c55e',
    sort_order: 2,
  },
  {
    status_id: 103,
    entity_type: 'reservation',
    code: 'cancelled',
    label: 'Cancelled',
    color_hex: '#ef4444',
    sort_order: 3,
  },
];

const StatusPage = () => {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [activeEntity, setActiveEntity] = useState('reservation');
  const [editingStatus, setEditingStatus] = useState<StatusData | null>(null);
  const [formKey, setFormKey] = useState('new');

  const handleSaveStatus = (updatedStatus: StatusData) => {
    if (updatedStatus.status_id) {
      setStatuses((prev) =>
        prev.map((s) =>
          s.status_id === updatedStatus.status_id ? { ...s, ...updatedStatus } : s
        )
      );
    } else {
      const newStatus = {
        ...updatedStatus,
        status_id: Math.floor(Math.random() * 100000),
        entity_type: activeEntity,
      };
      setStatuses((prev) => [...prev, newStatus]);
    }
    setEditingStatus(null);
    setFormKey('new');
  };

  const filteredStatuses = statuses.filter((s) => s.entity_type === activeEntity);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar - Entities */}
      <div className="lg:w-1/5 w-full p-4 border-b lg:border-b-0 lg:border-r dark:border-gray-700 bg-white dark:bg-gray-800">
        <h3 className="font-bold mb-4">Statuses</h3>
        <select
          className="block lg:hidden w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          value={activeEntity}
          onChange={(e) => {
            setActiveEntity(e.target.value);
            setEditingStatus(null);
            setFormKey('new');
          }}
        >
          {['reservation', 'deal', 'order', 'user', 'voucher', 'invoice'].map((entity) => (
            <option key={entity} value={entity} className="capitalize">
              {entity}s
            </option>
          ))}
        </select>

        <div className="hidden lg:block">
          {['reservation', 'deal', 'order', 'user', 'voucher', 'invoice'].map((entity) => (
            <div
              key={entity}
              className={classNames(
                'cursor-pointer px-4 py-2 rounded mb-1 capitalize font-medium',
                entity === activeEntity
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
              onClick={() => {
                setActiveEntity(entity);
                setEditingStatus(null);
                setFormKey('new');
              }}
            >
              {entity}s
            </div>
          ))}
        </div>
      </div>

      {/* Status Cards */}
      <div className="lg:w-2/5 w-full p-4 border-b lg:border-b-0 lg:border-r dark:border-gray-700">
        <h3 className="font-bold mb-3">Status</h3>
        <div className="space-y-2">
          {filteredStatuses.map((status) => (
            <div
              key={status.status_id}
              className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border rounded cursor-pointer"
              onClick={() => {
                setEditingStatus({ ...status });
                setFormKey(status.status_id.toString());
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: status.color_hex }}
                ></div>
                <span>{status.label}</span>
              </div>
              <span className="text-sm text-gray-400">{status.code}</span>
            </div>
          ))}
          <button
            className="w-full py-2 mt-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            onClick={() => {
              setEditingStatus({
                code: '',
                label: '',
                color_hex: '',
                sort_order: 0,
                entity_type: activeEntity,
              });
              setFormKey('new');
            }}
          >
            + Add Status
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <div className="lg:w-2/5 w-full p-4">
        <h3 className="font-bold mb-3">{editingStatus?.status_id ? 'Edit Status' : 'Add Status'}</h3>
        {editingStatus && (
          <StatusModal
            key={formKey}
            initialData={editingStatus}
            onClose={() => {
              setEditingStatus(null);
              setFormKey('new');
            }}
            onSave={handleSaveStatus}
          />
        )}
      </div>
    </div>
  );
};

export default StatusPage;