import StarCanvas from '@/components/StarCanvas'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import FreeServices from '@/components/FreeServices'
import LoveHubSection from '@/components/LoveHubSection'
import Pricing from '@/components/Pricing'
import PremiumServices from '@/components/PremiumServices'
import ReportPreview from '@/components/ReportPreview'
import Testimonials from '@/components/Testimonials'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <StarCanvas />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <FreeServices />
        <LoveHubSection />
        <Pricing />
        <PremiumServices />
        <ReportPreview />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
