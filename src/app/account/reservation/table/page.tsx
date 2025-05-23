'use client';
import { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

const ReservationTable = () => {
  const events = [
    {
      id: '1',
      resourceId: 't1',
      title: 'Dinner - John Doe',
      start: '2025-05-23T18:00:00',
      end: '2025-05-23T20:00:00',
      color: '#4CAF50',
    },
    {
      id: '2',
      resourceId: 't2',
      title: 'Lunch - Jane Smith',
      start: '2025-05-23T12:00:00',
      end: '2025-05-23T13:30:00',
      color: '#2196F3',
    },
    {
      id: '3',
      resourceId: 't3',
      title: 'Brunch - Table 3',
      start: '2025-05-23T10:00:00',
      end: '2025-05-23T11:30:00',
      color: '#FF9800',
    },
    {
      id: '4',
      resourceId: 't4',
      title: 'Group Reservation',
      start: '2025-05-23T15:00:00',
      end: '2025-05-23T17:00:00',
      color: '#F44336',
    },
  ];
  const resources = [
    { id: 't1', title: 'group 1' },
    { id: 't2', title: 'group 2' },
    { id: 't3', title: 'group 3' },
    { id: 't4', title: 'group 4' },
    { id: 't5', title: 'group 5' },
    { id: 't6', title: 'group 6' },
    { id: 't7', title: 'group 7' },
    { id: 't8', title: 'group 8' },
  ];
  useEffect(() => {
    const el = document.getElementById('calendar');
    if (el) el.style.height = `${window.innerHeight - 150}px`;
    const resizeHandler = () => {
      if (el) el.style.height = `${window.innerHeight - 150}px`;
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 flex justify-center p-4">
      <div className="w-full max-w-screen-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Table Reservations
        </h1>
        <FullCalendar
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[resourceTimelinePlugin, interactionPlugin]}
          initialView="resourceTimelineDay"
          initialDate="2025-05-23"
          resources={resources}
          events={events}
          editable
          droppable
          headerToolbar={{
            left: 'title',
            center: '',
            right: 'prev,next',
          }}
          resourceAreaHeaderContent="Tables"
          slotMinTime="01:00:00"
          slotMaxTime="24:00:00"
          height="auto"
        />
        <style>
          {`
            .dark .fc {
              background-color: #1f2937;
              color: #f9fafb;
            }

            .dark .fc .fc-scrollgrid {
              border-color: #374151;
            }

            .dark .fc .fc-col-header-cell,
            .dark .fc .fc-timegrid-slot,
            .dark .fc .fc-resource-cell {
              background-color: #111827;
              border-color: #4b5563;
            }

            .dark .fc .fc-col-header-cell-cushion,
            .dark .fc .fc-timegrid-slot-label-cushion,
            .dark .fc .fc-resource-cell-cushion {
              color: #f3f4f6;
            }

            .dark .fc .fc-event {
              border: none;
            }
            .dark .fc-timeline-slot{
              background-color: #111827 !important;
            }
            .dark .fc-datagrid-cell-frame{
              background-color: #111827 !important;
            }
            .dark .fc .fc-event-title {
              color: #ffffff;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ReservationTable;
