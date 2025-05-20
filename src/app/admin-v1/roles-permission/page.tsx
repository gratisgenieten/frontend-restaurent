'use client';

import React, { useEffect, useState } from 'react';
import PermissionModal, { PermissionData } from './model/PermissionModal';
import ButtonPrimary from '@/shared/ButtonPrimary';

interface Permission {
  name: string;
  enabled: boolean;
}

const mockRoles: string[] = ['Admin', 'Editor', 'User'];
const mockPermissions: Record<string, Permission[]> = {
  Admin: [
    { name: 'User management', enabled: true },
    { name: 'Project management', enabled: false },
    { name: 'Billing', enabled: true },
    { name: 'View reports', enabled: false },
  ],
  Editor: [
    { name: 'User management', enabled: false },
    { name: 'Project management', enabled: true },
    { name: 'Billing', enabled: false },
    { name: 'View reports', enabled: true },
  ],
  User: [
    { name: 'User management', enabled: false },
    { name: 'Project management', enabled: false },
    { name: 'Billing', enabled: false },
    { name: 'View reports', enabled: true },
  ],
};

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState<string[]>([]);
  const [activeRole, setActiveRole] = useState<string>('');
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setRoles(mockRoles);
    setActiveRole(mockRoles[0]);
    setPermissions(mockPermissions[mockRoles[0]]);
  }, []);

  const handleRoleClick = (role: string) => {
    setActiveRole(role);
    setPermissions(mockPermissions[role]);
  };

  const togglePermission = (index: number) => {
    setPermissions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], enabled: !updated[index].enabled };
      return updated;
    });
  };

  const handleAddPermission = (data: PermissionData) => {
    setPermissions((prev) => [...prev, { name: data.label, enabled: false }]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <aside className="w-1/4 bg-blue-900 text-white p-4 space-y-2">
        {roles.map((role) => (
          <div
            key={role}
            className={`cursor-pointer px-3 py-2 rounded ${
              role === activeRole ? 'bg-white text-blue-900 font-semibold' : 'hover:bg-blue-800'
            }`}
            onClick={() => handleRoleClick(role)}
          >
            {role}
          </div>
        ))}
      </aside>
      <main className="w-3/4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Permissions</h2>
          <ButtonPrimary onClick={() => setIsModalOpen(true)}>Add Permission</ButtonPrimary>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          {permissions.map((perm, idx) => (
            <div key={perm.name} className="flex justify-between items-center py-3 border-b">
              <span>{perm.name}</span>
              <label className="relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  checked={perm.enabled}
                  onChange={() => togglePermission(idx)}
                  className="sr-only peer"
                />
                <div
                  className="w-full h-full bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors"
                ></div>
                <div
                  className="absolute top-[2px] left-[2px] w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-300 peer-checked:translate-x-full"
                ></div>
              </label>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded shadow w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add New Permission</h3>
              <PermissionModal onClose={() => setIsModalOpen(false)} onSave={handleAddPermission} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
