import React, { FC,Fragment, useEffect, useRef, useState } from 'react'
import Logo from '@/shared/Logo'
import Navigation from '@/shared/Navigation/Navigation'
import SearchDropdown from './SearchDropdown'
import ButtonPrimary from '@/shared/ButtonPrimary'
import MenuBar from '@/shared/MenuBar'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import HeroSearchForm2MobileFactory from '../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory'
import T from '@/utils/getT'

import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'
import { PathName } from '@/routers/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
	ShoppingBagIcon as ShoppingCartIcon,
	Cog8ToothIcon as CogIcon,
} from '@heroicons/react/24/outline'

export interface MainNav1Props {
	className?: string
}
export type SiteHeaders = 'Header 1' | 'Header 2' | 'Header 3'
export type ThemeDir = 'ltr' | 'rtl'
interface HomePageItem {
	name: string
	slug: PathName
}

let OPTIONS = {
	root: null,
	rootMargin: '0px',
	threshold: 1.0,
}
let OBSERVER: IntersectionObserver | null = null
const PAGES_HIDE_HEADER_BORDER: PathName[] = [
	'/home-3',
	'/listing-car-detail',
	'/listing-experiences-detail',
	'/listing-stay-detail',
]

const MainNav1: FC<MainNav1Props> = ({ className = '' }) => {
	let [headers] = useState<SiteHeaders[]>(['Header 1', 'Header 2', 'Header 3']);
	const [headerSelected, setHeaderSelected] = useState<SiteHeaders>('Header 2');
	let [themeDirs] = useState<ThemeDir[]>(['ltr', 'rtl']);
	const [themeDir, setThemeDir] = useState<ThemeDir>('ltr');
	let [homePages] = useState<HomePageItem[]>([
		{ name: 'Home Main', slug: '/' },
		{ name: 'Real Estate', slug: '/home-2' },
		{ name: 'Home 3', slug: '/home-3' },
	])
	
	const pathname = usePathname()
	const renderRadioHeaders = () => {
			return (
				<div className="mt-4">
					<span className="text-sm font-medium">Header Styles</span>
					<div className="mt-1.5 flex items-center gap-2">
						{headers.map((header) => {
							return (
								<div
									key={header}
									className={`flex cursor-pointer select-none items-center rounded-full px-3.5 py-1.5 text-xs font-medium ${
										headerSelected === header
											? 'bg-black text-white shadow-lg shadow-black/10'
											: 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
									}`}
									onClick={() => setHeaderSelected(header)}
								>
									{header}
								</div>
							)
						})}
					</div>
				</div>
			)
		}
	
		const renderSwitchDarkMode = () => {
			return (
				<div className="mt-4">
					<span className="text-sm font-medium">Dark mode</span>
					<div className="mt-1.5 flex items-center gap-2">
						<SwitchDarkMode2 />
					</div>
				</div>
			)
		}
		const renderRadioDir = () => {
			return (
				<div className="mt-4">
					<span className="text-sm font-medium">Theme Dir</span>
					<div className="mt-1.5 flex items-center gap-2">
						{themeDirs.map((value) => {
							return (
								<div
									key={value}
									className={`flex cursor-pointer select-none items-center rounded-full px-3.5 py-1.5 text-xs font-medium uppercase ${
										themeDir === value
											? 'bg-black text-white shadow-lg shadow-black/10'
											: 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
									}`}
									onClick={() => {
										setThemeDir(value)
										document.documentElement.dir = value
									}}
								>
									{value}
								</div>
							)
						})}
					</div>
				</div>
			)
		}
	
		const renderRadioHomePages = () => {
			return (
				<div className="mt-4">
					<span className="text-sm font-medium">Home Pages</span>
					<div className="mt-1.5 flex items-center gap-2">
						{homePages.map((home) => {
							return (
								<Link
									key={home.slug}
									href={home.slug}
									className={`flex cursor-pointer select-none items-center rounded-full px-3.5 py-1.5 text-xs font-medium ${
										pathname === home.slug
											? 'bg-black text-white shadow-lg shadow-black/10'
											: 'border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500'
									}`}
								>
									{home.name}
								</Link>
							)
						})}
					</div>
				</div>
			)
		}
	
		const renderControlSelections = () => {
			return (
				<div className="ControlSelections relative z-40 hidden lg:block">
					<div className="z-40 flex items-center">
						<Popover className="relative">
							{({ open }) => (
								<>
									<PopoverButton
										className={`z-10 rounded-xl border border-neutral-200 bg-white p-2.5 shadow-xl hover:bg-neutral-100 focus:outline-none dark:border-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 ${
											open ? 'ring-primary-500 focus:ring-2' : ''
										}`}
									>
										<CogIcon className="h-8 w-8" />
									</PopoverButton>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0 translate-y-1"
										enterTo="opacity-100 translate-y-0"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100 translate-y-0"
										leaveTo="opacity-0 translate-y-1"
									>
										<PopoverPanel className="absolute right-0 z-10 mt-3 w-screen max-w-sm">
											<div className="nc-custom-shadow-1 overflow-hidden rounded-2xl bg-white dark:bg-neutral-800">
												<div className="relative p-6">
													<span className="text-xl font-semibold">Customize</span>
													<div className="mt-4 w-full border-b border-neutral-200 dark:border-neutral-700"></div>
													{renderRadioHeaders()}
													{renderRadioHomePages()}
													{renderSwitchDarkMode()}
													{renderRadioDir()}
												</div>
												<div className="bg-gray-50 p-5 dark:bg-white/5">
													<a
														className="flex w-full items-center justify-center !rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
														href={
															'https://themeforest.net/item/chisfis-online-booking-nextjs-template/43399526'
														}
														target="_blank"
														rel="noopener noreferrer"
													>
														<ShoppingCartIcon className="h-4 w-4" />
														<span className="ms-2">Buy this template</span>
													</a>
												</div>
											</div>
										</PopoverPanel>
									</Transition>
								</>
							)}
						</Popover>
					</div>
				</div>
			)
		}
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
						<ButtonPrimary className="self-center" href="/login">
							{T['Header']['Sign up']}
						</ButtonPrimary>
					</div>

					<div className="flex items-center xl:hidden">
						<SwitchDarkMode />
						<div className="px-0.5" />
						<MenuBar />
					</div>
					<div className='flex items-center justify-center ml-4'>
						{renderControlSelections()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainNav1
