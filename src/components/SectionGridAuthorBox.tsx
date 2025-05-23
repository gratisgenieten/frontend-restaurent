import CardAuthorBox from '@/components/CardAuthorBox'
import CardAuthorBox2 from '@/components/CardAuthorBox2'
import Heading from '@/shared/Heading'
import { DEMO_AUTHORS } from '@/data/authors'
import { AuthorType } from '@/data/types'
import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import T from '@/utils/getT'

export interface SectionGridAuthorBoxProps {
	className?: string
	authors?: AuthorType[]
	boxCard?: 'box1' | 'box2'
	gridClassName?: string
}

const DEMO_DATA:any = DEMO_AUTHORS.filter((_:any, i:any) => i < 10)

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
	className = '',
	authors = DEMO_DATA,
	boxCard = 'box1',
	gridClassName = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ',
}) => {
	return (
		<div className={`nc-SectionGridAuthorBox relative ${className}`}>
			<Heading desc="Rating based on customer reviews" isCenter>
				Top 10 author of the month
			</Heading>
			<div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
				{authors.map((author:any, index:any) =>
					boxCard === 'box2' ? (
						<CardAuthorBox2 key={author.id} author={author} />
					) : (
						<CardAuthorBox
							index={index < 3 ? index + 1 : undefined}
							key={author.id}
							author={author}
						/>
					),
				)}
			</div>
			<div className="mt-16 flex flex-col justify-center gap-y-3 sm:flex-row sm:gap-x-5 sm:gap-y-0">
				<ButtonSecondary loading>{T['common']['Show me more']}</ButtonSecondary>
				<ButtonPrimary>{T['common']['Become a host']}</ButtonPrimary>
			</div>
		</div>
	)
}

export default SectionGridAuthorBox
