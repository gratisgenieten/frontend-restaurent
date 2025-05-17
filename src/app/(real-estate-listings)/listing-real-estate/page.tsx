import React, { FC } from 'react'
import SectionGridFilterCard from '../SectionGridFilterCard'

export interface ListingRealEstatePageProps {}

const ListingRealEstatePage: FC<ListingRealEstatePageProps> = ({}) => {
	// useEffect(() => {
	//   const $body = document.querySelector("body");
	//   if ($body) {
	//     $body.className = "theme-cyan-blueGrey";
	//   }
	//   return () => {
	//     if ($body) {
	//       $body.className = "";
	//     }
	//   };
	// }, []);

	return (
		<div className="container relative">
			<SectionGridFilterCard className="py-4 lg:py-2" />
		</div>
	)
}

export default ListingRealEstatePage
