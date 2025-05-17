import Image from 'next/image'
import React from 'react'
import logo from '@/images/logo.png'
const LogoSvg = () => {
	return (
		<Image
			className="block w-full min-w-28 dark:hidden"
			src={logo}
			alt="logo"
		/>

	)
}

export default LogoSvg
