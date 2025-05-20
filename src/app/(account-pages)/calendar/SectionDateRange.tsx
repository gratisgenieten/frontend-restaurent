'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'

// Sample data for tooltips - replace with your actual data
const bookingData = {
	'2023-02-07': { checkedIn: 5, reservations: 8, cancelled: 0 },
	'2023-02-08': { checkedIn: 3, reservations: 4, cancelled: 1 },
	'2023-02-10': { checkedIn: 7, reservations: 12, cancelled: 2 },
	'2023-02-14': { checkedIn: 10, reservations: 15, cancelled: 0 },
	'2023-02-15': { checkedIn: 8, reservations: 9, cancelled: 1 },
	'2023-02-18': { checkedIn: 6, reservations: 7, cancelled: 0 },
	'2023-02-21': { checkedIn: 4, reservations: 5, cancelled: 3 },
}

// Enhanced version of your existing DatePickerCustomDay that adds tooltips
// Interface for booking data structure
interface BookingData {
	checkedIn: number;
	reservations: number;
	cancelled: number;
}

// Interface for the component props
interface EnhancedDatePickerCustomDayProps {
	dayOfMonth: number;
	date: Date | any;
}



const EnhancedDatePickerCustomDay: React.FC<EnhancedDatePickerCustomDayProps> = (props) => {
	const { dayOfMonth, date } = props
	 const router = useRouter()
	const [showTooltip, setShowTooltip] = useState<boolean>(false)

	// Convert date to format used in bookingData
	const formattedDate: string = date.toISOString().split('T')[0]
	const dateData: BookingData | undefined = bookingData[formattedDate as keyof typeof bookingData]

	const handleClick = () => {
		router.push(`/reservations`)
	}

	return (
		<div
			className="relative"
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
			onClick={handleClick}
		>
			{/* Your original DatePickerCustomDay component */}
			<DatePickerCustomDay dayOfMonth={dayOfMonth} date={date} />

			{/* Tooltip only shows if we have data and mouse is hovering */}
			{showTooltip && dateData && (
				<div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-md p-2 text-xs w-48 pointer-events-none">
					<div className="font-medium text-center border-b pb-1 mb-1">
						{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
					</div>
					<div>
						<div className="flex justify-between">
							<span>Checked In:</span>
							<span>{dateData.checkedIn}</span>
						</div>
						<div className="flex justify-between">
							<span>Reservations:</span>
							<span>{dateData.reservations}</span>
						</div>
						<div className="flex justify-between">
							<span>Cancelled:</span>
							<span>{dateData.cancelled}</span>
						</div>
					</div>
					{/* Arrow */}
					<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b"></div>
				</div>
			)}
		</div>
	)
}

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
							<EnhancedDatePickerCustomDay dayOfMonth={day} date={date} />
						)}
					/>
				</div>
			</div>
		)
	}

	return renderSectionCheckIndate()
}

export default SectionDateRange