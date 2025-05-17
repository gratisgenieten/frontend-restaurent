'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import StatusCard from '@/components/StatusCard';
import ReferralModal, { ReferralData } from './model/ReferralModal';

const initialReferrals: ReferralData[] = [
    {
        referral_id: 1,
        referrer_user_id: 101,
        referred_user_id: 202,
        bonus_awarded: true,
        bonus_transaction_id: 5001,
        created_at: new Date().toISOString(),
    },
];

const ReferralsPage = () => {
    const [referrals, setReferrals] = useState<ReferralData[]>(initialReferrals);
    const [editingReferral, setEditingReferral] = useState<ReferralData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (data: ReferralData) => {
        if (data.referral_id) {
            setReferrals((prev) =>
                prev.map((r) => (r.referral_id === data.referral_id ? data : r))
            );
        } else {
            setReferrals((prev) => [
                ...prev,
                {
                    ...data,
                    referral_id: Math.floor(Math.random() * 100000),
                },
            ]);
        }
        setEditingReferral(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Referrals
                </h2>
                <ButtonPrimary onClick={() => setIsModalOpen(true)}>+ Add Referral</ButtonPrimary>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {referrals.map((referral) => (
                    <NcModal
                        key={referral.referral_id}
                        modalTitle={`Edit Referral #${referral.referral_id}`}
                        contentExtraClass="max-w-2xl"
                        isOpenProp={editingReferral?.referral_id === referral.referral_id}
                        onCloseModal={() => setEditingReferral(null)}
                        renderTrigger={(openModal) => (
                            <StatusCard
                                logo=""
                                title={`Referrer: ${referral.referrer_user_id}`}
                                subtitle={`Referred: ${referral.referred_user_id}`}
                                value={referral.bonus_awarded ? 'Bonus Awarded' : 'Pending'}
                                valueCaption={`Tx ID: ${referral.bonus_transaction_id || '—'} | ${new Date(referral.created_at).toISOString().split('T')[0]}`}

                                onClick={() => {
                                    setEditingReferral(referral);
                                    openModal();
                                }}
                            />
                        )}
                        renderContent={() => (
                            <ReferralModal
                                initialData={editingReferral as ReferralData}
                                onClose={() => setEditingReferral(null)}
                                onSave={handleSave}
                            />
                        )}
                    />
                ))}
            </div>
            {isModalOpen && (
                <>
                    <NcModal
                        modalTitle="Add New Referral"
                        contentExtraClass="max-w-2xl"
                        isOpenProp={isModalOpen}
                        onCloseModal={() => setIsModalOpen(false)}
                        renderContent={() => (
                            <ReferralModal
                                onClose={() => setIsModalOpen(false)}
                                onSave={handleSave}
                            />
                        )}
                    />
                </>
            )}
        </div>
    );
};

export default ReferralsPage;

