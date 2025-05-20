'use client'

import React, { Fragment, useState, FC } from 'react'
import { nl } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker'
registerLocale('nl', nl)
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import T from '@/utils/getT'

export interface StayDatesSingleInputProps {
	className?: string
}

const StayDatesSingleInput: FC<StayDatesSingleInputProps> = ({
	className = 'flex-1',
}) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

	const onChangeDate = (date: Date | null) => {
		setSelectedDate(date)
	}

	const renderInput = () => (
		<>
			<div className="text-neutral-300 dark:text-neutral-400">
				<CalendarIcon className="h-5 w-5 lg:h-7 lg:w-7" />
			</div>
			<div className="flex-grow text-start">
				<span className="block font-semibold xl:text-lg">
					{selectedDate
						? selectedDate.toLocaleDateString('nl-NL', {
							month: 'long',
							day: '2-digit',
						})
						: 'Add date'}
				</span>
				<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
					{T['HeroSearchForm']['CheckIn']}
				</span>
			</div>
		</>
	)

	return (
		<Popover className={`StayDatesSingleInput relative z-10 flex ${className}`}>
			{({ open }) => (
				<>
					<PopoverButton
						className={`relative flex flex-1 items-center gap-x-3 p-3 focus:outline-none ${open ? 'shadow-lg' : ''
							}`}
					>
						{renderInput()}
						{selectedDate && open && (
							<ClearDataButton onClick={() => onChangeDate(null)} />
						)}
					</PopoverButton>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<PopoverPanel className="absolute end-0 start-auto top-full z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl xl:-end-10">
							<div className="overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-neutral-800">
								<DatePicker
									selected={selectedDate}
									onChange={onChangeDate}
									monthsShown={2}
									showPopperArrow={false}
									inline
									locale={nl}
									renderCustomHeader={(p) => (
										<DatePickerCustomHeaderTwoMonth {...p} />
									)}
									renderDayContents={(day, date) => (
										<DatePickerCustomDay dayOfMonth={day} date={date} />
									)}
								/>
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default StayDatesSingleInput
