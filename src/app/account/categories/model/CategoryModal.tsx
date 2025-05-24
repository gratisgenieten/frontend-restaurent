
'use client';

import React from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface StatusData {
  id?: number;
  entity_type: string;
  code: string;
  label: string;
  color_hex: string;
  sort_order: number;
}

interface StatusModalProps {
  onClose: () => void;
  onSave: (data: StatusData) => void;
  initialData?: StatusData;
  apiErrors?: Record<string, string[]>;
}

const statusSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  code: z.string().min(1, 'Code is required'),
  color_hex: z.string().regex(/^#([0-9A-Fa-f]{6})$/, 'Invalid hex color'),
  sort_order: z
    .number({ invalid_type_error: 'Sort Order must be a number' })
    .min(0, 'Sort order must be 0 or higher'),
});

type StatusFormFields = z.infer<typeof statusSchema>;

const StatusModal: React.FC<any> = ({ onClose, onSave, initialData, apiErrors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StatusFormFields>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      label: initialData?.label || '',
      code: initialData?.code || '',
      color_hex: initialData?.color_hex || '#32caff',
      sort_order: initialData?.sort_order || 0,
    },
  });

  const onSubmit = (data: StatusFormFields) => {
    const fullData: any = {
      ...initialData,
      ...data,
    };
    onSave(fullData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-100">
          Status Details
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Label */}
          <div>
            <input
              type="text"
              {...register('label')}
              placeholder="Label (e.g., Active)"
              className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
            />
            {errors.label && <p className="text-xs text-red-500 mt-1">{errors.label.message}</p>}
            {apiErrors?.label && (
              <p className="text-xs text-red-500 mt-1">{apiErrors.label[0]}</p>
            )}
          </div>

          {/* Code */}
          <div>
            <input
              type="text"
              {...register('code')}
              placeholder="Code (e.g., active)"
              className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
            />
            {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code.message}</p>}
            {apiErrors?.code && <p className="text-xs text-red-500 mt-1">{apiErrors.code[0]}</p>}
          </div>

          {/* Color */}
          <div>
            <input
              type="color"
              {...register('color_hex')}
              className="w-full h-10"
            />
            {errors.color_hex && (
              <p className="text-xs text-red-500 mt-1">{errors.color_hex.message}</p>
            )}
          </div>

          {/* Sort Order */}
          <div>
            <input
              type="number"
              {...register('sort_order', { valueAsNumber: true })}
              placeholder="Sort Order"
              className="w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
            />
            {errors.sort_order && (
              <p className="text-xs text-red-500 mt-1">{errors.sort_order.message}</p>
            )}
          </div>
        </div>
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

export default StatusModal;
