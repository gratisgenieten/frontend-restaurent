import React, { FC } from 'react'
import ButtonCircle from '@/shared/ButtonCircle'
import rightImg from '@/images/custom-home/lan.jpg';

import Badge from '@/shared/Badge'
import Input from '@/shared/Input'
import Image from 'next/image'
import Link from "next/link"
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import T from '@/utils/getT'

export interface SectionSubscribe2Props {
	className?: string
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = '' }) => {
	return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
    >
      <div className="mb-10 flex-shrink-0 lg:mb-0 lg:me-10 lg:w-2/5">
        <h2 className="text-4xl font-semibold">
          Aanmelden = Voordeel pakken! 🎉
        </h2>
        <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
          Wordt lid van de GratisGenieten family en krijg direct €5,- tegoed!
        </span>
        <ul className="mt-10 space-y-4">
          <li className="flex items-center gap-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Aanmelden in enkele stappen
            </span>
          </li>
          <li className="flex items-center gap-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Direct profiteren van cashback!
            </span>
          </li>
        </ul>
        <form className="relative mt-10 max-w-sm">
          <Input
            required
            aria-required
            placeholder={T["common"]["Enter your email"]}
            type="email"
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3"
          />
          <ButtonCircle
            type="submit"
            className="absolute end-1.5 top-1/2 -translate-y-1/2"
            size="w-10 h-10"
          >
            <Link href="/signup" className="">
              <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
            </Link>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow lg:w-3/5 xl:w-2/3">
        <Image
          alt="Subscription Image"
          src={rightImg}
          className="w-full object-contain rounded-lg"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 66vw"

        />
      </div>
    </div>
  );
}

export default SectionSubscribe2
