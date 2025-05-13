import React, { FC } from 'react'
import Textarea from '@/shared/Textarea'
import T from '@/utils/getT'

const PageAddListing6 = () => {
	return (
		<>
			<div>
				<h2 className="text-2xl font-semibold">
					{T['addListings']['page6']['pageTitle']}
				</h2>
				<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
					{T['addListings']['page6']['pageDescription']}
				</span>
			</div>

			<Textarea placeholder="..." rows={14} />
		</>
	)
}

export default PageAddListing6
