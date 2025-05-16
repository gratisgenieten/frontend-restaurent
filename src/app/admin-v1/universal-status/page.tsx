'use client';

import React, { useState } from 'react';
import StatusCard from '@/components/StatusCard';
import NcModal from '@/shared/NcModal';
import StatusModal, { StatusData } from './model/StatusModal';
import ButtonPrimary from '@/shared/ButtonPrimary';

const initialStatuses = [
  {
    status_id: 101,
    entity_type: 'reservation',
    code: 'active',
    label: 'Active',
    color_hex: '#32caff',
    sort_order: 1,
  },
  {
    status_id: 102,
    entity_type: 'deal',
    code: 'no_show',
    label: 'No Show',
    color_hex: '#ff3b3b',
    sort_order: 2,
  },
];

const StatusPage = () => {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [editingStatus, setEditingStatus] = useState<StatusData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      };
      setStatuses((prev) => [...prev, newStatus]);
    }
    setEditingStatus(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container  min-h-screen mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Status Manager
        </h2>
        <ButtonPrimary
          onClick={() => {
            setEditingStatus(null);
            setIsModalOpen(true);
          }}
        >
          + Add Status
        </ButtonPrimary>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <NcModal
            key={status.status_id}
            modalTitle={`Edit Status: ${status.label}`}
            contentExtraClass="max-w-2xl"
            isOpenProp={editingStatus?.status_id === status.status_id}
            onCloseModal={() => setEditingStatus(null)}
            renderTrigger={(openModal) => (
              <StatusCard
                logo="https://www.gstatic.com/flights/airline_logos/70px/KE.png"
                title={status.label}
                subtitle={status.entity_type}
                value={status.code}
                valueCaption={`Color: ${status.color_hex} · Order: ${status.sort_order}`}
                onClick={() => {
                  setEditingStatus(status);
                  openModal();
                }}
              />
            )}
            renderContent={() => (
              <StatusModal
                initialData={editingStatus as StatusData}
                onClose={() => setEditingStatus(null)}
                onSave={handleSaveStatus}
              />
            )}
          />
        ))}
      </div>

        {isModalOpen && (
             <NcModal
        modalTitle="Add New Status"
        contentExtraClass="max-w-xl"
        isOpenProp={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        renderContent={() => (
          <StatusModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveStatus}
          />
        )}
      />)}
     
    </div>
  );
};

export default StatusPage;
