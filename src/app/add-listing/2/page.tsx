'use client'

import { MapPinIcon } from '@heroicons/react/24/outline'
import Label from '@/components/Label'
import { FC } from 'react'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem'
import { Map, Marker } from '@vis.gl/react-google-maps'
import T from '@/utils/getT'

const PageAddListing2 = () => {
	return (
		<>
			<h2 className="text-2xl font-semibold">
				{T['addListings']['page2']['pageTitle']}
			</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			{/* FORM */}
			<div className="space-y-8">
				<ButtonSecondary>
					<MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
					<span className="ms-3">
						{T['addListings']['page2']['Use current location']}
					</span>
				</ButtonSecondary>
				{/* ITEM */}
				<FormItem label={T['addListings']['page2']['Country/Region']}>
					<Select>
						<option value="Viet Nam">Viet Nam</option>
						<option value="Thailand">Thailand</option>
						<option value="France">France</option>
						<option value="Singapore">Singapore</option>
						<option value="Jappan">Jappan</option>
						<option value="Korea">Korea</option>
						<option value="...">...</option>
					</Select>
				</FormItem>
				<FormItem label={T['addListings']['page2']['Street']}>
					<Input placeholder="..." />
				</FormItem>
				<FormItem label={T['addListings']['page2']['Room number (optional)']}>
					<Input />
				</FormItem>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
					<FormItem label={T['addListings']['page2']['City']}>
						<Input />
					</FormItem>
					<FormItem label={T['addListings']['page2']['State']}>
						<Input />
					</FormItem>
					<FormItem label={T['addListings']['page2']['Postal code']}>
						<Input />
					</FormItem>
				</div>
				<div>
					<Label>{T['addListings']['page2']['Detailed address']}</Label>
					<span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
						1110 Pennsylvania Avenue NW, Washington, DC 20230
					</span>
					<div className="mt-4">
						<div className="aspect-h-5 aspect-w-5 sm:aspect-h-3">
							<div className="overflow-hidden rounded-xl">
								<Map
									style={{
										width: '100%',
										height: '100%',
									}}
									defaultZoom={15}
									defaultCenter={{
										lat: 55.9607277,
										lng: 36.2172614,
									}}
									gestureHandling={'greedy'}
								>
									<Marker
										position={{ lat: 55.9607277, lng: 36.2172614 }}
										draggable
										onDragEnd={(e) => console.log(e)}
									/>
								</Map>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PageAddListing2
