'use client'

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { PathName } from '@/routers/types'
import Link from 'next/link'
import {
	Backpack01Icon,
	Car01Icon,
	House04Icon,
	RealEstate02Icon,
} from '@/components/Icons'
import T from '@/utils/getT'

interface SolutionItem {
	name: string
	description: string
	href: PathName
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	active?: boolean
}

const solutions: SolutionItem[] = [
	{
		name: T['Header']['DropdownTravelers']['Stays'],
		description: T['Header']['DropdownTravelers']['stayDescription'],
		href: '/listing-stay',
		active: true,
		icon: House04Icon,
	},
	{
		name: T['Header']['DropdownTravelers']['Real Estate'],
		description: T['Header']['DropdownTravelers']['estateDescription'],
		href: '/listing-real-estate',
		icon: RealEstate02Icon,
	},
	{
		name: T['Header']['DropdownTravelers']['Cars'],
		description: T['Header']['DropdownTravelers']['carDescription'],
		href: '/listing-car',
		icon: Car01Icon,
	},
	{
		name: T['Header']['DropdownTravelers']['Experiences'],
		description: T['Header']['DropdownTravelers']['experienceDescription'],
		href: '/listing-experiences',
		icon: Backpack01Icon,
	},
]

export default function DropdownTravelers() {
	return (
		<Popover className="DropdownTravelers relative flex">
			{({ open, close }) => (
				<>
					<PopoverButton
						className={`${open ? '' : 'text-opacity-90'} group h-10 self-center rounded-md py-2 text-sm font-medium hover:text-opacity-100 focus:outline-none sm:h-12 sm:text-base`}
					>
						<div className={`inline-flex items-center`} role="button">
							<span>{T['Header']['DropdownTravelers']['Travelers']}</span>
							<ChevronDownIcon
								className={`${open ? '-rotate-180' : 'text-opacity-70'} ms-2 h-4 w-4 text-neutral-700 group-hover:text-opacity-80 dark:text-neutral-400`}
								aria-hidden="true"
							/>
						</div>
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
						<PopoverPanel className="absolute left-1/2 top-full z-40 w-screen max-w-xs -translate-x-1/2 px-4 sm:px-0">
							<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="relative grid grid-cols-1 gap-7 bg-white p-7 dark:bg-neutral-800">
									{solutions.map((item, index) => (
										<Link
											key={index}
											href={item.href}
											onClick={() => close()}
											className={`-m-3 flex items-center rounded-lg p-2 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
												item.active
													? 'bg-neutral-50 dark:bg-neutral-700'
													: 'hover:bg-neutral-50 dark:hover:bg-neutral-700'
											}`}
										>
											<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-neutral-50 text-primary-500 sm:h-12 sm:w-12">
												<item.icon aria-hidden="true" className="h-7 w-7" />
											</div>
											<div className="ms-4 space-y-0.5">
												<p className="text-sm font-medium">{item.name}</p>
												<p className="line-clamp-1 text-xs text-neutral-500 dark:text-neutral-300">
													{item.description}
												</p>
											</div>
										</Link>
									))}
								</div>
								{/* FOOTER */}
								<div className="bg-neutral-50 p-4 dark:bg-neutral-700">
									<Link
										href="/"
										className="flow-root space-y-0.5 rounded-md px-2 py-2 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
									>
										<span className="flex items-center">
											<span className="text-sm font-medium">
												{`${T['Header']['DropdownTravelers']['footerDoc']}`}
											</span>
										</span>
										<span className="line-clamp-1 text-sm text-gray-500 dark:text-neutral-400">
											{`${T['Header']['DropdownTravelers']['footerDescription']}`}
										</span>
									</Link>
								</div>
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}
