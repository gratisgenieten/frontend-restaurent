'use client';

import React, { useEffect, useState } from 'react';
import StatusModal, { StatusData } from './model/StatusModal';
import {
  createStatus,
  updateStatusById,
  deleteStatusById,
  getStatusesByEntityType,
} from '@/hooks/apis/useAdmin';
import { showSuccessToast, showErrorToast } from '@/lib/toast';
import classNames from 'classnames';
import Swal from 'sweetalert2';

const ENTITY_TYPES = ['reservation', 'deal', 'order', 'user', 'voucher', 'invoice'];

const StatusPage = () => {
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [activeEntity, setActiveEntity] = useState('reservation');
  const [editingStatus, setEditingStatus] = useState<StatusData | null>(null);
  const [formKey, setFormKey] = useState<string>('new');
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<any | null>(null);

  const fetchStatuses = async () => {
    try {
      setLoading(true);
      const response = await getStatusesByEntityType(activeEntity);
      setStatuses(response);
    } catch (err: any) {
      showErrorToast(err.message || 'Failed to fetch statuses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [activeEntity]);

  const handleSaveStatus = async (status: StatusData) => {
    try {
      setLoading(true);
      setApiErrors(null);
      let savedStatus: any;

      if (status.id) {
        savedStatus = await updateStatusById(status.id, status);
        setStatuses((prev) =>
          prev.map((s) => (s.id === savedStatus.id ? savedStatus : s))
        );
        showSuccessToast('Status updated successfully');
      } else {
        savedStatus = await createStatus({ ...status, entity_type: activeEntity });
        setStatuses((prev) => [...prev, savedStatus]);
        showSuccessToast('Status created successfully');
      }

      setEditingStatus(null);
      setFormKey('new');
    } catch (err: any) {
      const response = err.data.errors;
      console.log(response);
      if (response) {
        setApiErrors(response);
      } else {
        showErrorToast(err.message || 'Error while saving status');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStatus = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This status will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await deleteStatusById(id);
      setStatuses((prev) => prev.filter((s) => s.id !== id));
      if (editingStatus?.id === id) {
        setEditingStatus(null);
        setFormKey('new');
      }
      showSuccessToast('Status deleted successfully');
    } catch (err: any) {
      showErrorToast(err.message || 'Failed to delete status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="lg:w-1/5 w-full p-4 border-b lg:border-b-0 lg:border-r dark:border-gray-700 bg-white dark:bg-gray-800">
        <h3 className="font-bold mb-4">Entities</h3>
        <select
          className="block lg:hidden w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          value={activeEntity}
          onChange={(e) => {
            setActiveEntity(e.target.value);
            setEditingStatus(null);
            setFormKey('new');
          }}
        >
          {ENTITY_TYPES.map((entity) => (
            <option key={entity} value={entity} className="capitalize">
              {entity}s
            </option>
          ))}
        </select>

        <div className="hidden lg:block">
          {ENTITY_TYPES.map((entity) => (
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

      <div className="lg:w-2/5 w-full p-4 border-b lg:border-b-0 lg:border-r dark:border-gray-700">
        <h3 className="font-bold mb-3 capitalize">{activeEntity} Statuses</h3>
        <div className="space-y-2">
          {statuses.map((status) => (
            <div
              key={status.id}
              className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border rounded cursor-pointer"
              onClick={() => {
                setEditingStatus({ ...status });
                setFormKey(status?.id?.toString() || '');
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: status.color_hex }}></div>
                <span>{status.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{status.code}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStatus(status.id!);
                  }}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Delete
                </button>
              </div>
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

      {/* Modal */}
      <div className="lg:w-2/5 w-full p-4">
        <h3 className="font-bold mb-3">{editingStatus?.id ? 'Edit Status' : 'Add Status'}</h3>
        {editingStatus && (
          <StatusModal
            key={formKey}
            initialData={editingStatus}
            onClose={() => {
              setEditingStatus(null);
              setFormKey('new');
              setApiErrors(null); // clear errors when closing modal
            }}
            onSave={handleSaveStatus}
            apiErrors={apiErrors}
          />

        )}
      </div>
    </div>
  );
};

export default StatusPage;
