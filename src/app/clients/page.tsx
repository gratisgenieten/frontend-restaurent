import BackgroundSection from '@/components/BackgroundSection'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionGridAuthorBoxCustom from '@/components/SectionGridAuthorBoxCustom'
import React from 'react'

function page() {
    return (
        <div className="nc-PageWrapper relative overflow-hidden p-12">
            <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
            <SectionGridAuthorBoxCustom />
        </div>
    )
}

export default page