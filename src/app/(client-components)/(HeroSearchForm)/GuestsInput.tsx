'use client';

import React, { FC, useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import ButtonSubmit from './ButtonSubmit';
import { PathName } from '@/routers/types';
import T from '@/utils/getT';

export interface GuestsInputProps {
	fieldClassName?: string;
	className?: string;
	buttonSubmitHref?: PathName;
	hasButtonSubmit?: boolean;
}

const GuestsInput: FC<GuestsInputProps> = ({
	fieldClassName = 'nc-hero-field-padding',
	className = 'nc-flex-1',
	buttonSubmitHref = '/listing-stay-map',
	hasButtonSubmit = true,
}) => {
	const [guestCount, setGuestCount] = useState(1);

	const handleIncrease = (e:any) => {		
		e.stopPropagation();
		if (guestCount < 10) setGuestCount(guestCount + 1);
	};

	const handleDecrease = (e:any) => {
		e.stopPropagation();
		if (guestCount > 1) setGuestCount(guestCount - 1);
	};

	return (
		<div className={`relative flex items-center justify-between ${className}`}>
			<div
				className={`flex items-center justify-between w-full rounded-full bg-white dark:bg-neutral-800 px-4 py-3 focus:shadow-lg focus:border focus:border-neutral-200 dark:border-neutral-700 ${fieldClassName}`}
			>
				<div className="flex items-center gap-3">
					<UserPlusIcon className="w-7 h-7 text-neutral-500 dark:text-neutral-300" />
					<div className="flex flex-col min-w-[100px]">
						<span className="text-lg text-nowrap font-semibold text-neutral-900 dark:text-white">
							{guestCount} Guest{guestCount > 1 ? 's' : ''}
						</span>
						<span className="text-md text-neutral-500">{T['HeroSearchForm']['Guests']}</span>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={handleDecrease}
						className="w-8 h-8 rounded-full text-xl flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white"
					>
						−
					</button>
					<span className="text-base font-medium w-4 text-center text-neutral-800 dark:text-white">
						{guestCount}
					</span>
					<button
						type="button"
						onClick={handleIncrease}
						className="w-8 h-8 rounded-full text-xl flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white"
					>
						+
					</button>
				</div>
			</div>
			<div className=" mr-4">
				<ButtonSubmit href={buttonSubmitHref} />
			</div>

		</div>
	);
};

export default GuestsInput;
