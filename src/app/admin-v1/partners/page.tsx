'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import StatusCard from '@/components/StatusCard';
import PartnerModal, { PartnerData } from './model/PartnerModal';

const initialPartners: any[] = [
    {
        partner_id: 1,
        user_id: 101,
        name: 'Sushi Palace',
        description: 'A premium sushi dining experience.',
        contact_name: 'Keiko Tanaka',
        contact_email: 'keiko@sushipalace.com',
        contact_phone: '9876543210',
        address: '123 Tokyo Street',
        city: 'Tokyo',
        postal_code: '100-0001',
        payout_iban: 'JP123456789000000123456',
        category_id: 2,
        status_id: 1,
    },
    {
        partner_id: 2,
        user_id: 102,
        name: 'Ocean Spa',
        description: 'Relaxation and wellness in the heart of the city.',
        contact_name: 'Lana Singh',
        contact_email: 'lana@oceanspa.com',
        contact_phone: '9988776655',
        address: '456 Marina Drive',
        city: 'Mumbai',
        postal_code: '400001',
        payout_iban: 'IN789456123000098765432',
        category_id: 5,
        status_id: 2,
    },
    {
        partner_id: 3,
        user_id: 101,
        name: 'Sushi Palace',
        description: 'A premium sushi dining experience.',
        contact_name: 'Keiko Tanaka',
        contact_email: 'keiko@sushipalace.com',
        contact_phone: '9876543210',
        address: '123 Tokyo Street',
        city: 'Tokyo',
        postal_code: '100-0001',
        payout_iban: 'JP123456789000000123456',
        category_id: 2,
        status_id: 1,
    },
    {
        partner_id: 4,
        user_id: 102,
        name: 'Ocean Spa',
        description: 'Relaxation and wellness in the heart of the city.',
        contact_name: 'Lana Singh',
        contact_email: 'lana@oceanspa.com',
        contact_phone: '9988776655',
        address: '456 Marina Drive',
        city: 'Mumbai',
        postal_code: '400001',
        payout_iban: 'IN789456123000098765432',
        category_id: 5,
        status_id: 2,
    },
];

const PartnersPage = () => {
    const [partners, setPartners] = useState<PartnerData[]>(initialPartners);
    const [editingPartner, setEditingPartner] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSavePartner = (updatedPartner: any) => {
        if (updatedPartner.partner_id) {
            setPartners((prev) =>
                prev.map((p:any) =>
                    p.partner_id === updatedPartner.partner_id ? { ...p, ...updatedPartner } : p
                )
            );
        } else {
            const newPartner = {
                ...updatedPartner,
                partner_id: Math.floor(Math.random() * 100000),
            };
            setPartners((prev) => [...prev, newPartner]);
        }
        setEditingPartner(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Partners
                </h2>
                <ButtonPrimary
                    onClick={() => {
                        setEditingPartner(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Partner
                </ButtonPrimary>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {partners.map((partner:any) => (
                    <NcModal
                        key={partner.partner_id}
                        modalTitle={`Edit Partner: ${partner.name}`}
                        contentExtraClass="max-w-2xl"
                        isOpenProp={editingPartner?.partner_id === partner.partner_id}
                        onCloseModal={() => setEditingPartner(null)}
                        renderTrigger={(openModal) => (
                            <StatusCard
                                logo="https://www.gstatic.com/flights/airline_logos/70px/KE.png"
                                title={partner.name}
                                subtitle={partner.city + ' · ' + partner.contact_name}
                                value={partner.contact_email}
                                valueCaption={`User ID: ${partner.user_id}`}
                                onClick={() => {
                                    setEditingPartner(partner);
                                    openModal();
                                }}
                            />
                        )}
                        renderContent={() => (
                            <PartnerModal
                                initialData={editingPartner as PartnerData}
                                onClose={() => setEditingPartner(null)}
                                onSave={handleSavePartner}
                            />
                        )}
                    />
                ))}
            </div>
            {isModalOpen && (
                <NcModal
                    modalTitle="Add New Partner"
                    contentExtraClass="max-w-xl"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <PartnerModal
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSavePartner}
                        />
                    )}
                />
            )}
        </div>
    );
};

export default PartnersPage;
