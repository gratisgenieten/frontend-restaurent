import React, { FC } from 'react'
import { DEMO_CAR_LISTINGS } from '@/data/listings'
import { CarDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
import Avatar from '@/shared/Avatar'
import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { HumidityIcon, SeatSelectorIcon, Setup02Icon } from './Icons'
import T from '@/utils/getT'

export interface CarCardHProps {
	className?: string
	data?: CarDataType
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0]

const CarCardH: FC<CarCardHProps> = ({ className = '', data = DEMO_DATA }) => {
	const {
		address,
		title,
		href,
		like,
		saleOff,
		isAds,
		price,
		reviewStart,
		reviewCount,
		author,
		featuredImage,
	} = data

	const renderSliderGallery = () => {
		return (
			<div className="relative flex w-full flex-shrink-0 items-center justify-center border-e border-neutral-200/80 dark:border-neutral-700 md:w-72">
				<div className="w-full py-5 sm:py-0">
					<Image
						alt=""
						className="w-full"
						src={featuredImage}
						sizes="(max-width: 640px) 100vw, 300px"
					/>
				</div>
				<BtnLikeIcon
					colorClass="text-white bg-black bg-opacity-20 hover:bg-opacity-30"
					isLiked={like}
					className="absolute end-3 top-3 z-[1]"
				/>
				{saleOff && <SaleOffBadge className="absolute start-3 top-3" />}
			</div>
		)
	}

	const renderContent = () => {
		return (
			<div className="flex flex-grow flex-col p-3 sm:p-5">
				<div className="space-y-2">
					<div className="flex items-center gap-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2 className="text-xl font-semibold capitalize">
							<span className="line-clamp-1">{title}</span>
						</h2>
					</div>
					<div className="flex items-center gap-x-4 text-sm text-neutral-500 dark:text-neutral-400">
						<StartRating reviewCount={reviewCount} point={reviewStart} />
						<span>· </span>
						<div className="flex items-center">
							<span className="hidden text-base sm:inline-block">
								<MapPinIcon className="h-4 w-4" />
							</span>
							<span className="line-clamp-1 sm:ms-2"> {address}</span>
						</div>
					</div>
				</div>
				<div className="my-4 hidden w-14 border-b border-neutral-200/80 dark:border-neutral-700 sm:block"></div>
				{/* SHOW MOBILE */}
				<div className="mt-4 flex items-center gap-x-2 text-sm text-neutral-500 dark:text-neutral-400 sm:mt-0 sm:hidden">
					<span>4 seats</span>
					<span>· </span>
					<span>Auto gearbox</span>
					<span>· </span>
					<span>4 seats</span>
				</div>
				{/* SHOW DESK */}
				<div className="hidden items-center gap-x-8 sm:flex">
					{/* --- */}
					<div className="flex items-center gap-x-2">
						<SeatSelectorIcon className="h-4 w-4" />
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
							4 seats
						</span>
					</div>
					{/* --- */}
					<div className="flex items-center gap-x-2">
						<Setup02Icon className="h-4 w-4" />
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
							Auto gearbox
						</span>
					</div>
					{/* --- */}
					<div className="flex items-center gap-x-2">
						<HumidityIcon className="h-4 w-4" />
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
							2 bags
						</span>
					</div>
				</div>

				<div className="my-4 w-14 border-b border-neutral-200/80 dark:border-neutral-700"></div>
				<div className="flex items-end justify-between">
					<div className="flex items-center gap-x-3 text-sm text-neutral-700 dark:text-neutral-300">
						<Avatar imgUrl={author.avatar} userName={author.displayName} />
						<span className="hidden sm:inline-block">
							<span className="hidden sm:inline">
								{T['common']['Car owner']}
							</span>{' '}
							{author.displayName}
						</span>
					</div>
					<span className="text-lg font-semibold text-secondary-700">
						{price}
						{` `}
						<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
							/{T['common']['day']}
						</span>
					</span>
				</div>
			</div>
		)
	}

	return (
		<div
			className={`nc-CarCardH group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
		>
			<Link href={href} className="absolute inset-1 z-[1]"></Link>
			<div className="flex flex-col md:flex-row">
				{renderSliderGallery()}
				{renderContent()}
			</div>
		</div>
	)
}

export default CarCardH
