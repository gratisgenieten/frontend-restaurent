import React, { FC } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem'
import T from '@/utils/getT'

const PageAddListing1 = () => {
	return (
		<>
			<h2 className="text-2xl font-semibold">
				{T['addListings']['page1']['pageTitle']}
			</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				{/* ITEM */}
				<FormItem
					label={T['addListings']['page1']['Choose a property type']}
					desc={T['addListings']['page1']['propertyTypeDescription']}
				>
					<Select>
						<option value="Hotel">Hotel</option>
						<option value="Cottage">Cottage</option>
						<option value="Villa">Villa</option>
						<option value="Cabin">Cabin</option>
						<option value="Farm stay">Farm stay</option>
						<option value="Houseboat">Houseboat</option>
						<option value="Lighthouse">Lighthouse</option>
					</Select>
				</FormItem>
				<FormItem
					label={T['addListings']['page1']['Place name']}
					desc={T['addListings']['page1']['placeNameDescription']}
				>
					<Input placeholder={T['addListings']['page1']['Place name']} />
				</FormItem>
				<FormItem
					label={T['addListings']['page1']['Rental form']}
					desc={T['addListings']['page1']['rentalFormDescription']}
				>
					<Select>
						<option value="Hotel">Entire place</option>
						<option value="Private room">Private room</option>
						<option value="Share room">Share room</option>
					</Select>
				</FormItem>
			</div>
		</>
	)
}

export default PageAddListing1
