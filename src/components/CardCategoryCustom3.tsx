import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'

export interface CardCategoryCustom3Props {
	className?: string
	taxonomy: TaxonomyType,
	earningText?: string
}

const CardCategoryCustom3: FC<CardCategoryCustom3Props> = ({
	className = '',
	taxonomy,
	
}) => {
	const { count, name, href = '/', thumbnail , earningText} = taxonomy

	return (
		<Link href={href} className={`nc-CardCategory3 overflow-visible flex flex-col h-full items-center ${className}`}>
			<div className="relative w-full overflow-visible rounded-2xl bg-white shadow-sm group sm:w-[180px] sm:h-[120px] flex items-center justify-center">
				<div className="relative w-[150px]  h-full">
					<Image
						src={thumbnail || ''}
						alt="places"
						fill
						className="object-contain"
						sizes="(max-width: 400px) 100vw, 300px"
					/>
				</div>

				{earningText && (
					<div className=" z-[20] absolute -bottom-6 -right-6 bg-blue-600 text-white text-xs font-semibold rounded-full w-16 h-16 flex items-center justify-center shadow-md">
						{earningText}
					</div>
				)}

				<span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl" />
			</div>
		</Link>
	)
}

export default CardCategoryCustom3
