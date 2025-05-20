'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import StatusCard from '@/components/StatusCard';
import AffiliateClickModal, { AffiliateClickData } from './model/AffiliateClickModal';
import ReservationsDatesRangeInput from '@/app/account/reservations/ReservationsDatesRangeInput';

const initialClicks: AffiliateClickData[] = [
    {
        click_id: 1,
        user_id: 101,
        partner_id: 201,
        click_time: new Date().toISOString(),
        external_session_id: 'abc123',
        converted: true,
        conversion_amount: 150,
        points_earned: 15,
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
    },
];


const DEAL_OPTIONS = [
    { value: '', label: 'All Deal' },
    { value: 'deal-1', label: 'Deal A' },
    { value: 'deal-2', label: 'Deal B' },
]


const AffiliateClicksPage = () => {
    const [clicks, setClicks] = useState<AffiliateClickData[]>(initialClicks);
    const [editingClick, setEditingClick] = useState<AffiliateClickData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState('')

    const handleSave = (data: AffiliateClickData) => {
        if (data.click_id) {
            setClicks((prev) =>
                prev.map((c) => (c.click_id === data.click_id ? data : c))
            );
        } else {
            setClicks((prev) => [
                ...prev,
                {
                    ...data,
                    click_id: Math.floor(Math.random() * 100000),
                },
            ]);
        }
        setEditingClick(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Affiliate Clicks
                </h2>

                <div className="flex items-center gap-4">
                    <div className="w-full sm:w-auto">
                        <ReservationsDatesRangeInput />
                    </div>
                    <ButtonPrimary onClick={() => setIsModalOpen(true)}>+ Add Click</ButtonPrimary>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                {clicks.map((click) => (
                    <NcModal
                        key={click.click_id}
                        modalTitle={`Edit Click: ${click.external_session_id}`}
                        contentExtraClass="max-w-2xl"
                        isOpenProp={editingClick?.click_id === click.click_id}
                        onCloseModal={() => setEditingClick(null)}
                        renderTrigger={(openModal) => (
                            <StatusCard
                                logo="https://www.gstatic.com/flights/airline_logos/70px/KE.png"
                                title={`User ${click.user_id}`}
                                subtitle={`Partner ${click.partner_id} • ${click.status}`}
                                value={`${click.points_earned} pts`}
                                valueCaption={click.converted ? 'Converted' : 'Not converted'}
                                onClick={() => {
                                    setEditingClick(click);
                                    openModal();
                                }}
                            />
                        )}
                        renderContent={() => (
                            <AffiliateClickModal
                                initialData={editingClick as AffiliateClickData}
                                onClose={() => setEditingClick(null)}
                                onSave={handleSave}
                            />
                        )}
                    />
                ))}
            </div>
            {isModalOpen && (<>
                <NcModal
                    modalTitle="Add New Affiliate Click"
                    contentExtraClass="max-w-2xl"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <AffiliateClickModal
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSave}
                        />
                    )}
                />
            </>)}
        </div>
    );
};

export default AffiliateClicksPage;
