import React, { useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

interface AssignPermissionsModalProps {
  permissions: string[];
  assignedPermissions: string[];
  onClose: () => void;
  onSave: (updatedPermissions: string[]) => void;
}

const AssignPermissionsModal: React.FC<AssignPermissionsModalProps> = ({
  permissions,
  assignedPermissions,
  onClose,
  onSave,
}) => {
  const [selected, setSelected] = useState<string[]>(assignedPermissions);

  const togglePermission = (permission: string) => {
    setSelected((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
    onClose();
  };


  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
        {permissions.map((perm) => (
          <label
            key={perm}
            className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded"
          >
            <input
              type="checkbox"
              checked={selected.includes(perm)}
              onChange={() => togglePermission(perm)}
            />
            <span className="text-sm">{perm}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default AssignPermissionsModal;
