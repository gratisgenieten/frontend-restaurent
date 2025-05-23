import React, { FC } from 'react'
import { Nav } from '../(components)/Nav'

export interface CommonLayoutProps {
    children?: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
    return (
        <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
            <div className="border-b border-neutral-200 bg-white pt-12 dark:border-neutral-700 dark:bg-neutral-800">
                <Nav />
            </div>
            <div className="container pb-24 pt-14 sm:pt-20 lg:pb-32">{children}</div>
        </div>
    )
}

export default CommonLayout
