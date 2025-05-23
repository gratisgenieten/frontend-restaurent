import { Route } from '@/routers/types'
import { StaticImageData } from 'next/image'

//  ######  CustomLink  ######## //
export interface CustomLink {
	label: string
	href: Route<string> | string
	targetBlank?: boolean
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
	id: string | number
	name: string
	href: Route<string>
	thumbnail?: any
	desc?: string
	color?: TwMainColor | string
	taxonomy: 'category' | 'tag'
	listingType?: 'stay' | 'experiences' | 'car'
	count?: number
	earningText?: string
}

export interface AuthorType {
	id: string | number
	firstName: string
	name: string
	lastName: string
	displayName: string
	avatar: string | StaticImageData
	bgImage?: string | StaticImageData
	email?: string
	count: number
	desc: string
	jobName: string
	href: Route<string>
	starRating?: number
	title?: string
	position?: string
	company?: string
	businessArena?: string
	employees?: string
	street?: string
	additionalInfo?: string
	zipCode?: string
	place?: string
	country?: string
	countryCode?: string
	phoneNumber?: string
}

export interface PostDataType {
	id: string | number
	author: AuthorType
	date: string
	href: Route<string>
	categories: TaxonomyType[]
	title: string
	featuredImage: StaticImageData | string
	desc?: string
	commentCount: number
	viewdCount: number
	readingTime: number
	postType?: 'standard' | 'video' | 'gallery' | 'audio'
}

export type TwMainColor =
	| 'pink'
	| 'green'
	| 'yellow'
	| 'red'
	| 'indigo'
	| 'blue'
	| 'purple'
	| 'gray'

//
export interface StayDataType {
	id: string | number
	author: AuthorType
	date: string
	href: Route<string>
	title: string
	featuredImage: StaticImageData | string
	commentCount: number
	viewCount: number
	address: string
	reviewStart: number
	reviewCount: number
	like: boolean
	galleryImgs: (StaticImageData | string)[]
	price: string
	listingCategory: TaxonomyType
	maxGuests: number
	bedrooms: number
	bathrooms: number
	saleOff?: string | null
	isAds: boolean | null
	map: {
		lat: number
		lng: number
	}
}

//
export interface ExperiencesDataType {
	id: string | number
	author: AuthorType
	date: string
	href: Route<string>
	title: string
	featuredImage: StaticImageData | string
	commentCount: number
	viewCount: number
	address: string
	reviewStart: number
	reviewCount: number
	like: boolean
	galleryImgs: (StaticImageData | string)[]
	price: string
	listingCategory: TaxonomyType
	maxGuests: number
	saleOff?: string | null
	isAds: boolean | null
	map: {
		lat: number
		lng: number
	}
}

//
export interface CarDataType {
	id: string | number
	author: AuthorType
	date: string
	href: Route<string>
	title: string
	featuredImage: StaticImageData | string
	commentCount: number
	viewCount: number
	address: string
	reviewStart: number
	reviewCount: number
	like: boolean
	galleryImgs: (StaticImageData | string)[]
	price: string
	listingCategory: TaxonomyType
	seats: number
	gearshift: string
	saleOff?: string | null
	isAds: boolean | null
	map: {
		lat: number
		lng: number
	}
}
