import SectionOurFeatures from '@/components/SectionOurFeatures'
import SectionOurFeaturesCashBack from '@/components/SectionOurFeaturesCashBack'
import rightImgPng from '@/images/our-features-2.png'
function page() {
  return (
    <div className='container py-4'>
        <SectionOurFeaturesCashBack type="type2" rightImg={rightImgPng} />
    </div>
  )
}

export default page