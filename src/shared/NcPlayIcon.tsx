import { PlayIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'

export interface NcPlayIconProps {
	className?: string
}

const NcPlayIcon: FC<NcPlayIconProps> = ({ className = '' }) => {
	return (
		<div
			className={`nc-NcPlayIcon h-20 w-20 rounded-full bg-white bg-opacity-30 p-3 backdrop-blur backdrop-filter lg:h-52 lg:w-52 lg:p-12 ${className}`}
		>
			<div className="relative h-full w-full rounded-full bg-white text-primary-500">
				<span className="absolute inset-0 flex items-center justify-center">
					<PlayIcon className="h-8 w-8 md:h-12 md:w-12 rtl:rotate-180" />
				</span>
			</div>
		</div>
	)
}

export default NcPlayIcon
