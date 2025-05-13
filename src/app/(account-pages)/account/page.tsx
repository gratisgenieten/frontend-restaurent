import React, { FC } from 'react'
import Label from '@/components/Label'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Textarea from '@/shared/Textarea'
import T from '@/utils/getT'
import { ImageAdd02Icon } from '@/components/Icons'

export interface AccountPageProps {}

const AccountPage = () => {
	return (
		<div className="space-y-6 sm:space-y-8">
			{/* HEADING */}
			<h2 className="text-3xl font-semibold">
				{T['accountPage']['Account information']}
			</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-shrink-0 items-start">
					<div className="relative flex overflow-hidden rounded-full">
						<Avatar sizeClass="w-32 h-32" />
						<div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black bg-opacity-60 text-neutral-50">
							<ImageAdd02Icon className="h-6 w-6" />
							<span className="mt-1 text-xs">
								{T['accountPage']['Change Image']}
							</span>
						</div>
						<input
							type="file"
							className="absolute inset-0 cursor-pointer opacity-0"
						/>
					</div>
				</div>
				<div className="mt-10 max-w-3xl flex-grow space-y-6 md:mt-0 md:ps-16">
					<div>
						<Label>{T['accountPage']['Name']}</Label>
						<Input className="mt-1.5" defaultValue="Eden Tuan" />
					</div>
					{/* ---- */}
					<div>
						<Label>{T['accountPage']['Gender']}</Label>
						<Select className="mt-1.5">
							<option value="Male">{T['accountPage']['Male']}</option>
							<option value="Female">{T['accountPage']['Female']}</option>
							<option value="Other">{T['accountPage']['Other']}</option>
						</Select>
					</div>
					{/* ---- */}
					<div>
						<Label>{T['accountPage']['Username']}</Label>
						<Input className="mt-1.5" defaultValue="@eden_tuan" />
					</div>
					{/* ---- */}
					<div>
						<Label>{T['accountPage']['Email']}</Label>
						<Input className="mt-1.5" defaultValue="example@email.com" />
					</div>
					{/* ---- */}
					<div className="max-w-lg">
						<Label>{T['accountPage']['Date of birth']}</Label>
						<Input className="mt-1.5" type="date" defaultValue="1990-07-22" />
					</div>
					{/* ---- */}
					<div>
						<Label>{T['accountPage']['Addess']}</Label>
						<Input className="mt-1.5" defaultValue="New york, USA" />
					</div>
					{/* ---- */}
					<div>
						<Label>{T['accountPage']['Phone number']}</Label>
						<Input className="mt-1.5" defaultValue="003 888 232" />
					</div>
					{/* ---- */}
					<div>
						<Label>{T['accountPage']['About you']}</Label>
						<Textarea className="mt-1.5" defaultValue="..." />
					</div>
					<div className="pt-2">
						<ButtonPrimary>
							{T['accountPage']['Update information']}
						</ButtonPrimary>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountPage
