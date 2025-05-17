import BackgroundSection from '@/components/BackgroundSection'
import SectionClientSay from '@/components/SectionClientSay'
import React from 'react'
import ClientReviewSection from './(components)/ClientReviewSection'
import CustomerReviews from './(components)/CustomerReviews'

function reviews() {
    return (
        <div>
            <div className="relative py-16 overflow-hidden px-12">
                <BackgroundSection />
                <SectionClientSay />
            </div>
            <ClientReviewSection />
            <CustomerReviews/>
        </div>

    )
}

export default reviews