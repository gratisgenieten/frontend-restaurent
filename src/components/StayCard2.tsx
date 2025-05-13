import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import { StayDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/24/outline'
import T from '@/utils/getT'

export interface StayCard2Props {
	className?: string
	data?: StayDataType
	size?: 'default' | 'small'
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0]

const StayCard2: FC<StayCard2Props> = ({
	size = 'default',
	className = '',
	data = DEMO_DATA,
}) => {
	const {
		galleryImgs,
		listingCategory,
		address,
		title,
		bedrooms,
		href,
		like,
		saleOff,
		isAds,
		price,
		reviewStart,
		reviewCount,
		id,
	} = data

	const renderSliderGallery = () => {
		return (
			<div className="relative w-full">
				<GallerySlider
					uniqueID={`StayCard2_${id}`}
					ratioClass="aspect-w-12 aspect-h-11"
					galleryImgs={galleryImgs}
					imageClass="rounded-lg"
					href={href}
				/>
				<BtnLikeIcon isLiked={like} className="absolute end-3 top-3 z-[1]" />
				{saleOff && <SaleOffBadge className="absolute start-3 top-3" />}
			</div>
		)
	}

	const renderContent = () => {
		return (
			<div className={size === 'default' ? 'mt-3 space-y-3' : 'mt-2 space-y-2'}>
				<div className="space-y-2">
					<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{listingCategory.name} · {bedrooms} beds
					</span>
					<div className="flex items-center gap-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2
							className={`font-semibold capitalize text-neutral-900 dark:text-white ${
								size === 'default' ? 'text-base' : 'text-base'
							}`}
						>
							<span className="line-clamp-1">{title}</span>
						</h2>
					</div>
					<div className="flex items-center gap-x-1.5 text-sm text-neutral-500 dark:text-neutral-400">
						{size === 'default' && (
							<MapPinIcon className="h-4 w-4" aria-hidden="true" />
						)}
						<span>{address}</span>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
				<div className="flex items-center justify-between">
					<span className="text-base font-semibold">
						{price}
						{` `}
						{size === 'default' && (
							<span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
								/ {T['common']['night']}
							</span>
						)}
					</span>
					{!!reviewStart && (
						<StartRating reviewCount={reviewCount} point={reviewStart} />
					)}
				</div>
			</div>
		)
	}

	return (
		<div className={`nc-StayCard2 group relative ${className}`}>
			{renderSliderGallery()}
			<Link href={href}>{renderContent()}</Link>
		</div>
	)
}

export default StayCard2
