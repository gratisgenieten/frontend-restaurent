'use client'

import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { FC } from 'react'

export interface ClearDataButtonProps {
	onClick?: () => void
}

const ClearDataButton: FC<ClearDataButtonProps> = ({ onClick }) => {
	return (
		<span
			onClick={() => onClick && onClick()}
			className="absolute end-1 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center rounded-full bg-neutral-100 text-sm dark:bg-neutral-800 lg:end-1.5 lg:h-6 lg:w-6"
		>
			<XMarkIcon className="h-4 w-4" />
		</span>
	)
}

export default ClearDataButton
