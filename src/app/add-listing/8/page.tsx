import React, { FC } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem'
import T from '@/utils/getT'

const PageAddListing8 = () => {
	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					{T['addListings']['page8']['pageTitle']}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{T['addListings']['page8']['pageDescription']}
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				{/* ITEM */}
				<FormItem label={T['addListings']['page8']['Currency']}>
					<Select>
						<option value="USD">USD</option>
						<option value="VND">VND</option>
						<option value="EURRO">EURRO</option>
					</Select>
				</FormItem>
				<FormItem
					label={T['addListings']['page8']['Base price (Monday -Thuday)']}
				>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
							<span className="text-gray-500">$</span>
						</div>
						<Input className="!pe-10 !ps-8" placeholder="0.00" />
						<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
							<span className="text-gray-500">USD</span>
						</div>
					</div>
				</FormItem>
				{/* ----- */}
				<FormItem
					label={T['addListings']['page8']['Base price (Friday-Sunday)']}
				>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
							<span className="text-gray-500">$</span>
						</div>
						<Input className="!pe-10 !ps-8" placeholder="0.00" />
						<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
							<span className="text-gray-500">USD</span>
						</div>
					</div>
				</FormItem>
				{/* ----- */}
				<FormItem
					label={
						T['addListings']['page8']['Long term price (Monthly discount)']
					}
				>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
							<span className="text-gray-500">%</span>
						</div>
						<Input className="!pe-10 !ps-8" placeholder="0.00" />
						<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
							<span className="text-gray-500">every month</span>
						</div>
					</div>
				</FormItem>
			</div>
		</>
	)
}

export default PageAddListing8
