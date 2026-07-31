import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Button from '@/components/ui/Button'
import serviceVideo from '@/assets/MicrosoftTeams-video.mp4'
import truckImg from '@/assets/cansasnibus.jpg'

export default function ServiceVideo() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const startPlayback = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = false
    el.play()
    setPlaying(true)
  }

  return (
    <section className="section-pad bg-charcoal text-white">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-teal-light">In action</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
              Watch how we clean your bins
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              From curb to sparkle — our truck-mounted system lifts, washes, and sanitizes so your carts
              look and smell fresh every visit.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link to="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a clean
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full border-2 border-white/25 bg-transparent text-white hover:border-teal-light hover:bg-white/5 sm:w-auto"
                >
                  Our process
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/40 ring-1 ring-teal/20">
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  poster={truckImg}
                  controls={playing}
                  playsInline
                  preload="metadata"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                >
                  <source src={serviceVideo} type="video/mp4" />
                </video>

                {!playing && (
                  <button
                    type="button"
                    onClick={startPlayback}
                    className="absolute inset-0 flex items-center justify-center bg-[#0b1f4a]/35 transition hover:bg-[#0b1f4a]/25"
                    aria-label="Play service video"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal text-white shadow-xl shadow-teal/40 transition hover:scale-105 hover:bg-teal-light sm:h-20 sm:w-20">
                      <Play size={28} className="ml-1 fill-current" />
                    </span>
                  </button>
                )}
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-white/45 sm:text-left">
              Real CanSani service footage — press play to watch.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
