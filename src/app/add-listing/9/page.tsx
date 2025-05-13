'use client'

import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import NcInputNumber from '@/components/NcInputNumber'
import T from '@/utils/getT'
import React, { FC, useState } from 'react'
import DatePicker from 'react-datepicker'

const PageAddListing9 = () => {
	const [dates, setDates] = useState<number[]>([
		new Date('2023/02/06').getTime(),
		new Date('2023/02/09').getTime(),
		new Date('2023/02/15').getTime(),
	])

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					{T['addListings']['page9']['pageTitle']}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{T['addListings']['page9']['pageDescription']}
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-7">
				{/* ITEM */}
				<NcInputNumber label="Nights min" defaultValue={1} />
				<NcInputNumber label="Nights max" defaultValue={99} />
			</div>

			{/*  */}
			<div>
				<h2 className="text-2xl font-semibold">
					{T['addListings']['page9']['availability']}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{T['addListings']['page9']['availabilityDescription']}
				</span>
			</div>

			<div className="addListingDatePickerExclude">
				<DatePicker
					onChange={(date) => {
						let newDates = []

						if (!date) {
							return
						}
						const newTime = date.getTime()
						if (dates.includes(newTime)) {
							newDates = dates.filter((item) => item !== newTime)
						} else {
							newDates = [...dates, newTime]
						}
						setDates(newDates)
					}}
					// selected={startDate}
					monthsShown={2}
					showPopperArrow={false}
					excludeDates={dates.filter(Boolean).map((item) => new Date(item))}
					inline
					renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
					renderDayContents={(day, date) => (
						<DatePickerCustomDay dayOfMonth={day} date={date} />
					)}
				/>
			</div>
		</>
	)
}

export default PageAddListing9
