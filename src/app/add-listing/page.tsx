'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('/add-listing/1')
	}, [router])

	return null
}

export default Page
