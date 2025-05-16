'use client';

import React, { useState } from 'react';
import NcModal from '@/shared/NcModal';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import AddRoleModal from './model/AddRoleModal';
import AssignPermissionsModal from './model/AssignPermissionsModal';

const dummyUsers = [
  {
    id: 1,
    name: 'Anjali Rana',
    role: 'admin',
    label: 'Administrator',
    permissions: ['deals.create', 'reservations.update'],
  },
  {
    id: 2,
    name: 'Rahul Shah',
    role: 'editor',
    label: 'Content Editor',
    permissions: ['deals.create'],
  },
];

const allPermissions = [
  'deals.create',
  'reservations.update',
  'users.invite',
  'reports.view',
];

const RolesListPage = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [editingUser, setEditingUser] = useState<typeof dummyUsers[0] | null>(null);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  const handleSavePermissions = (updatedPermissions: string[]) => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? { ...u, permissions: updatedPermissions } : u
      )
    );
    setEditingUser(null);
  };

  return (
    <div className="nc-RolesListPage min-h-screen container mb-24 lg:mb-32 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
          User Role Management
        </h3>

        <NcModal
          modalTitle="Add New Role"
          contentExtraClass="max-w-md"
          isOpenProp={isAddRoleModalOpen}
          onCloseModal={() => setIsAddRoleModalOpen(false)}
          renderTrigger={(openModal: () => void) => (
            <ButtonPrimary
              onClick={() => {
                setIsAddRoleModalOpen(true);
                openModal();
              }}
            >
              + Add Role
            </ButtonPrimary>
          )}
          renderContent={() => (
            <AddRoleModal onClose={() => setIsAddRoleModalOpen(false)} />
          )}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
        <table className="w-full table-auto text-sm text-neutral-700 dark:text-neutral-200">
          <thead className="bg-neutral-100 dark:bg-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left font-medium">User</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Label</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-neutral-200 dark:border-neutral-700"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.label}</td>
                <td className="px-4 py-2">
                  <NcModal
                    modalTitle={`Manage Permissions for ${user.name}`}
                    contentExtraClass="max-w-2xl"
                    isOpenProp={editingUser?.id === user.id && isPermissionModalOpen}
                    onCloseModal={() => {
                      setEditingUser(null);
                      setIsPermissionModalOpen(false);
                    }}
                    renderTrigger={(openModal) => (
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setIsPermissionModalOpen(true);
                          openModal();
                        }}
                        className="text-blue-600 underline hover:text-blue-800 transition"
                      >
                        Edit
                      </button>
                    )}
                    renderContent={() => (
                      <AssignPermissionsModal
                        permissions={allPermissions}
                        assignedPermissions={user.permissions}
                        onClose={() => {
                          setEditingUser(null);
                          setIsPermissionModalOpen(false);
                        }}
                        onSave={handleSavePermissions}
                      />
                    )}
                  />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesListPage;
