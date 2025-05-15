import SectionOurFeatures from '@/components/SectionOurFeatures'
import rightImgPng from '@/images/our-features-2.png'
function page() {
  return (
    <div className='px-0 py-4'>
        <SectionOurFeatures type="type2" rightImg={rightImgPng} />
    </div>
  )
}

export default page