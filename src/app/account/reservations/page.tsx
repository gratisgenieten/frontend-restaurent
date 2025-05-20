'use client'

import React, { useState } from 'react'
import BackgroundSection from '@/components/BackgroundSection'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionGridReservations from '@/components/SectionGridReservations'
import ReservationsDatesRangeInput from './ReservationsDatesRangeInput'

const DEAL_OPTIONS = [
  { value: '', label: 'All Deal' },
  { value: 'deal-1', label: 'Deal A' },
  { value: 'deal-2', label: 'Deal B' },
]

export default function Page() {
  const [selectedDeal, setSelectedDeal] = useState('')

  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      <BgGlassmorphism />
      <div className="container relative mb-24 space-y-14">
        <div className="relative pt-14">
          <BackgroundSection />

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

          {/* Reservations Grid */}
          <SectionGridReservations boxCard="box2" />
        </div>
      </div>
    </main>
  )
}
