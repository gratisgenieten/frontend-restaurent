import { Search01Icon } from '@/components/Icons'
import { PathName } from '@/routers/types'
import T from '@/utils/getT'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
	href?: PathName
}

const ButtonSubmit: FC<Props> = ({ href = '/listing-stay-map' }) => {
	return (
		<Link
			href={href}
			type="button"
			className="flex h-14 w-full items-center justify-center rounded-full bg-primary-600 text-neutral-50 hover:bg-primary-700 focus:outline-none md:h-16 md:w-16"
		>
			<span className="me-3 md:hidden">{T['HeroSearchForm']['search']}</span>
			<Search01Icon className="h-6 w-6" />
		</Link>
	)
}

export default ButtonSubmit
