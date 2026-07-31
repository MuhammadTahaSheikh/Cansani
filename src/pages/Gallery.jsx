import SEO from '@/components/layout/SEO'
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider'
import { GALLERY } from '@/data/content'

export default function Gallery() {
  return (
    <>
      <SEO title="Gallery" description="Before and after CanSani trash bin cleaning photos." path="/gallery" />
      <section className="pt-12">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Gallery</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted">Real cleans from Lakewood Ranch routes.</p>
        </div>
        <BeforeAfterSlider />
        <div className="container-page pb-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.flatMap((g, i) => [
              <img key={`b-${i}`} src={g.before} alt="Before" className="aspect-[4/3] rounded-3xl object-cover" />,
              <img key={`a-${i}`} src={g.after} alt="After" className="aspect-[4/3] rounded-3xl object-cover" />,
            ])}
          </div>
        </div>
      </section>
    </>
  )
}
