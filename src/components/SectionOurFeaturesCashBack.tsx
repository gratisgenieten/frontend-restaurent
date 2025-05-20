import React, { FC } from "react";
import rightImgPng from "@/images/newFeatureImg.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";

export interface SectionOurFeaturesCashBackProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeaturesCashBack: FC<SectionOurFeaturesCashBackProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
    >
      {/* Increased image size container */}
      <div className="flex-grow w-full lg:w-3/5 xl:w-2/3">
        <div className="relative w-full h-full">
          <Image
            src={rightImg}
            alt="Feature Image"
            className="w-full object-cover rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 66vw"
          />
        </div>
      </div>
      <div
        className={`mt-10 max-w-2xl flex-shrink-0 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:ps-16" : "lg:pe-16"
        }`}
      >
        <span className="text-sm uppercase tracking-widest text-gray-400">
          GratisGenieten
        </span>
        <h2 className="mt-5 text-4xl font-semibold">Hoe werkt het? </h2>

        <ul className="mt-16 space-y-10">
          <li className="space-y-4">
            <Badge name="Sparen" />
            <span className="block text-xl font-semibold">2000+ webshops aangesloten!</span>
            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
               Meld je aan, kies je webshop, pak
              direct je voordeel via de unieke links in je account!
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Cashen" />
            <span className="block text-xl font-semibold">Doorgaans direct te besteden binnen 14 dagen</span>
            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
            	Gezien de Nederlandse
              wetgeving en retourrecht duurt dit gemiddeld zo`n 14 dagen.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Genieten" />
            <span className="block text-xl font-semibold">Zoek jouw hotspot en reserveer!</span>
            <span className="mt-5 block text-neutral-500 dark:text-neutral-400">
               Snel tientallen euro`s cashback
              zorgt vrijwel direct voor een gratis 2e diner!
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeaturesCashBack;
