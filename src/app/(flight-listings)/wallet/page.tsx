import SectionHeroArchivePage from '@/app/(server-components)/SectionHeroArchivePage'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import React, { FC } from 'react'
import SectionGridFilterCard from '../SectionGridFilterCard'
import { Airplane02Icon } from '@/components/Icons'

export interface ListingFlightsPageProps {}

const ListingFlightsPage: FC<ListingFlightsPageProps> = ({}) => {
	return (
		<div className="nc-ListingFlightsPage relative overflow-hidden">
			<BgGlassmorphism />

			<div className="container relative">
				{/* SECTION HERO */}
				<SectionHeroArchivePage
					currentPage="Flights"
					currentTab="Flights"
					listingType={
						<>
							<Airplane02Icon className="h-5 w-5" />
							<span className="ms-2.5">1599 flights</span>
						</>
					}
					className="pb-24 pt-10 lg:pb-28 lg:pt-16"
				/>

				{/* SECTION */}
				<SectionGridFilterCard className="pb-24 lg:pb-28" />

				{/* SECTION 1 */}
				<SectionSliderNewCategories
					heading="Explore top destination ✈"
					subHeading="Explore thousands of destinations around the world"
					categoryCardType="card4"
					itemPerRow={4}
				/>

				{/* SECTION */}
				<SectionSubscribe2 className="py-24 lg:py-28" />
			</div>
		</div>
	)
}

export default ListingFlightsPage
