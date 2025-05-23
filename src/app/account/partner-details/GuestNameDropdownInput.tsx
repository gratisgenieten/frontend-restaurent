'use client'

import React, { Fragment, FC, useState } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'
import T from '@/utils/getT'

export interface GuestNameDropdownInputProps {
	className?: string
}

const guestOptions = [
	'John Doe',
	'Anita Sharma',
	'Rahul Verma',
	'Sara Khan',
	'Abhishek Patel',
]

const GuestNameDropdownInput: FC<GuestNameDropdownInputProps> = ({
	className = 'flex-1',
}) => {
	const [selectedGuests, setSelectedGuests] = useState<string[]>([])

	const toggleGuestSelection = (guest: string) => {
		setSelectedGuests((prev) =>
			prev.includes(guest)
				? prev.filter((g) => g !== guest)
				: [...prev, guest]
		)
	}

	const clearGuests = () => {
		setSelectedGuests([])
	}

	return (
		<Popover className={`relative flex ${className}`}>
			{({ open }) => (
				<>
					<div
						className={`flex flex-1 items-center rounded-b-3xl focus:outline-none ${
							open ? 'shadow-lg' : ''
						}`}
					>
						<PopoverButton className="relative z-10 flex flex-1 items-center gap-x-3 p-3 text-start focus:outline-none">
							<div className="text-neutral-300 dark:text-neutral-400">
								<UserPlusIcon className="h-5 w-5 lg:h-7 lg:w-7" />
							</div>
							<div className="flex-grow overflow-hidden">
                            <span className="block font-semibold xl:text-lg">
                                {selectedGuests.length > 0
                                ? `${selectedGuests.length} ${T['HeroSearchForm']['Guests']}`
                                : T['HeroSearchForm']['Guests']}
                            </span>
                            <span className="mt-1 block text-sm font-light leading-none text-neutral-400 truncate max-w-[200px]">
                                {selectedGuests.length > 0
                                ? `Selected: ${selectedGuests.join(', ')}`
                                : T['HeroSearchForm']['Add guests']}
                            </span>
                            </div>

							{selectedGuests.length > 0 && open && (
								<ClearDataButton onClick={clearGuests} />
							)}
						</PopoverButton>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<PopoverPanel className="absolute end-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black ring-opacity-5 dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
							<label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
								Select Guests
							</label>
							<div className="flex flex-col gap-3">
								{guestOptions.map((guest, index) => (
									<label
										key={index}
										className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 dark:text-white"
									>
										<input
											type="checkbox"
											value={guest}
											checked={selectedGuests.includes(guest)}
											onChange={() => toggleGuestSelection(guest)}
											className="accent-blue-500"
										/>
										{guest}
									</label>
								))}
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default GuestNameDropdownInput
