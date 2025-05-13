'use client'

import React, { FC, useState } from 'react'
import LocationInput from '../LocationInput'
import RentalCarDatesRangeInput from './RentalCarDatesRangeInput'
import T from '@/utils/getT'

export interface RentalCarSearchFormProps {}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({}) => {
	const [dropOffLocationType, setDropOffLocationType] = useState<
		'same' | 'different'
	>('different')

	const renderRadioBtn = () => {
		return (
			<div className="flex items-center justify-center gap-x-3 pb-3">
				<div
					className={`flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium ${
						dropOffLocationType === 'same'
							? 'bg-black text-white shadow-lg shadow-black/10'
							: 'border border-neutral-300 dark:border-neutral-700'
					}`}
					onClick={(e) => setDropOffLocationType('same')}
				>
					{T['HeroSearchForm']['Same drop off']}
				</div>
				<div
					className={`flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium ${
						dropOffLocationType === 'different'
							? 'bg-black text-white shadow-lg shadow-black/10'
							: 'border border-neutral-300 dark:border-neutral-700'
					}`}
					onClick={(e) => setDropOffLocationType('different')}
				>
					{T['HeroSearchForm']['Different drop off']}
				</div>
			</div>
		)
	}

	const renderForm = () => {
		return (
			<form className="relative w-full">
				{renderRadioBtn()}
				<div className="flex w-full flex-row rounded-full border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
					<LocationInput
						placeHolder={T['HeroSearchForm']['City or Airport']}
						desc={T['HeroSearchForm']['Pick up location']}
						className="flex-1"
					/>
					{dropOffLocationType === 'different' && (
						<>
							<div className="h-8 self-center border-e border-slate-200 dark:border-slate-700"></div>
							<LocationInput
								placeHolder={T['HeroSearchForm']['City or Airport']}
								desc={T['HeroSearchForm']['Drop off location']}
								className="flex-1"
								divHideVerticalLineClass="-inset-x-0.5"
							/>
						</>
					)}
					<div className="h-8 self-center border-e border-slate-200 dark:border-slate-700"></div>
					<RentalCarDatesRangeInput className="flex-1" />
				</div>
			</form>
		)
	}

	return renderForm()
}

export default RentalCarSearchForm
