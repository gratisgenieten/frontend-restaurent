import React, { useState } from 'react';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';

interface AddRoleModalProps {
  onClose: () => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !label.trim()) {
      alert('Please fill in both fields.');
      return;
    }

    console.log('Creating role:', { name, label });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200 mb-1 block">
          Role Name
        </span>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. admin"
          required
        />
      </label>

      <label className="block">
        <span className="text-neutral-800 dark:text-neutral-200 mb-1 block">
          Label
        </span>
        <Input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Administrator"
          required
        />
      </label>

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
    </form>
  );
};

export default AddRoleModal;
