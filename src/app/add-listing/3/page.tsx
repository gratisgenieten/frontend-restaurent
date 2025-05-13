import NcInputNumber from '@/components/NcInputNumber'
import React, { FC } from 'react'
import Select from '@/shared/Select'
import FormItem from '../FormItem'
import T from '@/utils/getT'

const PageAddListing3 = () => {
	return (
		<>
			<h2 className="text-2xl font-semibold">
				{T['addListings']['page3']['pageTitle']}
			</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-5">
				{/* ITEM */}
				<FormItem label={T['addListings']['page3']['Acreage (m2)']}>
					<Select>
						<option value="100">100</option>
						<option value="200">200</option>
						<option value="300">300</option>
						<option value="400">400</option>
						<option value="500">500</option>
					</Select>
				</FormItem>
				<NcInputNumber
					label={T['addListings']['page3']['Guests']}
					defaultValue={4}
				/>
				<hr />
				<NcInputNumber
					label={T['addListings']['page3']['Bedroom']}
					defaultValue={4}
				/>
				<hr />
				<NcInputNumber
					label={T['addListings']['page3']['Beds']}
					defaultValue={4}
				/>
				<hr />
				<NcInputNumber
					label={T['addListings']['page3']['Bathroom']}
					defaultValue={2}
				/>
				<hr />
				<NcInputNumber
					label={T['addListings']['page3']['Kitchen']}
					defaultValue={2}
				/>
			</div>
		</>
	)
}

export default PageAddListing3
