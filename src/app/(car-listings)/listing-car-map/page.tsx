import React, { FC } from 'react'
import SectionGridHasMap from '../SectionGridHasMap'

export interface ListingCarMapPageProps {}

const ListingCarMapPage: FC<ListingCarMapPageProps> = () => {
	return (
		<div className="container pb-24 lg:pb-28 xl:max-w-none xl:pe-0 2xl:pe-10">
			<SectionGridHasMap />
		</div>
	)
}

export default ListingCarMapPage
