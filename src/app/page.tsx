import React from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import { TaxonomyType } from '@/data/types'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import SectionHowItWork from '@/components/SectionHowItWork'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionVideos from '@/components/SectionVideos'
import SectionClientSay from '@/components/SectionClientSay'
import SectionSliderNewCategoriesDynamic from '@/components/SectionSliderNewCategoriesDynamic'
import s1 from '@/images/custom-home/s1.jpg'
import s2 from '@/images/custom-home/s2.png'
import s3 from '@/images/custom-home/s3.png'
import s4 from '@/images/custom-home/s4.png'
import s5 from '@/images/custom-home/s5.jpg'

const DEMO_CATS: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'New Yourk',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Singapore',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: 'Paris',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'London',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: 'Tokyo',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	},
	{
		id: '6',
		href: '/listing-stay-map',
		name: 'Maldives',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
	{
		id: '7',
		href: '/listing-stay-map',
		name: 'Italy',
		taxonomy: 'category',
		count: 188288,
		thumbnail:
			'https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	},
]

const DEMO_CATS_2: TaxonomyType[] = [
	{
		id: '1',
		href: '/listing-stay-map',
		name: 'Enjoy the great cold',
		taxonomy: 'category',
		count: 188288,
		thumbnail:s1,
	},
	{
		id: '2',
		href: '/listing-stay-map',
		name: 'Sleep in a floating way',
		taxonomy: 'category',
		count: 188288,
		thumbnail:s2,
	},
	{
		id: '3',
		href: '/listing-stay-map',
		name: "In the billionaire's house",
		taxonomy: 'category',
		count: 188288,
		thumbnail:s3,
	},
	{
		id: '4',
		href: '/listing-stay-map',
		name: 'Cool in the deep forest',
		taxonomy: 'category',
		count: 188288,
		thumbnail:s4,
	},
	{
		id: '5',
		href: '/listing-stay-map',
		name: "In the billionaire's house",
		taxonomy: 'category',
		count: 188288,
		thumbnail:s5,
	},
	
]

function PageHome() {
	return (
		<main className="nc-PageHome relative overflow-hidden">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />

			<div className="container relative mb-24 space-y-24 lg:mb-28 lg:space-y-28">
				{/* SECTION HERO */}
				<SectionHero className="pt-10 lg:pb-16 lg:pt-16" />

				{/* SECTION 1 */}
				<SectionSliderNewCategories categories={DEMO_CATS} />

				<SectionOurFeatures />

				{/* <SectionGridFeaturePlaces cardType="card2" /> */}

				<SectionHowItWork />

				<div className="relative py-16">
					<BackgroundSection className="bg-orange-50 dark:bg-black/20" />
					<SectionSliderNewCategoriesDynamic
						categories={DEMO_CATS_2}
						categoryCardType="card4"
						itemPerRow={4}
						heading="Suggestions for discovery"
						subHeading="Popular places to stay that Chisfis recommends for you"
						sliderStyle="style2"
					/>
				</div>

				<SectionSubscribe2 />

				{/* <div className="relative py-16">
					<BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
					<SectionGridAuthorBox />
				</div> */}

				{/* <SectionGridCategoryBox /> */}

				{/* <div className="relative py-16">
					<BackgroundSection />
					<SectionBecomeAnAuthor />
				</div> */}

				{/* <SectionSliderNewCategories
					heading="Explore by types of stays"
					subHeading="Explore houses based on 10 types of stays"
					categoryCardType="card5"
					itemPerRow={5}
				/> */}

				{/* <SectionVideos /> */}

				{/* <div className="relative py-16">
					<BackgroundSection />
					<SectionClientSay />
				</div> */}
			</div>
		</main>
	)
}

export default PageHome
