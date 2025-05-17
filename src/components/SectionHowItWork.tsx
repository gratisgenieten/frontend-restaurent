import React, { FC } from 'react'
import HIW1img from '@/images/HIW1.png'
import HIW2img from '@/images/HIW2.png'
import HIW3img from '@/images/HIW3.png'
import VectorImg from '@/images/VectorHIW.svg'
import Image, { StaticImageData } from 'next/image'
import Heading from '@/shared/Heading'

export interface SectionHowItWorkProps {
	className?: string
	data?: {
		id: number
		title: string
		desc: string
		img: StaticImageData
		imgDark?: StaticImageData
	}[]
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: HIW1img,
    title: "Makkelijk sparen",
    desc: "In enkele kliks ben jij al bij 2000+ webshops aan het sparen!",
  },
  {
    id: 2,
    img: HIW2img,
    title: "Honderden euro`s",
    desc: "Je cashback loopt snel op tot honderden euro`s per jaar!",
  },
  {
    id: 3,
    img: HIW3img,
    title: "2e voucher gratis!",
    desc: "Automatisch sparen voor de 2e voucher betekend veel GratisGenieten!",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
	className = '',
	data = DEMO_DATA,
}) => {
	return (
		<div
			className={`nc-SectionHowItWork ${className}`}
			data-nc-id="SectionHowItWork"
		>
			<Heading isCenter desc="Altijd voordeel, ga GratisGenieten">
			Aanmelden is gratis
			</Heading>
			<div className="relative mt-20 grid gap-20 md:grid-cols-3">
				<Image
					className="absolute inset-x-0 top-10 hidden md:block"
					src={VectorImg}
					alt=""
				/>
				{data.map((item) => (
					<div
						key={item.id}
						className="relative mx-auto flex max-w-xs flex-col items-center"
					>
						{item.imgDark ? (
							<>
								<Image
									className="mx-auto mb-8 block max-w-[180px] dark:hidden"
									src={item.img}
									alt=""
								/>
								<Image
									alt=""
									className="mx-auto mb-8 hidden max-w-[180px] dark:block"
									src={item.imgDark}
								/>
							</>
						) : (
							<Image
								alt=""
								className="mx-auto mb-8 max-w-[180px]"
								src={item.img}
							/>
						)}
						<div className="mt-auto text-center">
							<h3 className="text-xl font-semibold">{item.title}</h3>
							<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
								{item.desc}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default SectionHowItWork
