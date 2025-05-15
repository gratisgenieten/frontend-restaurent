import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'

export interface CardCategoryCustom3Props {
	className?: string
	taxonomy: TaxonomyType
}

const CardCategoryCustom3: FC<CardCategoryCustom3Props> = ({
	className = '',
	taxonomy,
}) => {
	const { count, name, href = '/', thumbnail } = taxonomy
	return (
		<Link href={href} className={`nc-CardCategory3 flex flex-col items-center ${className}`}>
			<div
				className="relative w-full overflow-hidden rounded-2xl bg-white shadow-sm group sm:w-[180px] sm:h-[120px] flex items-center justify-center"
			>
				<div className="relative w-[150px] h-[100px]">
					<Image
						src={thumbnail || ''}
						alt="places"
						fill
						className="object-contain"
						sizes="(max-width: 400px) 100vw, 300px"
					/>
				</div>
				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl" />
			</div>

			{/* <div className="mt-4 text-center">
				<h2 className="truncate text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg">
					{name}
				</h2>
				<span className="mt-1.5 block text-sm text-neutral-600 dark:text-neutral-400">
					{convertNumbThousand(count || 0)} properties
				</span>
			</div> */}
		</Link>

	)
}

export default CardCategoryCustom3
