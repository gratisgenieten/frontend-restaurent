'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import StatusCard from '@/components/StatusCard';

export interface StatusHistoryData {
  history_id?: number;
  entity_type: string;
  entity_id: number;
  old_status_id: number;
  new_status_id: number;
  changed_by: number;
  changed_at: string;
}

const initialHistory: StatusHistoryData[] = [
  {
    history_id: 1,
    entity_type: 'reservation',
    entity_id: 203,
    old_status_id: 1,
    new_status_id: 3,
    changed_by: 101,
    changed_at: new Date().toISOString(),
  },
  {
    history_id: 2,
    entity_type: 'deal',
    entity_id: 55,
    old_status_id: 2,
    new_status_id: 4,
    changed_by: 100,
    changed_at: new Date().toISOString(),
  },
];

const StatusHistoryPage = () => {
  const [historyList] = useState<StatusHistoryData[]>(initialHistory);

  return (
    <div className="container min-h-screen mx-auto py-10 space-y-6">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
        Status Change History
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
        {historyList.map((history) => (
          <StatusCard
            key={history.history_id}
            logo=""
            title={`Entity: ${history.entity_type} #${history.entity_id}`}
            subtitle={`Changed By: ${history.changed_by}`}
            value={`Status: ${history.old_status_id} → ${history.new_status_id}`}
            valueCaption={`Changed At: ${new Date(history.changed_at).toISOString().split('T')[0]}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusHistoryPage;
