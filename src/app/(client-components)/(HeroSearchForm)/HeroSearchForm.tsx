'use client'

import React, { FC, useState } from 'react'
import StaySearchForm from './(stay-search-form)/StaySearchForm'
import ExperiencesSearchForm from './(experiences-search-form)/ExperiencesSearchForm'
import RentalCarSearchForm from './(car-search-form)/RentalCarSearchForm'
import FlightSearchForm from './(flight-search-form)/FlightSearchForm'

export type SearchTab = 'Stays' | 'Experiences' | 'Cars' | 'Flights'

export interface HeroSearchFormProps {
	className?: string
	currentTab?: SearchTab
	currentPage?: 'Stays' | 'Experiences' | 'Cars' | 'Flights'
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
	className = '',
	currentTab = 'Stays',
	currentPage,
}) => {
	const tabs: SearchTab[] = ['Stays', 'Experiences', 'Cars', 'Flights']
	const [tabActive, setTabActive] = useState<SearchTab>(currentTab)

	const renderTab = () => {
		return (
			<ul className="hiddenScrollbar ms-2 flex gap-x-5 overflow-x-auto sm:ms-6 sm:gap-x-8 md:ms-12 lg:gap-x-11">
				{tabs.map((tab) => {
					const active = tab === tabActive
					return (
						<li
							// onClick={() => setTabActive(tab)}
							onClick={() => setTabActive('Flights')}
							className={`flex flex-shrink-0 cursor-pointer items-center text-sm font-medium lg:text-base ${
								active
									? ''
									: 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400'
							} `}
							key={tab}
						>
							{active && (
								<span className="me-2 block h-2.5 w-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100" />
							)}
							<span>{tab}</span>
						</li>
					)
				})}
			</ul>
		)
	}

	const renderForm = () => {
		switch (tabActive) {
			case 'Stays':
				return <StaySearchForm />
			case 'Experiences':
				return <ExperiencesSearchForm />
			case 'Cars':
				return <RentalCarSearchForm />
			case 'Flights':
				return <FlightSearchForm />

			default:
				return null
		}
	}

	return (
		<div
			className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
		>
			{/* {renderTab()} */}
			{renderForm()}
		</div>
	)
}

export default HeroSearchForm
