'use client'

import Heading from '@/shared/Heading'
import React, { FC, useState } from 'react'
import clientSayMain from '@/images/clientSayMain.png'
import sectionClientSayBG from '@/images/SectionClientSayBG.png'
import quotationImg from '@/images/quotation.png'
import quotationImg2 from '@/images/quotation2.png'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable'
import { variants } from '@/utils/animationVariants'

export interface SectionClientSayProps {
	className?: string
	data?: typeof DEMO_DATA
}

const DEMO_DATA = [
	{
		id: 1,
		clientName: 'Tiana Abie',
		clientAddress: 'Malaysia',
		content:
			'This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!',
	},
	{
		id: 2,
		clientName: 'Lennie Swiffan',
		clientAddress: 'London',
		content:
			'This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!',
	},
	{
		id: 3,
		clientName: 'Berta Emili',
		clientAddress: 'Tokyo',
		content:
			'This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!',
	},
]

const SectionClientSay: FC<SectionClientSayProps> = ({
	className = '',
	data = DEMO_DATA,
}) => {
	const [index, setIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	function changeItemId(newVal: number) {
		if (newVal > index) {
			setDirection(document.dir === 'rtl' ? -1 : 1)
		} else {
			setDirection(document.dir === 'rtl' ? 1 : -1)
		}
		setIndex(newVal)
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (document.dir === 'rtl') {
				if (index > 0) {
					changeItemId(index - 1)
				}
			} else if (index < data?.length - 1) {
				changeItemId(index + 1)
			}
		},
		onSwipedRight: () => {
			if (document.dir === 'rtl') {
				if (index < data?.length - 1) {
					changeItemId(index + 1)
				}
			} else if (index > 0) {
				changeItemId(index - 1)
			}
		},
		trackMouse: true,
	})

	let currentItem = data[index]
	return (
		<div className={`nc-SectionClientSay relative ${className} `}>
			<Heading desc="Let's see what people think of Chisfis" isCenter>
				Good news from far away
			</Heading>
			<div className="relative mx-auto max-w-2xl md:mb-16">
				<div className="absolute -inset-28 top-0 hidden items-center justify-center lg:flex">
					<Image
						className="mx-auto flex-1"
						src={sectionClientSayBG}
						alt="bg"
						sizes="(max-width: 1000px) 90vw, 100vw"
					/>
				</div>

				<Image
					className="mx-auto max-w-20"
					src={clientSayMain}
					alt="main client"
				/>
				<div className="relative mt-12 lg:mt-16">
					<Image
						className="absolute right-full top-1 -me-16 opacity-50 md:opacity-100 lg:me-3"
						src={quotationImg}
						alt=""
					/>
					<Image
						className="absolute left-full top-1 -ms-16 hidden opacity-50 sm:block md:opacity-100 lg:ms-3"
						src={quotationImg2}
						alt=""
					/>

					<MotionConfig
						transition={{
							x: { type: 'spring', stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
					>
						<div
							className={`relative overflow-hidden whitespace-nowrap`}
							{...handlers}
						>
							<AnimatePresence initial={false} custom={direction}>
								<motion.div
									key={index}
									custom={direction}
									variants={variants(200, 1)}
									initial="enter"
									animate="center"
									className="inline-flex flex-col items-center whitespace-normal text-center"
								>
									<>
										<span className="block text-lg sm:text-xl lg:text-2xl">
											{currentItem.content}
										</span>
										<span className="mt-8 block text-lg font-semibold sm:text-xl lg:text-2xl">
											{currentItem.clientName}
										</span>
										<div className="mt-2 flex items-center gap-x-2 text-neutral-400 sm:text-lg">
											<MapPinIcon className="h-5 w-5" />
											<span>{currentItem.clientAddress}</span>
										</div>
									</>
								</motion.div>
							</AnimatePresence>

							<div className="mt-10 flex items-center justify-center gap-x-2">
								{data.map((item, i) => (
									<button
										className={`h-2 w-2 rounded-full ${
											i === index ? 'bg-black/70' : 'bg-black/10'
										}`}
										onClick={() => changeItemId(i)}
										key={i}
									/>
								))}
							</div>
						</div>
					</MotionConfig>
				</div>
			</div>
		</div>
	)
}

export default SectionClientSay
