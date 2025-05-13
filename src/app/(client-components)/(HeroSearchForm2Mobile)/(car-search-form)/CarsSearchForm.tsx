'use client'
import converSelectedDateToString from '@/utils/converSelectedDateToString'
import React, { useState } from 'react'
import DatesRangeInput from '../DatesRangeInput'
import LocationInput from '../LocationInput'
import T from '@/utils/getT'

const CarsSearchForm = () => {
	//
	const [fieldNameShow, setFieldNameShow] = useState<
		'locationPickup' | 'locationDropoff' | 'dates'
	>('locationPickup')
	//
	const [locationInputPickUp, setLocationInputPickUp] = useState('')
	const [locationInputDropOff, setLocationInputDropOff] = useState('')

	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/02/06'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/02/23'))

	const [dropOffLocationType, setDropOffLocationType] = useState<
		'same' | 'different'
	>('same')

	const renderInputLocationPickup = () => {
		const isActive = fieldNameShow === 'locationPickup'
		return (
			<div className="w-full rounded-xl bg-white shadow-sm dark:bg-neutral-800">
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('locationPickup')}
					>
						<span className="text-neutral-400">
							{T['HeroSearchForm']['Pick up']}
						</span>
						<span>
							{locationInputPickUp || T['HeroSearchForm']['Location']}
						</span>
					</button>
				) : (
					<LocationInput
						headingText={T['HeroSearchForm']['Pick up'] + '?'}
						defaultValue={locationInputPickUp}
						onChange={(value) => {
							setLocationInputPickUp(value)
							if (dropOffLocationType === 'different') {
								setFieldNameShow('locationDropoff')
							} else {
								setFieldNameShow('dates')
							}
						}}
					/>
				)}
			</div>
		)
	}

	const renderInputLocationDropoff = () => {
		const isActive = fieldNameShow === 'locationDropoff'
		return (
			<div className="w-full rounded-xl bg-white shadow-sm dark:bg-neutral-800">
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('locationDropoff')}
					>
						<span className="text-neutral-400">
							{T['HeroSearchForm']['Drop off']}
						</span>
						<span>
							{locationInputDropOff || T['HeroSearchForm']['Location']}
						</span>
					</button>
				) : (
					<LocationInput
						headingText={T['HeroSearchForm']['Drop off'] + '?'}
						defaultValue={locationInputDropOff}
						onChange={(value) => {
							setLocationInputDropOff(value)
							setFieldNameShow('dates')
						}}
					/>
				)}
			</div>
		)
	}

	const renderInputDates = () => {
		const isActive = fieldNameShow === 'dates'

		return (
			<div className="w-full rounded-xl bg-white shadow-sm dark:bg-neutral-800">
				{!isActive ? (
					<button
						className={`flex w-full justify-between p-4 text-sm font-medium`}
						onClick={() => setFieldNameShow('dates')}
					>
						<span className="text-neutral-400">
							{T['HeroSearchForm']['When']}
						</span>
						<span>
							{startDate
								? converSelectedDateToString([startDate, endDate])
								: T['HeroSearchForm']['Add dates']}
						</span>
					</button>
				) : (
					<DatesRangeInput />
				)}
			</div>
		)
	}

	const renderRadioBtn = () => {
		return (
			<div className="flex items-center justify-center gap-x-2.5">
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

	return (
		<div>
			<div className="w-full space-y-3">
				{renderRadioBtn()}

				{renderInputLocationPickup()}
				{/*  */}
				{dropOffLocationType === 'different' && renderInputLocationDropoff()}
				{/*  */}
				{renderInputDates()}
				{/*  */}
			</div>
		</div>
	)
}

export default CarsSearchForm
