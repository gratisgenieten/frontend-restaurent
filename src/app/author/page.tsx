'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import CarCard from '@/components/CarCard'
import CommentListing from '@/components/CommentListing'
import ExperiencesCard from '@/components/ExperiencesCard'
import StartRating from '@/components/StartRating'
import StayCard from '@/components/StayCard2'
import {
	DEMO_CAR_LISTINGS,
	DEMO_EXPERIENCES_LISTINGS,
	DEMO_STAY_LISTINGS,
} from '@/data/listings'
import React, { FC, Fragment, useState } from 'react'
import Avatar from '@/shared/Avatar'
import ButtonSecondary from '@/shared/ButtonSecondary'
import SocialsList from '@/shared/SocialsList'
import { HomeIcon } from '@heroicons/react/24/outline'
import { Calendar01Icon, Comment01Icon } from '@/components/Icons'
import T from '@/utils/getT'

export interface AuthorPageProps {}

const AuthorPage: FC<AuthorPageProps> = ({}) => {
	let [categories] = useState(['Stays', 'Experiences', 'Car for rent'])

	const renderSidebar = () => {
		return (
			<div className="flex w-full flex-col items-center space-y-6 border-neutral-200 px-0 text-center dark:border-neutral-700 sm:space-y-7 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				<Avatar
					hasChecked
					hasCheckedClass="w-6 h-6 -top-0.5 end-2"
					sizeClass="w-28 h-28"
				/>

				{/* ---- */}
				<div className="flex flex-col items-center space-y-3 text-center">
					<h2 className="text-3xl font-semibold">Kevin Francis</h2>
					<StartRating className="!text-base" />
				</div>

				{/* ---- */}
				<p className="text-neutral-500 dark:text-neutral-400">
					Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
					accommodation, an outdoor.
				</p>

				{/* ---- */}
				<SocialsList
					className="!gap-x-3"
					itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
				/>

				{/* ---- */}
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* ---- */}
				<div className="space-y-4">
					<div className="flex items-center gap-x-4">
						<HomeIcon className="h-6 w-6 text-neutral-400" />
						<span className="text-neutral-600 dark:text-neutral-300">
							Ha Noi, Viet Nam
						</span>
					</div>

					<div className="flex items-center gap-x-4">
						<Comment01Icon className="h-6 w-6 text-neutral-400" />
						<span className="text-neutral-600 dark:text-neutral-300">
							Speaking English
						</span>
					</div>

					<div className="flex items-center gap-x-4">
						<Calendar01Icon className="h-6 w-6 text-neutral-400" />
						<span className="text-neutral-600 dark:text-neutral-300">
							Joined in March 2016
						</span>
					</div>
				</div>
			</div>
		)
	}

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">{`Kevin Francis's listings`}</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{`Kevin Francis's listings is very rich, 5 star reviews help him to be more branded.`}
					</span>
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
											}`}
										>
											{item}
										</button>
									)}
								</Tab>
							))}
						</TabList>
						<TabPanels>
							<TabPanel>
								<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
									{DEMO_STAY_LISTINGS.filter((_, i) => i < 4).map((stay) => (
										<StayCard key={stay.id} data={stay} />
									))}
								</div>
								<div className="mt-14 flex items-center justify-center">
									<ButtonSecondary>
										{T['common']['Show me more']}
									</ButtonSecondary>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
									{DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 4).map(
										(stay) => (
											<ExperiencesCard key={stay.id} data={stay} />
										),
									)}
								</div>
								<div className="mt-14 flex items-center justify-center">
									<ButtonSecondary>
										{T['common']['Show me more']}
									</ButtonSecondary>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-7">
									{DEMO_CAR_LISTINGS.filter((_, i) => i < 4).map((stay) => (
										<CarCard key={stay.id} data={stay} />
									))}
								</div>
								<div className="mt-14 flex items-center justify-center">
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

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">
					{T['common']['Reviews']}
					{` `}
					(23 reviews)
				</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing hasListingTitle className="pb-8" />
					<CommentListing hasListingTitle className="py-8" />
					<CommentListing hasListingTitle className="py-8" />
					<CommentListing hasListingTitle className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="nc-AuthorPage">
			<main className="container mb-24 mt-12 flex flex-col lg:mb-32 lg:flex-row">
				<div className="mb-24 block flex-grow lg:mb-0">
					<div className="lg:sticky lg:top-24">{renderSidebar()}</div>
				</div>
				<div className="w-full flex-shrink-0 space-y-8 lg:w-3/5 lg:space-y-10 lg:ps-10 xl:w-2/3">
					{renderSection1()}
					{renderSection2()}
				</div>
			</main>
		</div>
	)
}

export default AuthorPage
