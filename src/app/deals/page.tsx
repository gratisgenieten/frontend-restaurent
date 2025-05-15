import React, { FC } from 'react'
import SectionGridFilterCard from './SectionGridFilterCard'
import BackgroundSection from '@/components/BackgroundSection'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionSliderNewCategoriesListingStayDetail from '@/components/SectionSliderNewCategoriesListingStayDetail'

export interface ListingStayPageProps { }

const ListingStayPage: FC<ListingStayPageProps> = () => {
	return (
		<div className='nc-ListingStayPage relative overflow-hidden py-16'>
			<SectionGridFilterCard className="container pb-24 lg:pb-28" />
			<div className='container overflow-hidden'>
				<div className="relative py-16">
					<BackgroundSection />
					<SectionSliderNewCategoriesListingStayDetail
						heading="Explore by types of stays"
						subHeading="Explore houses based on 10 types of stays"
						categoryCardType="card5"
						itemPerRow={5}
						sliderStyle="style2"
					/>
				</div>
			</div>

		</div>)

}

export default ListingStayPage
