'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import StatusCard from '@/components/StatusCard';
import ReservationModal, { ReservationData } from './model/ReservationModal';

const initialReservations: ReservationData[] = [
    {
        reservation_id: 1,
        deal_id: 101,
        partner_id: 201,
        user_id: 301,
        persons: 2,
        reservation_at: '2025-05-20T19:00',
        booked_on: '2025-05-10T14:30',
        wallet_spent: 100.0,
        cash_paid: 0.0,
        status_id: 1,
        partner_payout: 80.0,
        payout_status: 'pending',
    },
];

const ReservationListPage = () => {
    const [reservations, setReservations] = useState<ReservationData[]>(initialReservations);
    const [editingReservation, setEditingReservation] = useState<ReservationData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveReservation = (updated: ReservationData) => {
        if (updated.reservation_id) {
            setReservations((prev) =>
                prev.map((res) =>
                    res.reservation_id === updated.reservation_id ? updated : res
                )
            );
        } else {
            setReservations((prev) => [
                ...prev,
                {
                    ...updated,
                    reservation_id: Math.floor(Math.random() * 100000),
                },
            ]);
        }
        setEditingReservation(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Reservations</h2>
                <ButtonPrimary onClick={() => setIsModalOpen(true)}>+ Add Reservation</ButtonPrimary>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                {reservations.map((res) => (
                    <NcModal
                        key={res.reservation_id}
                        modalTitle={`Edit Reservation ID ${res.reservation_id}`}
                        contentExtraClass="max-w-2xl"
                        isOpenProp={editingReservation?.reservation_id === res.reservation_id}
                        onCloseModal={() => setEditingReservation(null)}
                        renderTrigger={(openModal) => (
                            <StatusCard
                                logo=""
                                title={`User #${res.user_id}`}
                                subtitle={`Partner #${res.partner_id} | ${res.reservation_at}`}
                                value={`Status ID: ${res.status_id}`}
                                valueCaption={`Payout: ₹${res.partner_payout} | ${res.payout_status}`}
                                onClick={() => {
                                    setEditingReservation(res);
                                    openModal();
                                }}
                            />
                        )}
                        renderContent={() => (
                            <ReservationModal
                                initialData={editingReservation as ReservationData}
                                onClose={() => setEditingReservation(null)}
                                onSave={handleSaveReservation}
                            />
                        )}
                    />
                ))}
            </div>
            {isModalOpen && (<>
                <NcModal
                    modalTitle="Add Reservation"
                    contentExtraClass="max-w-2xl"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <ReservationModal
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveReservation}
                        />
                    )}
                />
            </>)}

        </div>
    );
};

export default ReservationListPage;