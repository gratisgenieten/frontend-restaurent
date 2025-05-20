'use client';

import React, { FC } from 'react';
import TabFilters from './TabFilters';
import Heading2 from '@/shared/Heading2';
import FlightCard, { FlightCardProps } from '@/components/FlightCard';
import ButtonPrimary from '@/shared/ButtonPrimary';
import T from '@/utils/getT';
import StatusCard from '@/components/StatusCard';

export interface SectionGridFilterCardProps {
	className?: string;
}

const cashbackData = [
	{
		amount: 5.0,
		type: 'affiliate_earn',
		status: 'confirmed',
		description: 'Cashback from MediaMarkt',
		userId: 101,
	},
	{
		amount: 2.5,
		type: 'affiliate_earn',
		status: 'pending',
		description: 'Cashback from Coolblue',
		userId: 101,
	},
	{
		amount: 3.8,
		type: 'wallet_spend',
		status: 'confirmed',
		description: 'Wallet used on Essent',
		userId: 101,
	},
];

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
	className = '',
}) => {
	return (
		<div className={`nc-SectionGridFilterCard ${className}`}>
			<Heading2
				heading="Singapore - Tokyo"
				subHeading={
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						22 flights
						<span className="mx-2">·</span>
						round trip
						<span className="mx-2">·</span>2 Guests
					</span>
				}
			/>
			<div className="mb-8 lg:mb-11">
				<TabFilters />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 rounded-3xl lg:bg-neutral-50 lg:p-10 lg:dark:bg-black/20">
				{/* Integrated cashback status cards */}
				{cashbackData.map((txn, index) => (

					<StatusCard
						logo=""
						title={`€${txn.amount}`}
						subtitle={`${txn.type} · ${txn.status}`}
						value={txn.description}
						valueCaption={`User ID: 23`}
						key={index}
					/>
				))}

				{/* Show more button */}
				<div className="col-span-full mt-12 flex items-center justify-center">
					<ButtonPrimary loading>{T['common']['Show me more']}</ButtonPrimary>
				</div>
			</div>
		</div>
	);
};

export default SectionGridFilterCard;
