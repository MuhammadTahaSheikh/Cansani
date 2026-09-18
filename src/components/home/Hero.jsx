import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import BrandLogo from '@/components/BrandLogo'
import { COMPANY } from '@/data/content'
import truckImg from '@/assets/cansasnibus.jpg'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <img
        src={truckImg}
        alt="Can Sani curbside can sanitizing truck in service"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-[72%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#123a58]/95 via-[#123a58]/82 to-[#123a58]/25 sm:via-[#123a58]/78 sm:to-[#123a58]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#123a58]/85 via-transparent to-[#123a58]/45" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-16 pt-24 sm:justify-center sm:pb-24 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <BrandLogo
            variant="primary"
            className="mb-5 h-28 w-28 rounded-2xl bg-white object-contain p-1.5 shadow-xl shadow-black/30 sm:mb-6 sm:h-36 sm:w-36"
          />
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-aqua sm:text-sm">
            Garbage can cleaner
          </p>
          <h1
            className="mt-2 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:mt-3 sm:text-5xl md:text-6xl text-balance"
            style={{ textShadow: '0 2px 18px rgba(0,0,0,0.45)' }}
          >
            {COMPANY.tagline}
          </h1>
          <p
            className="mt-3 max-w-md text-sm leading-relaxed text-white sm:mt-4 sm:text-lg"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.35)' }}
          >
            {COMPANY.description}
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
