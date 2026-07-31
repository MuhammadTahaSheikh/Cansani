import SEO from '@/components/layout/SEO'
import Accordion from '@/components/ui/Accordion'
import { FAQS, COMPANY } from '@/data/content'

export default function FAQ() {
  return (
    <>
      <SEO title="FAQ" description="Frequently asked questions about CanSani trash bin cleaning." path="/faq" />
      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <h1 className="font-display text-4xl font-bold md:text-5xl">FAQ</h1>
          <p className="mt-3 text-muted">
            Still curious? Call us at{' '}
            <a href={COMPANY.phoneHref} className="font-medium text-teal">{COMPANY.phone}</a>.
          </p>
          <div className="mt-8">
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>
    </>
  )
}
