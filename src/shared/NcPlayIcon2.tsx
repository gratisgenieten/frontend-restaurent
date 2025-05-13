import { PlayIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'

export interface NcPlayIcon2Props {
	className?: string
	iconClass?: string
}

const NcPlayIcon2: FC<NcPlayIcon2Props> = ({
	className = 'w-8 h-8 md:w-10 md:h-10',
	iconClass = 'w-5 h-5',
}) => {
	return (
		<div
			className={`nc-NcPlayIcon2 relative rounded-full bg-white shadow-inner ${className}`}
		>
			<span className="absolute inset-0 flex items-center justify-center text-primary-500">
				<PlayIcon className={iconClass + ' rtl:rotate-180'} />
			</span>
		</div>
	)
}

export default NcPlayIcon2
