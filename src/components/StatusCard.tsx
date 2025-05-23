'use client';

import React, { FC } from 'react';
import Image from 'next/image';

interface StatusCardProps {
  logo: string;
  title: string;
  subtitle: string;
  value: string;
  valueCaption?: string;
  onClick?: () => void;
  className?: string;
}


const StatusCard: FC<StatusCardProps> = ({
  logo,
  title,
  subtitle,
  value,
  valueCaption = '',
  className = '',
  onClick,
}) => {
  const hasCustomBorder = className?.includes('border-');

const mergedClassName = `flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl ${
  hasCustomBorder ? '' : 'border border-neutral-200 dark:border-neutral-700'
} bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-sm transition hover:shadow-md cursor-pointer ${className}`;

  return (
    <div
      onClick={onClick}
      // className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 cursor-pointer ${className}`}
      className={mergedClassName}
    >
      <div className="flex items-center gap-4">
        {logo && (
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        )}
        <div>
          <div className="text-sm sm:text-base font-semibold text-neutral-800 dark:text-white">
            {title}
          </div>
          <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </div>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <div className="text-base sm:text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          {value}
        </div>
        {valueCaption && (
          <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            {valueCaption}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
