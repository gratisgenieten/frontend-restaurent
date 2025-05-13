'use client'

import React, { FC, useState } from 'react'

export interface BtnLikeIconProps {
	className?: string
	colorClass?: string
	sizeClass?: string
	isLiked?: boolean
	svgProps?: React.SVGProps<SVGSVGElement>
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
	className = '',
	colorClass = 'text-white bg-black bg-opacity-30 hover:bg-opacity-50',
	sizeClass = 'w-8 h-8',
	isLiked = false,
	svgProps,
}) => {
	const [likedState, setLikedState] = useState(isLiked)

	return (
		<div
			className={`nc-BtnLikeIcon flex cursor-pointer items-center justify-center rounded-full transition-colors ${sizeClass} ${
				likedState ? 'nc-BtnLikeIcon--liked' : ''
			} ${colorClass} ${className}`}
			title="Save"
			onClick={() => setLikedState(!likedState)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-5 w-5"
				{...svgProps}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
				/>
			</svg>
		</div>
	)
}

export default BtnLikeIcon
