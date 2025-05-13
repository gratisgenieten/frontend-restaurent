'use client'

import React, { FC, useEffect, useState, ReactNode } from 'react'
import Heading from '@/shared/Heading'
import Nav from '@/shared/Nav'
import NavItem from '@/shared/NavItem'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import T from '@/utils/getT'

export interface HeaderFilterProps {
	tabActive: string
	tabs: string[]
	heading: ReactNode
	subHeading?: ReactNode
	onClickTab?: (item: string) => void
}

const HeaderFilter: FC<HeaderFilterProps> = ({
	tabActive,
	tabs,
	subHeading = '',
	heading = 'Latest Articles 🎈',
	onClickTab = () => {},
}) => {
	const [tabActiveState, setTabActiveState] = useState(tabActive)

	useEffect(() => {
		setTabActiveState(tabActive)
	}, [tabActive])

	const handleClickTab = (item: string) => {
		onClickTab(item)
		setTabActiveState(item)
	}

	return (
		<div className="relative mb-8 flex flex-col">
			<Heading desc={subHeading}>{heading}</Heading>
			<div className="flex items-center justify-between">
				<Nav
					className="sm:gap-x-2"
					containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
				>
					{tabs.map((item, index) => (
						<NavItem
							key={index}
							isActive={tabActiveState === item}
							onClick={() => handleClickTab(item)}
						>
							{item}
						</NavItem>
					))}
				</Nav>
				<span className="hidden flex-shrink-0 sm:block">
					<ButtonSecondary href="/listing-stay" className="!leading-none">
						<div className="flex items-center justify-center">
							<span>{T['common']['View all']}</span>
							<ArrowRightIcon className="ms-3 h-5 w-5 rtl:rotate-180" />
						</div>
					</ButtonSecondary>
				</span>
			</div>
		</div>
	)
}

export default HeaderFilter
