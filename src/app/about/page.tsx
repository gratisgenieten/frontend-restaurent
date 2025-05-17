import rightImg from '@/images/about-hero-right.png'
import React, { FC } from 'react'
import SectionFounder from './SectionFounder'
import SectionStatistic from './SectionStatistic'
import SectionHero from './SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import BackgroundSection from '@/components/BackgroundSection'
import SectionClientSay from '@/components/SectionClientSay'
import SectionSubscribe2 from '@/components/SectionSubscribe2'

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
	return (
    <div className="nc-PageAbout relative overflow-hidden">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container space-y-16 py-16 lg:space-y-28 lg:py-28">
        <SectionHero
          rightImg={rightImg}
          heading="Samen maken we elke aankoop een feestje! 👋"
          btnText=""
          subHeading="Welkom bij de familie van GratisGenieten! Shop bij 2000+ webshops, spaar automatisch cashback en trakteer jezelf op gratis genieten bij jouw favoriete lokale hotspots."
        />

        <SectionFounder />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionSubscribe2 />
      </div>
    </div>
  );
}

export default PageAbout
