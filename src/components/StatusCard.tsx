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
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 cursor-pointer` + className}
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        {logo.length > 0 && <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full" />}
        <div>
          <div className="text-base font-semibold text-neutral-800 dark:text-white">
            {title}
          </div>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </div>
        </div>
      </div>

      {/* Value */}
      <div className="text-right">
        <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          {value}
        </div>
        {valueCaption && (
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {valueCaption}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
