import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { COMPANY } from '@/data/content'
import truckImg from '@/assets/cansasnibus.jpg'
import logoImg from '@/assets/cansani.jpg'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <img
        src={truckImg}
        alt="CanSani curbside can sanitizing truck in service"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-[72%_center]"
      />
      {/* Strong left scrim so copy stays readable on bright sky / truck wrap */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04101f]/95 via-[#0b1f4a]/82 to-[#0b1f4a]/25 sm:via-[#0b1f4a]/78 sm:to-[#0b1f4a]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04101f]/85 via-transparent to-[#04101f]/45" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-16 pt-24 sm:justify-center sm:pb-24 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <img
            src={logoImg}
            alt="CanSani"
            className="mb-4 h-12 w-12 rounded-xl bg-white object-contain p-1.5 shadow-xl shadow-black/30 sm:mb-6 sm:h-16 sm:w-16"
          />
          <p
            className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: '0 2px 18px rgba(0,0,0,0.45)' }}
          >
            Can<span className="text-leaf-light">Sani</span>
          </p>
          <h1
            className="mt-3 font-display text-xl font-semibold leading-snug text-white sm:mt-4 sm:text-3xl md:text-4xl text-balance"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.4)' }}
          >
            {COMPANY.tagline}
          </h1>
          <p
            className="mt-3 max-w-md text-sm leading-relaxed text-white sm:mt-4 sm:text-lg"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.35)' }}
          >
            Premium trash bin cleaning for Lakewood Ranch, Florida — eco-safe wash, odor control, and photo-proof service.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link to="/book" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Book Now
              </Button>
            </Link>
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="sand" className="w-full shadow-lg shadow-black/25 sm:w-auto">
                See Pricing
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
