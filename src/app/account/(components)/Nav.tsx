'use client'

import { Route } from '@/routers/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Nav = () => {
	const pathname = usePathname()

	const listNav: Route[] = [
		'/account',
		'/account-favorite',
		'/account-billing',
		'/account/wallet',
		'/tell-a-friend',
		'/calendar',
		'/account/transactions',
	]	

	const formatLabel = (item: string) => {
	if (item === '/account/wallet') return 'Wallet';
	if (item === '/account/transactions') return 'transactions';

	return item
		.replaceAll('-', ' ')
		.replace(/\//g, ' ')
		.trim()
		.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize
	};

	return (
		<div className="container">
			<div className="hiddenScrollbar flex gap-x-8 overflow-x-auto md:gap-x-14">
				{listNav.map((item) => {
					const isActive = pathname === item
					return (
						<Link
							key={item}
							href={item}
							className={`block flex-shrink-0 border-b-2 py-5 capitalize md:py-8 ${
								isActive
									? 'border-primary-500 font-medium'
									: 'border-transparent'
							}`}
						>	
							{/* {item.replace('-', ' ') == '/account/wallet' ? 'wallet' : item.replaceAll('-', ' ').replace('/', ' ')} */}
							{formatLabel(item)}
						</Link>
					)
				})}
			</div>
		</div>
	)
}
