import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import GuestsInput from '../GuestsInput'
import StayDatesRangeInput from './StayDatesRangeInput'
import StayDatesSingleInput from '@/app/(listing-detail)/listing-stay-detail/StayDatesSingleInput'

const StaySearchForm: FC<{}> = ({}) => {
	const renderForm = () => {
		return (
			<form className="relative mt-8 flex w-full rounded-full bg-white shadow-xl dark:bg-neutral-800 dark:shadow-2xl">
				<LocationInput className="flex-[1.5]" />
				<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
				<StayDatesSingleInput className="flex-1" />
				<div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
				<GuestsInput className="flex-1 w-full " />
			</form>
		)
	}

	return renderForm()
}

export default StaySearchForm
