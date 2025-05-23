import React, { FC, Fragment, useEffect, useRef, useState } from 'react'
import Logo from '@/shared/Logo'
import Navigation from '@/shared/Navigation/Navigation'
import SearchDropdown from './SearchDropdown'
import ButtonPrimary from '@/shared/ButtonPrimary'
import MenuBar from '@/shared/MenuBar'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import HeroSearchForm2MobileFactory from '../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory'
import Cookies from "js-cookie";
import { FaPowerOff } from "react-icons/fa6";
import T from '@/utils/getT'
import { usePathname, useRouter } from 'next/navigation'
export interface MainNav1Props {
	className?: string
}
export type SiteHeaders = 'Header 1' | 'Header 2' | 'Header 3'
export type ThemeDir = 'ltr' | 'rtl'

const MainNav1: FC<MainNav1Props> = ({ className = '' }) => {
	const [token, setToken] = useState<string | undefined>(undefined);
	const pathname = usePathname()
	const hideLayout = pathname.includes('/account') || pathname.includes('/wallet') || pathname.includes('/tell-a-friend') || pathname.includes('/calendar')
	useEffect(() => {
		const cookieToken = Cookies.get("token");
		setToken(cookieToken);
	}, [pathname]);

	const route = useRouter();

	return (
		<div className={`nc-MainNav1 relative z-10 ${className}`}>
			<div className="relative flex h-20 justify-between px-4 lg:container">
				<div className="hidden flex-1 justify-start gap-x-4 sm:gap-x-10 md:flex">
					<Logo className="w-24 self-center" />
					<Navigation />
				</div>

				<div className="!mx-auto flex max-w-lg flex-[3] md:px-3 lg:hidden">
					<div className="flex-1 self-center">
						<HeroSearchForm2MobileFactory />
					</div>
				</div>

				<div className="hidden flex-1 flex-shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
					<div className="hidden gap-x-0.5 xl:flex">
						<SwitchDarkMode />
						<SearchDropdown className="flex items-center" />
						<div className="px-1" />
						{!token ?
							<ButtonPrimary className="self-center" href="/login" >
								{T['Header']['Sign in']}
							</ButtonPrimary>
							:
							<div className='flex items-center justify-center gap-2'>


								{!hideLayout ?
									<ButtonPrimary className="self-center" href="/account">
										{T['Header']['Dashboard']}
									</ButtonPrimary>

									: null}

								{pathname.startsWith('/account') ?

									<a className="bg-[#4338CA] text-white px-6 py-2 rounded-full self-center ml-2" href="/"

									>
										{T['Header']['Back to Front']}
									</a>
									: null}

								{token ? (
									<button
										onClick={() =>{Cookies.remove('token'), route.push('/')}}
										className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
									>
										<FaPowerOff size={18} />
									</button>
								) : null}



							</div>
						}


					</div>

					<div className="flex items-center xl:hidden">
						<SwitchDarkMode />
						<div className="px-0.5" />
						<MenuBar />
					</div>

				</div>
			</div>
		</div>
	)
}

export default MainNav1
