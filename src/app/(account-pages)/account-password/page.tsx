import React from 'react'
import Label from '@/components/Label'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import T from '@/utils/getT'

const AccountPass = () => {
	return (
		<div className="space-y-6 sm:space-y-8">
			{/* HEADING */}
			<h2 className="text-3xl font-semibold">
				{T['accountPage']['Update your password']}
			</h2>
			<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
			<div className="max-w-xl space-y-6">
				<div>
					<Label>{T['accountPage']['Current password']}</Label>
					<Input type="password" className="mt-1.5" />
				</div>
				<div>
					<Label>{T['accountPage']['New password']}</Label>
					<Input type="password" className="mt-1.5" />
				</div>
				<div>
					<Label>{T['accountPage']['Confirm password']}</Label>
					<Input type="password" className="mt-1.5" />
				</div>
				<div className="pt-2">
					<ButtonPrimary>{T['accountPage']['Update password']}</ButtonPrimary>
				</div>
			</div>
		</div>
	)
}

export default AccountPass
