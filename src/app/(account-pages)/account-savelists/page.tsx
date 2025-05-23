'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import CarCard from '@/components/CarCard'
import ExperiencesCard from '@/components/ExperiencesCard'
import StayCard from '@/components/StayCard'
import {
	DEMO_CAR_LISTINGS,
	DEMO_EXPERIENCES_LISTINGS,
	DEMO_STAY_LISTINGS,
} from '@/data/listings'
import React, { Fragment, useState } from 'react'
import ButtonSecondary from '@/shared/ButtonSecondary'
import T from '@/utils/getT'

const AccountSavelists = () => {
	let [categories] = useState(['Stays', 'Experiences', 'Cars'])

	const renderSection1 = () => {
		return (
			<div className="space-y-6 sm:space-y-8">
				<div>
					<h2 className="text-3xl font-semibold">
						{T['accountPage']['Saved listings']}
					</h2>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				<div>
					<TabGroup>
						<TabList className="flex gap-x-1 overflow-x-auto">
							{categories.map((item) => (
								<Tab key={item} as={Fragment}>
									{({ selected }) => (
										<button
											className={`block flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-medium capitalize !leading-none focus:outline-none sm:px-6 sm:py-3 sm:text-base ${
												selected
													? 'bg-secondary-900 text-secondary-50'
													: 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
											} `}
										>
											{item}
										</button>
									)}
								</Tab>
							))}
						</TabList>
						<TabPanels>
							<TabPanel className="mt-8">
								<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
									{DEMO_STAY_LISTINGS.filter((_, i) => i < 8).map((stay) => (
										<StayCard key={stay.id} data={stay} />
									))}
								</div>
								<div className="mt-11 flex items-center justify-center">
									<ButtonSecondary>
										{T['common']['Show me more']}
									</ButtonSecondary>
								</div>
							</TabPanel>
							<TabPanel className="mt-8">
								<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
									{DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 8).map(
										(stay) => (
											<ExperiencesCard key={stay.id} data={stay} />
										),
									)}
								</div>
								<div className="mt-11 flex items-center justify-center">
									<ButtonSecondary>
										{T['common']['Show me more']}
									</ButtonSecondary>
								</div>
							</TabPanel>
							<TabPanel className="mt-8">
								<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
									{DEMO_CAR_LISTINGS.filter((_, i) => i < 8).map((stay) => (
										<CarCard key={stay.id} data={stay} />
									))}
								</div>
								<div className="mt-11 flex items-center justify-center">
									<ButtonSecondary>
										{T['common']['Show me more']}
									</ButtonSecondary>
								</div>
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
		)
	}

	return renderSection1()
}

export default AccountSavelists
