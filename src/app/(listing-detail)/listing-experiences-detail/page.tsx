'use client'

import React, { FC } from 'react'
import {
	ArrowRightIcon,
	CheckCircleIcon,
	ClockIcon,
	LanguageIcon,
	MapPinIcon,
	Squares2X2Icon,
	UsersIcon,
} from '@heroicons/react/24/outline'
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import { usePathname, useRouter } from 'next/navigation'
import LikeSaveBtns from '@/components/LikeSaveBtns'
import StartRating from '@/components/StartRating'
import { includes_demo, PHOTOS } from './constant'
import Image from 'next/image'
import StayDatesRangeInput from './StayDatesRangeInput'
import GuestsInput from './GuestsInput'
import SectionDateRange from '../SectionDateRange'
import { Route } from 'next'
import T from '@/utils/getT'
import { Calendar01Icon, Comment01Icon, Timer02Icon } from '@/components/Icons'

export interface ListingExperiencesDetailPageProps {}

const ListingExperiencesDetailPage: FC<
	ListingExperiencesDetailPageProps
> = ({}) => {
	const thisPathname = usePathname()
	const router = useRouter()

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex items-center justify-between">
					<Badge color="pink" name="Specific Tour" />
					<LikeSaveBtns />
				</div>

				{/* 2 */}
				<h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
					Trang An Boat Tour & Mua Cave
				</h2>

				{/* 3 */}
				<div className="flex items-center gap-x-4">
					<StartRating />
					<span>·</span>
					<div className="flex items-center">
						<MapPinIcon className="h-5 w-5" />
						<span className="ms-1"> Tokyo, Jappan</span>
					</div>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<span className="ms-2.5 text-neutral-500 dark:text-neutral-400">
						{T['common']['Hosted by']}{' '}
						<span className="font-medium text-neutral-900 dark:text-neutral-200">
							Kevin Francis
						</span>
					</span>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between gap-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:gap-x-12">
					<div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:gap-x-3 sm:space-y-0 sm:text-start">
						<ClockIcon className="h-6 w-6" />
						<span>3.5 hours</span>
					</div>
					<div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:gap-x-3 sm:space-y-0 sm:text-start">
						<UsersIcon className="h-6 w-6" />
						<span>Up to 10 people</span>
					</div>
					<div className="flex flex-col items-center space-y-3 text-center sm:flex-row sm:gap-x-3 sm:space-y-0 sm:text-start">
						<LanguageIcon className="h-6 w-6" />
						<span>English, VietNames</span>
					</div>
				</div>
			</div>
		)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-2xl font-semibold">Experiences descriptions</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-600 dark:text-neutral-300">
					<p>
						TRANG AN BOAT TOUR & MUA CAVE CLIMBING TOUR FROM HANOI
						<br />
						<br />
						07:30 – 08:00 – Our guide will meet you at your hotel/stay and start
						a 120km comfortable Limousine bus journey through the verdant
						landscape. Stopover for a rest on the way.
						<br />
						<br />
						BAI DINH PAGODA EXPLORER.
						<br />
						<br />
						10:30 – Arrive Bai Dinh pagoda complex, get on electric cars to
						visit massive architecture.
						<br />
						<br />
						12:15 – Enjoy the buffet lunch at our restaurant, a great place to
						savor the flavours of Vietnamese food.
						<br />
						<br />
						TRANG AN TOUR ON BOAT.
						<br />
						<br />
						13:30 – Visit Trang An Grottoes, get on a rowing boat traveling
						along the river with scenic mountain and green fields landscape.
						<br />
						<br />
						MUA CAVE HIKING. TAKE PICTURE
						<br />
						<br />
						15:45 – Arrive at Mua Cave and start an amazing trek up to the top
						of Ngoa Long mountain.
						<br />
						<br />
						17:30 – 20:00 – Return to our Limousine bus and then come back to
						Hanoi. Drop you off at your hotel/stay. Other things to note
						<br />
						<br />
						It is one full day tour. Start from 07.30 AM and finish at 20.00. We
						just put one hour and default departure time because we have many
						other tours. IF you need any further details
					</p>
				</div>
			</div>
		)
	}

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-2xl font-semibold">Include </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						Included in the price
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 lg:grid-cols-2">
					{includes_demo
						.filter((_, i) => i < 12)
						.map((item) => (
							<div key={item.name} className="flex items-center gap-x-3">
								<CheckCircleIcon className="mt-px h-6 w-6 flex-shrink-0" />
								<span>{item.name}</span>
							</div>
						))}
				</div>
			</div>
		)
	}

	const renderSection5 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Host Information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center gap-x-4">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 start-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">
							Kevin Francis
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<span> 12 places</span>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-600 dark:text-neutral-300">
					Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
					accommodation, an outdoor swimming pool, a bar, a shared lounge, a
					garden and barbecue facilities...
				</span>

				{/* info */}
				<div className="block space-y-2.5 text-neutral-500 dark:text-neutral-400">
					<div className="flex items-center gap-x-3">
						<Calendar01Icon className="h-6 w-6" />
						<span>Joined in March 2016</span>
					</div>
					<div className="flex items-center gap-x-3">
						<Comment01Icon className="h-6 w-6" />
						<span>Response rate - 100%</span>
					</div>
					<div className="flex items-center gap-x-3">
						<Timer02Icon className="h-6 w-6" />

						<span>Fast response - within a few hours</span>
					</div>
				</div>

				{/* == */}
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/author">
						{T['common']['See host profile']}
					</ButtonSecondary>
				</div>
			</div>
		)
	}

	const renderSection6 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">
					{T['common']['Reviews']}
					(23 reviews)
				</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="gap-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute end-2 top-1/2 -translate-y-1/2"
							size="w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}

	const renderSection7 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Location</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						San Diego, CA, United States of America (SAN-San Diego Intl.)
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
					<div className="z-0 overflow-hidden rounded-xl">
						<iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
						></iframe>
					</div>
				</div>
			</div>
		)
	}

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Cancellation policy</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						Any experience can be canceled and fully refunded within 24 hours of
						purchase, or at least 7 days before the experience starts.
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Guest requirements</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						Up to 10 guests ages 4 and up can attend. Parents may also bring
						children under 2 years of age.
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">What to bring</h4>
					<div className="prose sm:prose">
						<ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
							<li>
								Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
							</li>
							<li>We will pick up from 07.30 to 08.00 AM</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}

	const renderSidebar = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">
				{/* PRICE */}
				<div className="flex justify-between">
					<span className="text-3xl font-semibold">
						$19
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/{T['common']['person']}
						</span>
					</span>
					<StartRating />
				</div>

				{/* FORM */}
				{/* FORM */}
				<form className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-700">
					<StayDatesRangeInput className="z-[11] flex-1" />
					<div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
					<GuestsInput className="flex-1" />
				</form>

				{/* SUM */}
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>$19 x 3 adults</span>
						<span>$57</span>
					</div>
					<div className="flex justify-between text-neutral-600 dark:text-neutral-300">
						<span>Service charge</span>
						<span>$0</span>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					<div className="flex justify-between font-semibold">
						<span>Total</span>
						<span>$199</span>
					</div>
				</div>

				{/* SUBMIT */}
				<ButtonPrimary href={'/checkout'}>
					{T['common']['Reserve']}
				</ButtonPrimary>
			</div>
		)
	}

	return (
		<div className="nc-ListingExperiencesDetailPage">
			{/* SINGLE HEADER */}
			<header className="rounded-md sm:rounded-xl">
				<div className="relative grid grid-cols-4 gap-1 sm:gap-2">
					<div
						className="relative col-span-3 row-span-3 cursor-pointer overflow-hidden rounded-md sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							alt="photo 1"
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={PHOTOS[0]}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{PHOTOS.filter((_, i) => i >= 1 && i < 4).map((item, index) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md sm:rounded-xl ${
								index >= 2 ? 'block' : ''
							}`}
						>
							<div className="aspect-h-3 aspect-w-4">
								<Image
									alt="photos"
									fill
									className="h-full w-full rounded-md object-cover sm:rounded-xl"
									src={item || ''}
									sizes="400px"
								/>
							</div>

							{/* OVERLAY */}
							<div
								className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
								onClick={handleOpenModalImageGallery}
							/>
						</div>
					))}

					<div
						className="absolute bottom-3 left-3 z-10 hidden cursor-pointer rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ms-2 text-sm font-medium text-neutral-800">
							{T['common']['Show all photos']}
						</span>
					</div>
				</div>
			</header>

			{/* MAIn */}
			<main className="relative z-10 mt-11 flex flex-col lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pe-10 xl:w-2/3">
					{renderSection1()}
					{renderSection2()}
					{renderSection3()}
					<SectionDateRange />

					{renderSection5()}
					{renderSection6()}
					{renderSection7()}
					{renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingExperiencesDetailPage
