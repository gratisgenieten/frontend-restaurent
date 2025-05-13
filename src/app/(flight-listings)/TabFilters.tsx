'use client'

import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Popover,
	PopoverButton,
	PopoverPanel,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Transition,
} from '@headlessui/react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Slider from 'rc-slider'
import {
	ChevronDownIcon,
	FunnelIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import T from '@/utils/getT'
import {
	AirplaneLanding02Icon,
	AirplaneTakeOff01Icon,
} from '@/components/Icons'

// DEMO DATA
const typeOfAirlines = [
	{
		name: 'Star Alliance',
	},
	{
		name: 'Air China',
	},
	{
		name: 'Air India',
	},
	{
		name: 'Air New Zealand',
	},
	{
		name: 'Asiana',
	},
	{
		name: 'Bangkok Airways',
	},
]
const stopPoints = [
	{
		name: 'Nonstop',
	},
	{
		name: 'Up to 1 stops',
	},
	{
		name: 'Up to 2 stops',
	},
	{
		name: 'Any number of stops',
	},
]

//
const TabFilters = () => {
	const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false)
	const [isOnSale, setIsOnSale] = useState(true)
	const [rangePrices, setRangePrices] = useState([100, 5000])
	const [tripTimes, setTripTimes] = useState(10)
	const [stopPontsStates, setStopPontsStates] = useState<string[]>([])
	const [airlinesStates, setAirlinesStates] = useState<string[]>([])

	//
	let [catTimes, setCatTimes] = useState({
		'Take Off': {
			Departure: [0, 24],
			Arrival: [0, 24],
		},
		Landing: {
			Departure: [0, 24],
			Arrival: [0, 24],
		},
	})

	//
	const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false)
	const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true)

	//
	const handleChangeStopPoint = (checked: boolean, name: string) => {
		checked
			? setStopPontsStates([...stopPontsStates, name])
			: setStopPontsStates(stopPontsStates.filter((i) => i !== name))
	}

	const handleChangeAirlines = (checked: boolean, name: string) => {
		checked
			? setAirlinesStates([...airlinesStates, name])
			: setAirlinesStates(airlinesStates.filter((i) => i !== name))
	}

	//
	const renderXClear = () => {
		return (
			<span className="ms-3 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white">
				<XMarkIcon className="h-3 w-3" />
			</span>
		)
	}

	const renderTabsTimeFlightTab = () => {
		return (
			<div>
				<TabGroup>
					<TabList className="flex gap-x-1 rounded-xl bg-primary-900/10 p-1">
						{Object.keys(catTimes).map((category) => (
							<Tab
								key={category}
								className={({ selected }) =>
									`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:text-primary-400 ${
										selected
											? 'bg-white shadow dark:bg-neutral-800'
											: 'hover:bg-white/[0.15] dark:hover:bg-neutral-800'
									}`
								}
							>
								{category}
							</Tab>
						))}
					</TabList>
					<TabPanels className="mt-2">
						{Object.values(catTimes).map((posts, idx) => {
							return (
								<TabPanel
									key={idx}
									className="space-y-8 rounded-xl bg-neutral-50 p-3 text-start ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:bg-neutral-900"
								>
									<span className="text-sm text-neutral-600 dark:text-neutral-300">
										{idx ? ' Tokyo to Singapore' : ' Singapore to Tokyo'}
									</span>
									<div></div>
									<div className="space-y-3">
										<div className="flex gap-x-2">
											<AirplaneTakeOff01Icon className="h-5 w-5" />
											<span className="text-xs">Departure time:</span>
											<span className="text-xs text-primary-500 dark:text-primary-400">
												{posts.Departure[0]}:00 - {posts.Departure[1]}
												:00
											</span>
										</div>
										<Slider
											range
											min={0}
											max={24}
											defaultValue={posts.Departure}
											onChange={(val) =>
												setCatTimes((catTimes) =>
													!idx
														? {
																...catTimes,
																'Take Off': {
																	...posts,
																	Departure: val as [number, number],
																},
															}
														: {
																...catTimes,
																Landing: {
																	...posts,
																	Departure: val as [number, number],
																},
															},
												)
											}
											allowCross={false}
										/>
									</div>
									<div className="space-y-3">
										<div className="flex gap-x-2">
											<AirplaneLanding02Icon className="h-5 w-5" />
											<span className="text-xs">Arrival time:</span>
											<span className="text-xs text-primary-500 dark:text-primary-400">
												{posts.Arrival[0]}:00 - {posts.Arrival[1]}:00
											</span>
										</div>
										<Slider
											range
											min={0}
											max={24}
											defaultValue={posts.Arrival}
											onChange={(val) =>
												setCatTimes((catTimes) =>
													!idx
														? {
																...catTimes,
																'Take Off': {
																	...posts,
																	Arrival: val as [number, number],
																},
															}
														: {
																...catTimes,
																Landing: {
																	...posts,
																	Arrival: val as [number, number],
																},
															},
												)
											}
											allowCross={false}
										/>
									</div>
								</TabPanel>
							)
						})}
					</TabPanels>
				</TabGroup>
			</div>
		)
	}

	const renderTabsTypeOfAirlines = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none dark:border-neutral-700 ${open ? '!border-primary-500' : ''} ${
								!!airlinesStates.length
									? '!border-primary-500 bg-primary-50'
									: ''
							} `}
						>
							<span>Airlines</span>
							{!airlinesStates.length ? (
								<ChevronDownIcon className="ms-1 h-4 w-4" />
							) : (
								<span onClick={() => setAirlinesStates([])}>
									{renderXClear()}
								</span>
							)}
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
							<PopoverPanel className="absolute start-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										<Checkbox
											name="All Airlines"
											label="All Airlines"
											defaultChecked={airlinesStates.includes('All Airlines')}
											onChange={(checked) =>
												handleChangeAirlines(checked, 'All Airlines')
											}
										/>
										<hr />
										{typeOfAirlines.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													defaultChecked={airlinesStates.includes(item.name)}
													onChange={(checked) =>
														handleChangeAirlines(checked, item.name)
													}
												/>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={() => {
												close()
												setAirlinesStates([])
											}}
											sizeClass="px-4 py-2 sm:px-5"
										>
											{T['common']['Clear']}
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											{T['common']['Apply']}
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsStopPoints = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none dark:border-neutral-700 ${open ? '!border-primary-500' : ''} ${
								!!stopPontsStates.length
									? '!border-primary-500 bg-primary-50'
									: ''
							} `}
						>
							<span>Stop points</span>
							{!stopPontsStates.length ? (
								<ChevronDownIcon className="ms-1 h-4 w-4" />
							) : (
								<span onClick={() => setStopPontsStates([])}>
									{renderXClear()}
								</span>
							)}
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
							<PopoverPanel className="absolute start-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{stopPoints.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													defaultChecked={stopPontsStates.includes(item.name)}
													onChange={(checked) =>
														handleChangeStopPoint(checked, item.name)
													}
												/>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird
											onClick={() => {
												close()
												setStopPontsStates([])
											}}
											sizeClass="px-4 py-2 sm:px-5"
										>
											{T['common']['Clear']}
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											{T['common']['Apply']}
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsTimeFlight = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm focus:outline-none dark:border-neutral-700 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Flight time</span>
							<ChevronDownIcon className="ms-1 h-4 w-4" />
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
							<PopoverPanel className="absolute start-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{renderTabsTimeFlightTab()}
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
											{T['common']['Clear']}
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											{T['common']['Apply']}
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsTripTime = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton className="flex items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none">
							<span>Less than {tripTimes} hours</span>
							{renderXClear()}
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
							<PopoverPanel className="absolute start-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-8 px-5 py-6">
										<div className="space-y-5">
											<div className="font-medium">
												Trip time:
												<span className="ml-1 text-sm font-normal text-primary-500">{` <${tripTimes} hours`}</span>
											</div>

											<Slider
												min={1}
												max={72}
												defaultValue={tripTimes}
												onChange={(e) => setTripTimes(e as number)}
											/>
										</div>
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
											{T['common']['Clear']}
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											{T['common']['Apply']}
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabsPriceRage = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton className="flex items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none">
							<span>
								{`$${convertNumbThousand(
									rangePrices[0],
								)} - $${convertNumbThousand(rangePrices[1])}`}{' '}
							</span>
							{renderXClear()}
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
							<PopoverPanel className="absolute start-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-8 px-5 py-6">
										<div className="space-y-5">
											<span className="font-medium">Price per person</span>
											<Slider
												range
												min={100}
												max={5000}
												defaultValue={[rangePrices[0], rangePrices[1]]}
												allowCross={false}
												onChange={(e) => setRangePrices(e as number[])}
											/>
										</div>

										<div className="flex justify-between gap-x-5">
											<div>
												<label
													htmlFor="minPrice"
													className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
												>
													{T['common']['Min price']}
												</label>
												<div className="relative mt-1 rounded-md">
													<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
														<span className="text-neutral-500 sm:text-sm">
															$
														</span>
													</div>
													<input
														type="text"
														name="minPrice"
														disabled
														id="minPrice"
														className="block w-full rounded-full border-neutral-200 pe-3 ps-7 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														value={rangePrices[0]}
													/>
												</div>
											</div>
											<div>
												<label
													htmlFor="maxPrice"
													className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
												>
													{T['common']['Max price']}
												</label>
												<div className="relative mt-1 rounded-md">
													<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
														<span className="text-neutral-500 sm:text-sm">
															$
														</span>
													</div>
													<input
														type="text"
														disabled
														name="maxPrice"
														id="maxPrice"
														className="block w-full rounded-full border-neutral-200 pe-3 ps-7 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														value={rangePrices[1]}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
											{T['common']['Clear']}
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											{T['common']['Apply']}
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderTabOnSale = () => {
		return (
			<div
				className={`flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-sm transition-all focus:outline-none ${
					isOnSale
						? 'border-primary-500 bg-primary-50 text-primary-700'
						: 'border-neutral-300 dark:border-neutral-700'
				}`}
				onClick={() => setIsOnSale(!isOnSale)}
			>
				<span>{T['common']['On sale']}</span>
				{isOnSale && renderXClear()}
			</div>
		)
	}

	const renderMoreFilterItem = (
		data: {
			name: string
			description?: string
			defaultChecked?: boolean
		}[],
	) => {
		const list1 = data.filter((_, i) => i < data.length / 2)
		const list2 = data.filter((_, i) => i >= data.length / 2)
		return (
			<div className="grid grid-cols-2 gap-8">
				<div className="flex flex-col space-y-5">
					{list1.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							subLabel={item.description}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-5">
					{list2.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							subLabel={item.description}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
			</div>
		)
	}

	// Morefilter for mobile mode
	const renderTabMobileFilter = () => {
		return (
			<div>
				<div
					className="flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-5 py-3 text-sm text-primary-700 focus:outline-none lg:hidden"
					onClick={openModalMoreFilterMobile}
				>
					<FunnelIcon className="me-2 h-5 w-5" />
					<span>
						{T['common']['Filters']}
						{` `}
						(3)
					</span>
				</div>

				<Dialog
					open={isOpenMoreFilterMobile}
					onClose={closeModalMoreFilterMobile}
					className="relative z-50 lg:hidden"
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/50 duration-200 ease-out data-[closed]:opacity-0"
					/>
					<div className="fixed inset-0 flex max-h-screen w-screen items-center justify-center pt-3">
						<DialogPanel
							className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white text-left align-middle shadow-xl duration-200 ease-out data-[closed]:translate-y-16 data-[closed]:opacity-0 dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
							transition
						>
							<div className="relative flex-shrink-0 border-b border-neutral-200 p-4 text-center dark:border-neutral-800">
								<DialogTitle
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									{T['common']['Filters']}
								</DialogTitle>
								<span className="absolute start-3 top-3">
									<ButtonClose onClick={closeModalMoreFilterMobile} />
								</span>
							</div>

							<div className="hiddenScrollbar flex-grow overflow-y-auto text-start">
								<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800 md:px-10">
									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Airlines</h3>
										<div className="relative mt-6">
											{renderMoreFilterItem(typeOfAirlines)}
										</div>
									</div>
									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Stop points</h3>
										<div className="relative mt-6">
											{renderMoreFilterItem(stopPoints)}
										</div>
									</div>

									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Range Prices</h3>
										<div className="relative mt-6">
											<div className="relative flex flex-col space-y-8">
												<div className="space-y-5">
													<Slider
														range
														className="text-red-400"
														min={0}
														max={2000}
														defaultValue={[0, 1000]}
														allowCross={false}
														onChange={(e) => setRangePrices(e as number[])}
													/>
												</div>

												<div className="flex justify-between gap-x-5">
													<div>
														<label
															htmlFor="minPrice"
															className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
														>
															{T['common']['Min price']}
														</label>
														<div className="relative mt-1 rounded-md">
															<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
																<span className="text-sm text-neutral-500">
																	$
																</span>
															</div>
															<input
																type="text"
																name="minPrice"
																disabled
																id="minPrice"
																className="block w-full rounded-full border-neutral-200 pe-3 ps-7 text-sm text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500"
																value={rangePrices[0]}
															/>
														</div>
													</div>
													<div>
														<label
															htmlFor="maxPrice"
															className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
														>
															{T['common']['Max price']}
														</label>
														<div className="relative mt-1 rounded-md">
															<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
																<span className="text-sm text-neutral-500">
																	$
																</span>
															</div>
															<input
																type="text"
																disabled
																name="maxPrice"
																id="maxPrice"
																className="block w-full rounded-full border-neutral-200 pe-3 ps-7 text-sm text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500"
																value={rangePrices[1]}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">
											Strip times
											<span className="ms-1 text-sm font-normal text-primary-500">{` <${tripTimes} hours`}</span>
										</h3>
										<div className="relative mt-6">
											<Slider
												min={1}
												max={72}
												defaultValue={tripTimes}
												onChange={(e) => setTripTimes(e as number)}
											/>
										</div>
									</div>

									{/* --------- */}
									{/* ---- */}
									<div className="py-7">
										<h3 className="text-xl font-medium">Flight times</h3>
										<div className="relative flex flex-col space-y-5 py-5">
											{renderTabsTimeFlightTab()}
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-4 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
								<ButtonThird
									onClick={closeModalMoreFilterMobile}
									sizeClass="px-4 py-2.5 sm:px-5"
								>
									{T['common']['Clear']}
								</ButtonThird>
								<ButtonPrimary
									onClick={closeModalMoreFilterMobile}
									sizeClass="px-4 py-2.5 sm:px-5"
								>
									{T['common']['Apply']}
								</ButtonPrimary>
							</div>
						</DialogPanel>
					</div>
				</Dialog>
			</div>
		)
	}

	return (
		<div className="flex lg:gap-x-4">
			{/* FOR DESKTOP */}
			<div className="hidden gap-x-4 lg:flex">
				{renderTabsTypeOfAirlines()}
				{renderTabsTripTime()}
				{renderTabsStopPoints()}
				{renderTabsPriceRage()}
				{renderTabsTimeFlight()}
				{renderTabOnSale()}
			</div>

			{/* FOR RESPONSIVE MOBILE */}
			<div className="flex gap-x-2.5 lg:hidden">
				{renderTabMobileFilter()}
				{renderTabOnSale()}
			</div>
		</div>
	)
}

export default TabFilters
