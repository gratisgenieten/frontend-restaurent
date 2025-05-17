"use client";

import React, { useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import NcModal from "@/shared/NcModal";
import StatusCard from "@/components/StatusCard";
import PermissionModal, { PermissionData } from "./model/PermissionModal";

const initialPermissions: PermissionData[] = [
  { permission_id: 1, code: "deals.create", label: "Create Deals" },
  { permission_id: 2, code: "users.manage", label: "Manage Users" },
  { permission_id: 3, code: "reports.view", label: "View Reports" },
];

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<PermissionData[]>(initialPermissions);
  const [editingPermission, setEditingPermission] = useState<PermissionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSavePermission = (updated: PermissionData) => {
    if (updated.permission_id) {
      setPermissions((prev) =>
        prev.map((p) => (p.permission_id === updated.permission_id ? updated : p))
      );
    } else {
      setPermissions((prev) => [
        ...prev,
        {
          ...updated,
          permission_id: Math.floor(Math.random() * 100000),
        },
      ]);
    }
    setEditingPermission(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container min-h-screen mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Permissions</h2>
        <ButtonPrimary onClick={() => setIsModalOpen(true)}>+ Add Permission</ButtonPrimary>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {permissions?.map((perm) => (
          <NcModal
            key={perm.permission_id}
            modalTitle={`Edit Permission`}
            contentExtraClass="max-w-md"
            isOpenProp={editingPermission?.permission_id === perm.permission_id}
            onCloseModal={() => setEditingPermission(null)}
            renderTrigger={(openModal) => (
              <StatusCard
                logo=""
                title={perm.label}
                subtitle={`Code: ${perm.code}`}
                value={`ID: ${perm.permission_id}`}
                valueCaption=""
                onClick={() => {
                  setEditingPermission(perm);
                  openModal();
                }}
              />
            )}
            renderContent={() => (
              <PermissionModal
                initialData={editingPermission as PermissionData}
                onClose={() => setEditingPermission(null)}
                onSave={handleSavePermission}
              />
            )}
          />
        ))}
      </div>
        {isModalOpen ? (<>
        
            <NcModal
                modalTitle="Add New Permission"
                contentExtraClass="max-w-md"
                isOpenProp={isModalOpen}
                onCloseModal={() => setIsModalOpen(false)}
                renderContent={() => (
                <PermissionModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSavePermission}
                />
                )}
            />
        </>)  : null}
    </div>
  );
};

export default PermissionsPage;
