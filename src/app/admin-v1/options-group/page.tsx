'use client';

import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import NcModal from '@/shared/NcModal';
import StatusCard from '@/components/StatusCard';
import OptionGroupModal, { OptionGroupData } from './model/OptionGroupModal';

const OptionsGroupPage = () => {
    const [groups, setGroups] = useState<OptionGroupData[]>([
        {
            option_group_id: 1,
            name: 'Parking',
            options: [
                { option_id: 1, option_group_id: 1, value: 'Yes' },
                { option_id: 2, option_group_id: 1, value: 'No' },
            ],
        },
        {
            option_group_id: 2,
            name: 'WiFi',
            options: [
                { option_id: 3, option_group_id: 2, value: 'Available' },
                { option_id: 4, option_group_id: 2, value: 'Not Available' },
            ],
        },
    ]);

    const [editingGroupId, setEditingGroupId] = useState<number | null | any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveGroup = (updatedGroup: OptionGroupData) => {
        if (updatedGroup.option_group_id) {
            setGroups((prev) =>
                prev.map((g) =>
                    g.option_group_id === updatedGroup.option_group_id ? updatedGroup : g
                )
            );
        } else {
            const newGroup = {
                ...updatedGroup,
                option_group_id: Math.floor(Math.random() * 100000),
                options: updatedGroup.options.map((opt) => ({
                    ...opt,
                    option_id: Math.floor(Math.random() * 100000),
                })),
            };
            setGroups((prev) => [...prev, newGroup]);
        }

        setEditingGroupId(null);
        setIsModalOpen(false);
    };

    return (
        <div className="container min-h-screen mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Option Groups
                </h2>
                <ButtonPrimary
                    onClick={() => {
                        setEditingGroupId(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Group
                </ButtonPrimary>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((group) => (
                    <NcModal
                        key={`edit-modal-${group.option_group_id}`}
                        modalTitle={`Edit Group: ${group.name}`}
                        contentExtraClass="max-w-md"
                        isOpenProp={editingGroupId === group.option_group_id}
                        onCloseModal={() => setEditingGroupId(null)}
                        renderTrigger={(openModal) => (
                            <StatusCard
                                logo=""
                                title={group.name}
                                subtitle={`Group ID: ${group.option_group_id}`}
                                value={`${group.options.length} Options`}
                                valueCaption={group.options.map((o) => o.value).join(', ')}
                                onClick={() => {
                                    setEditingGroupId(group.option_group_id);
                                    openModal();
                                }}
                            />
                        )}
                        renderContent={() => (
                            <OptionGroupModal
                                initialData={groups.find((g) => g.option_group_id === editingGroupId)!}
                                onClose={() => setEditingGroupId(null)}
                                onSave={handleSaveGroup}
                            />
                        )}
                    />
                ))}
            </div>
            {isModalOpen && (
                <NcModal
                    modalTitle="Add New Option Group"
                    contentExtraClass="max-w-md"
                    isOpenProp={isModalOpen}
                    onCloseModal={() => setIsModalOpen(false)}
                    renderContent={() => (
                        <OptionGroupModal
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveGroup}
                        />
                    )}
                />
            )}
        </div>
    );
};

export default OptionsGroupPage;
