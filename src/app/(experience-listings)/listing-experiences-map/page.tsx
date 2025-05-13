import React, { FC } from 'react'
import SectionGridHasMap from '../SectionGridHasMap'

export interface ListingExperiencesMapPageProps {}

const ListingExperiencesMapPage: FC<ListingExperiencesMapPageProps> = ({}) => {
	return (
		<div className="container pb-24 lg:pb-28 xl:max-w-none xl:pe-0 2xl:pe-10">
			<SectionGridHasMap />
		</div>
	)
}

export default ListingExperiencesMapPage
