import React, { FC } from 'react'
import { PathName } from '@/routers/types'
import { Search01Icon } from '@/components/Icons'
import T from '@/utils/getT'

interface Props {
	className?: string
	onClick?: () => void
	href?: PathName
}
const ButtonSubmit: FC<Props> = ({
	className = '',
	onClick = () => {},
	href = '/listing-stay',
}) => {
	return (
		<button
			type="submit"
			onClick={(e) => {
				e.preventDefault()
				onClick()
			}}
			className={`flex flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm text-neutral-50 focus:outline-none ${className} relative z-20`}
		>
			<Search01Icon className="h-5 w-5" />
			<span className="ms-2">{T['HeroSearchForm']['search']}</span>
		</button>
	)
}

export default ButtonSubmit
