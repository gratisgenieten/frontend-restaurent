'use client';

import React, { useState } from 'react';
import NcModal from '@/shared/NcModal';
import ButtonPrimary from '@/shared/ButtonPrimary';
import StatusCard from '@/components/StatusCard';
import UserModal, { UserData } from './model/UserModal';

const initialUsers: UserData[] = [
    {
        user_id: 1,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 2,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 3,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 4,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 5,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 6,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 7,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 8,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
     {
        user_id: 9,
        name: 'Anjali Rana',
        email: 'anjali@example.com',
        password_hash: '',
        phone: '9876543210',
        wallet_balance: 500.75,
        referral_code: 'REF12345',
        referred_by: null,
        newsletter_opt_in: true,
    },
    {
        user_id: 10,
        name: 'Rahul Shah',
        email: 'rahul@example.com',
        password_hash: '',
        phone: '9988776655',
        wallet_balance: 150.5,
        referral_code: 'RAHUL2024',
        referred_by: 1,
        newsletter_opt_in: false,
    },
];

const UsersPage = () => {
    const [users, setUsers] = useState<UserData[]>(initialUsers);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveUser = (updatedUser: UserData) => {
        if (updatedUser.user_id) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.user_id === updatedUser.user_id ? { ...u, ...updatedUser } : u
                )
            );
        } else {
            const newUser = {
                ...updatedUser,
                user_id: Math.floor(Math.random() * 100000),
            };
            setUsers((prev) => [...prev, newUser]);
        }
        setEditingUser(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Users
                </h2>
                <ButtonPrimary
                    onClick={() => {
                        setEditingUser(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add User
                </ButtonPrimary>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <NcModal
                        key={user.user_id}
                        modalTitle={`Edit User: ${user.name}`}
                        contentExtraClass="max-w-2xl"
                        isOpenProp={editingUser?.user_id === user.user_id}
                        onCloseModal={() => setEditingUser(null)}
                        renderTrigger={(openModal) => (
                            <StatusCard
                                logo="https://www.gstatic.com/flights/airline_logos/70px/KE.png"
                                title={user.name}
                                subtitle={user.email}
                                value={`₹${user.wallet_balance.toFixed(2)}`}
                                valueCaption={`Phone: ${user.phone}`}
                                onClick={() => {
                                    setEditingUser(user);
                                    openModal();
                                }}
                            />
                        )}
                        renderContent={() => (
                            <UserModal
                                initialData={editingUser as UserData}
                                onClose={() => setEditingUser(null)}
                                onSave={handleSaveUser}
                            />
                        )}
                    />
                ))}
            </div>
            {isModalOpen && (
                <NcModal
                    modalTitle="Add New User"
                    contentExtraClass="max-w-xl"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <UserModal
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveUser}
                        />
                    )}
                />)
            }
        </div>
    );
};

export default UsersPage;
