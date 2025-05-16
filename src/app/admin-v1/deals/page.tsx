'use client';

import React, { useState } from 'react';
import NcModal from '@/shared/NcModal';
import ButtonPrimary from '@/shared/ButtonPrimary';
import StatusCard from '@/components/StatusCard';
import DealModal, { DealData } from './model/DealModal';

const initialDeals: DealData[] = [
    {
        deal_id: 1,
        partner_id: 101,
        title: 'Day-ticket Artis Zoo',
        description: 'Access to all exhibits and animal shows.',
        price_cash: 25.00,
        partner_payout: 18.00,
        max_reservations: 100,
        reservations_made: 30,
        valid_from: '2025-06-01',
        valid_to: '2025-09-30',
        status_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

const DealsPage = () => {
    const [deals, setDeals] = useState<DealData[]>(initialDeals);
    const [editingDeal, setEditingDeal] = useState<DealData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveDeal = (updatedDeal: DealData) => {
        if (updatedDeal.deal_id) {
            setDeals((prev) =>
                prev.map((d) => (d.deal_id === updatedDeal.deal_id ? updatedDeal : d))
            );
        } else {
            const newDeal = {
                ...updatedDeal,
                deal_id: Math.floor(Math.random() * 100000),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            setDeals((prev) => [...prev, newDeal]);
        }
        setEditingDeal(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Deals</h2>
                <ButtonPrimary
                    onClick={() => {
                        setEditingDeal(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Deal
                </ButtonPrimary>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                {deals.map((deal) => (
                    <NcModal
                        key={deal.deal_id}
                        modalTitle={`Edit Deal: ${deal.title}`}
                        contentExtraClass="max-w-2xl"
                        isOpenProp={editingDeal?.deal_id === deal.deal_id}
                        onCloseModal={() => setEditingDeal(null)}
                        renderTrigger={(openModal) => (
                            <StatusCard
                                logo="https://www.gstatic.com/flights/airline_logos/70px/KE.png"
                                title={deal.title}
                                subtitle={`Price: $${deal.price_cash} | Payout: $${deal.partner_payout}`}
                                value={`Valid from ${deal.valid_from} to ${deal.valid_to}`}
                                valueCaption={`Reservations: ${deal.reservations_made}/${deal.max_reservations ?? '∞'}`}
                                onClick={() => {
                                    setEditingDeal(deal);
                                    openModal();
                                }}
                            />
                        )}
                        renderContent={() => (
                            <DealModal
                                initialData={editingDeal as DealData}
                                onClose={() => setEditingDeal(null)}
                                onSave={handleSaveDeal}
                            />
                        )}
                    />
                ))}
            </div>
            {isModalOpen ? (<>
                <NcModal
                    modalTitle="Add New Deal"
                    contentExtraClass="max-w-2xl"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <DealModal
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveDeal}
                        />
                    )}
                />
            </>) : null}
        </div>
    );
};

export default DealsPage;
