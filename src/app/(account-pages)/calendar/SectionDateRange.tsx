'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'

const SectionDateRange = () => {
	const [startDate, setStartDate] = useState<Date | null>(
		new Date('2023/02/06'),
	)
	const [endDate, setEndDate] = useState<Date | null>(new Date('2023/02/23'))
	const onChangeDate = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates
		setStartDate(start)
		setEndDate(end)
	}

	const renderSectionCheckIndate = () => {
		return (
			<div className="listingSection__wrap overflow-hidden">
				<div className="">
					<DatePicker
						selected={startDate}
						onChange={onChangeDate}
						startDate={startDate}
						endDate={endDate}
						selectsRange
						monthsShown={2}
						showPopperArrow={false}
						inline
						renderCustomHeader={(p) => (
							<DatePickerCustomHeaderTwoMonth {...p} />
						)}
						renderDayContents={(day, date) => (
							<DatePickerCustomDay dayOfMonth={day} date={date} />
						)}
					/>
				</div>
			</div>
		)
	}

	return renderSectionCheckIndate()
}

export default SectionDateRange
