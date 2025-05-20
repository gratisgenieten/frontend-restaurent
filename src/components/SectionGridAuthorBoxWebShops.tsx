'use client';
import CardAuthorBox from '@/components/CardAuthorBox'
import CardAuthorBox2 from '@/components/CardAuthorBox2'
import Heading from '@/shared/Heading'
import { DEMO_AUTHORS } from '@/data/authors'
import { AuthorType } from '@/data/types'
import React, { FC, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import T from '@/utils/getT'
import ReservationsDatesRangeInput from '@/app/account/reservations/ReservationsDatesRangeInput';

export interface SectionGridAuthorBoxWebShopsProps {
	className?: string
	authors?: AuthorType[]
	boxCard?: 'box1' | 'box2'
	gridClassName?: string
}

const DEAL_OPTIONS = [
  { value: '', label: 'All Deal' },
  { value: 'deal-1', label: 'Deal A' },
  { value: 'deal-2', label: 'Deal B' },
]

const DEMO_DATA:any = DEMO_AUTHORS.filter((_:any, i:any) => i < 10)

const SectionGridAuthorBoxWebShops: FC<SectionGridAuthorBoxWebShopsProps> = ({
	className = '',
	authors = DEMO_DATA,
	boxCard = 'box1',
	gridClassName = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ',
}) => {

	  const [selectedDeal, setSelectedDeal] = useState('')

	return (
		<div className={`nc-SectionGridAuthorBox relative ${className}`}>
			<div className="mb-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-1/3">
              <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Filter by Deal
              </label>
              <div className="relative">
                <select
                  value={selectedDeal}
                  onChange={(e) => setSelectedDeal(e.target.value)}
                  className="block w-full appearance-none rounded-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-800 shadow-sm transition duration-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
                >
                  {DEAL_OPTIONS.map((deal) => (
                    <option key={deal.value} value={deal.value}>
                      {deal.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>  
            <div className="w-full sm:w-auto">
              <ReservationsDatesRangeInput />
            </div>

            
          </div>
			<div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
				{authors.map((author:any, index:any) =>
					boxCard === 'box2' ? (
						<CardAuthorBox2 key={author.id} author={author} />
					) : (
						<CardAuthorBox
							index={index < 3 ? index + 1 : undefined}
							key={author.id}
							author={author}
						/>
					),
				)}
			</div>
			<div className="mt-16 flex flex-col justify-center gap-y-3 sm:flex-row sm:gap-x-5 sm:gap-y-0">
				<ButtonSecondary loading>{T['common']['Show me more']}</ButtonSecondary>
				<ButtonPrimary>{T['common']['Become a host']}</ButtonPrimary>
			</div>
		</div>
	)
}

export default SectionGridAuthorBoxWebShops
