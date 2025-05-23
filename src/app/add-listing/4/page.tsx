import React, { FC } from 'react'
import Checkbox from '@/shared/Checkbox'
import T from '@/utils/getT'

const PageAddListing4 = () => {
	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					{[T['addListings']['page4']['pageTitle']]}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{[T['addListings']['page4']['pageDescription']]}
				</span>
			</div>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						{[T['addListings']['page4']['General amenities']]}
					</label>
					<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<Checkbox label="Wifi" name="Wifi" defaultChecked />
						<Checkbox label="Internet" name="Internet" />
						<Checkbox label="TV" name="TV" defaultChecked />
						<Checkbox label="Air conditioning" name="Air conditioning" />
						<Checkbox label="Fan" name="Fan" />
						<Checkbox label="Private entrance" name="Private entrance" />
						<Checkbox label="Dryer" name="Dryer" defaultChecked />
						<Checkbox label="Heater" name="Heater" />
						<Checkbox label="Washing machine" name="Washing machine" />
						<Checkbox label="Detergent" name="Detergent" defaultChecked />
						<Checkbox label="Clothes dryer" name="Clothes dryer" />
						<Checkbox label="Baby cot" name="Baby cot" />
						<Checkbox label="Desk" name="Desk " defaultChecked />
						<Checkbox label="Fridge" name="Fridge" />
						<Checkbox label="Dryer" name="Dryer" defaultChecked />
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						{[T['addListings']['page4']['Other amenities']]}
					</label>
					<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<Checkbox label="Wardrobe" name="Wardrobe" defaultChecked />
						<Checkbox label="Cloth hook" name="Cloth hook" />
						<Checkbox
							label="Extra cushion"
							name="Extra cushion"
							defaultChecked
						/>
						<Checkbox label="Gas stove" name="Gas stove" />
						<Checkbox label="Toilet paper" name="Toilet paper" />
						<Checkbox
							label="Free toiletries"
							name="Free toiletries"
							defaultChecked
						/>
						<Checkbox label="Makeup table" name="Makeup table" />
						<Checkbox label="Hot pot" name="Hot pot" />
						<Checkbox label="Bathroom heaters" name="Bathroom heaters" />
						<Checkbox label="Kettle" name="Kettle" defaultChecked />
						<Checkbox label="Dishwasher" name="Dishwasher" />
						<Checkbox label="BBQ grill" name="BBQ grill" defaultChecked />
						<Checkbox label="Toaster" name="Toaster" defaultChecked />
						<Checkbox label="Towel" name="Towel" />
						<Checkbox label="Dining table" name="Dining table" />
					</div>
				</div>

				{/* ITEM */}
				<div>
					<label className="text-lg font-semibold" htmlFor="">
						{[T['addListings']['page4']['Safe amenities']]}
					</label>
					<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<Checkbox label="Fire siren" name="Fire siren" defaultChecked />
						<Checkbox label="Fire extinguisher" name="Fire extinguisher" />
						<Checkbox label="Anti-theft key" name="Anti-theft key" />
						<Checkbox label="Safe vault" name="Safe vault" />
					</div>
				</div>
			</div>
		</>
	)
}

export default PageAddListing4
