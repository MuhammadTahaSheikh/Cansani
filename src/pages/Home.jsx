import SEO from '@/components/layout/SEO'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import TrustBadges from '@/components/home/TrustBadges'
import HowItWorks from '@/components/home/HowItWorks'
import ServiceVideo from '@/components/home/ServiceVideo'
import PricingCards from '@/components/home/PricingCards'
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider'
import Testimonials from '@/components/home/Testimonials'
import FAQPreview from '@/components/home/FAQPreview'
import ServiceAreaMap from '@/components/home/ServiceAreaMap'
import GoogleReviews from '@/components/home/GoogleReviews'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { COMPANY } from '@/data/content'

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="CanSani premium trash bin cleaning in Lakewood Ranch, FL. Sparkling bins. Spotless curb appeal."
        path="/"
      />
      <Hero />
      <Stats />
      <TrustBadges />
      <GoogleReviews />
      <HowItWorks />
      <ServiceVideo />
      <PricingCards />
      <BeforeAfterSlider />
      <Testimonials />
      <FAQPreview />
      <ServiceAreaMap />
      <section className="section-pad relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f4a] via-[#1468a8] to-[#2e8b36]" />
        <div className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(91,184,240,0.45), transparent), radial-gradient(ellipse 50% 40% at 85% 20%, rgba(91,200,95,0.35), transparent)',
          }}
        />
        <div className="container-page relative">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready for a sparkling curb?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/75">{COMPANY.tagline}</p>
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link to="/book" className="w-full sm:w-auto">
              <Button size="lg" variant="sand" className="w-full shadow-lg sm:w-auto">
                Book Now
              </Button>
            </Link>
            <a href={COMPANY.phoneHref} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full border-2 border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                {COMPANY.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
