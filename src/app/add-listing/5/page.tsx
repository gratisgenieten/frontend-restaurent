import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'
import T from '@/utils/getT'

const PageAddListing5 = () => {
	const renderRadio = (
		name: string,
		id: string,
		label: string,
		defaultChecked?: boolean,
	) => {
		return (
			<div className="flex items-center">
				<input
					defaultChecked={defaultChecked}
					id={id + name}
					name={name}
					type="radio"
					className="!checked:bg-primary-500 h-6 w-6 border-neutral-300 bg-transparent text-primary-500 focus:ring-primary-500"
				/>
				<label
					htmlFor={id + name}
					className="ms-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
				>
					{label}
				</label>
			</div>
		)
	}

	const renderNoInclude = (text: string) => {
		return (
			<div className="flex items-center justify-between py-3">
				<span className="flex-1 text-neutral-600 dark:text-neutral-400">
					{text}
				</span>
				<div className="cursor-pointer">
					<XMarkIcon className="h-4 w-4" />
				</div>
			</div>
		)
	}

	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					{T['addListings']['page5']['pageTitle']}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{T['addListings']['page5']['pageDescription']}
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						{T['addListings']['page5']['General amenities']}
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Smoking', 'Do', 'Do not allow')}
						{renderRadio('Smoking', 'Allow', 'Allow', true)}
						{renderRadio('Smoking', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						{T['addListings']['page5']['Pet']}
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Pet', 'Do', 'Do not allow')}
						{renderRadio('Pet', 'Allow', 'Allow', true)}
						{renderRadio('Pet', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						{T['addListings']['page5']['Party organizing']}
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Partyorganizing', 'Do', 'Do not allow')}
						{renderRadio('Partyorganizing', 'Allow', 'Allow', true)}
						{renderRadio('Partyorganizing', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						{T['addListings']['page5']['Cooking']}
					</label>
					<div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{renderRadio('Cooking', 'Do', 'Do not allow')}
						{renderRadio('Cooking', 'Allow', 'Allow', true)}
						{renderRadio('Cooking', 'Charge', 'Charge')}
					</div>
				</div>

				{/* ----------- */}
				<hr />

				<span className="block text-lg font-semibold">
					{T['addListings']['page5']['Additional rules']}
				</span>
				<div className="flow-root">
					<div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
						{renderNoInclude('No smoking in common areas')}
						{renderNoInclude('Do not wear shoes/shoes in the house')}
						{renderNoInclude('No cooking in the bedroom')}
					</div>
				</div>
				<div className="flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:gap-x-5 sm:gap-y-0">
					<Input
						className="!h-full"
						placeholder={T['addListings']['page5']['No smoking']}
					/>
					<ButtonPrimary className="flex-shrink-0">
						<PlusIcon className="h-5 w-5" />
						<span className="ms-3">{T['addListings']['page5']['Add tag']}</span>
					</ButtonPrimary>
				</div>
			</div>
		</>
	)
}

export default PageAddListing5
