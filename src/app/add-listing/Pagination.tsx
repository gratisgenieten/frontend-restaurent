'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import T from '@/utils/getT'
import { Route } from 'next'
import { usePathname } from 'next/navigation'
import React from 'react'

const Pagination = () => {
	const pathname = usePathname() as string

	// get the number from the end of pathname
	const index = pathname.match(/\d+$/)
		? parseInt(pathname.match(/\d+$/)?.[0] || '1')
		: 1

	const nextHref = (
		index < 10 ? `/add-listing/${index + 1}` : `/add-listing/${1}`
	) as Route
	const backtHref = (
		index > 1 ? `/add-listing/${index - 1}` : `/add-listing/${1}`
	) as Route
	const nextBtnText =
		index > 9
			? T['addListings']['pagination']['Publish listing']
			: T['addListings']['pagination']['Continue']

	return (
		<div className="flex justify-end gap-4">
			<ButtonSecondary href={backtHref}>
				{T['addListings']['pagination']['Go back']}
			</ButtonSecondary>
			<ButtonPrimary href={nextHref}>{nextBtnText}</ButtonPrimary>
		</div>
	)
}

export default Pagination
