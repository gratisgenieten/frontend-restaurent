'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import { showSuccessToast, showErrorToast } from '@/lib/toast';
import { signUpPartner } from '@/hooks/apis/useAuth';

// ✅ Zod Schema
const PartnerSchema = z.object({
  user_id: z.number().min(1, 'User ID is required'),
  name: z.string().min(1, 'Partner name is required'),
  description: z.string().optional(),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_email: z.string().email('Valid email required'),
  contact_phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  payout_iban: z.string().min(1, 'IBAN is required'),
  category_id: z.number().min(1, 'Category ID is required'),
  status_id: z.number().min(1, 'Status ID is required'),
});
export type PartnerData = z.infer<typeof PartnerSchema>;

interface PartnerModalProps {
  onClose: () => void;
  onSave?: (data: PartnerData) => void;
  initialData?: PartnerData;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ onClose, initialData }) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PartnerData>({
    resolver: zodResolver(PartnerSchema),
    defaultValues: initialData || {
      user_id: 0,
      name: '',
      description: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      address: '',
      city: '',
      postal_code: '',
      payout_iban: '',
      category_id: 0,
      status_id: 0,
    },
  });

 const onSubmit = async (data: PartnerData) => {
    setIsLoading(true);
    try {
      await signUpPartner(data); // ✅ Don't wrap inside {data}
      showSuccessToast('✅ Partner successfully registered');
      onClose();
    } catch (error: any) {
      const msg = error?.message || '❌ Partner registration failed';
      showErrorToast(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input type="number" placeholder="User ID" {...register('user_id', { valueAsNumber: true })} />
          {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id.message}</p>}
        </div>

        <div>
          <Input placeholder="Partner Name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Input placeholder="Contact Name" {...register('contact_name')} />
          {errors.contact_name && <p className="text-red-500 text-sm">{errors.contact_name.message}</p>}
        </div>

        <div>
          <Input placeholder="Contact Email" {...register('contact_email')} />
          {errors.contact_email && <p className="text-red-500 text-sm">{errors.contact_email.message}</p>}
        </div>

        <div>
          <Input placeholder="Contact Phone" {...register('contact_phone')} />
          {errors.contact_phone && <p className="text-red-500 text-sm">{errors.contact_phone.message}</p>}
        </div>

        <div>
          <Input placeholder="Address" {...register('address')} />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div>
          <Input placeholder="City" {...register('city')} />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>

        <div>
          <Input placeholder="Postal Code" {...register('postal_code')} />
          {errors.postal_code && <p className="text-red-500 text-sm">{errors.postal_code.message}</p>}
        </div>

        <div>
          <Input placeholder="Payout IBAN" {...register('payout_iban')} />
          {errors.payout_iban && <p className="text-red-500 text-sm">{errors.payout_iban.message}</p>}
        </div>

        <div>
          <Input type="number" placeholder="Category ID" {...register('category_id', { valueAsNumber: true })} />
          {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id.message}</p>}
        </div>

        <div>
          <Input type="number" placeholder="Status ID" {...register('status_id', { valueAsNumber: true })} />
          {errors.status_id && <p className="text-red-500 text-sm">{errors.status_id.message}</p>}
        </div>
      </div>

      <label className="block">
        <span className="text-neutral-700 dark:text-neutral-300">Description</span>
        <textarea
          {...register('description')}
          placeholder="Description"
          rows={3}
          className="mt-1 w-full rounded border px-3 py-2 text-sm dark:bg-neutral-800 dark:text-white"
        />
      </label>

      <div className="flex justify-end gap-3">
        <ButtonSecondary type="button" onClick={onClose}>
          Cancel
        </ButtonSecondary>
       <ButtonPrimary type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </div>
          ) : (
            'Save'
          )}
        </ButtonPrimary>  
      </div>
    </form>
  );
};

export default PartnerModal;
