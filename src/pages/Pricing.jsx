import SEO from '@/components/layout/SEO'
import PricingCards from '@/components/home/PricingCards'
import Accordion from '@/components/ui/Accordion'

export default function Pricing() {
  return (
    <>
      <SEO title="Pricing" description="CanSani bin cleaning plans: Monthly, Bi-Weekly, Quarterly, and One-Time." path="/pricing" />
      <div className="pt-10">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Pricing</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Transparent rates. No surprise fees. Cancel or skip anytime from your portal.
          </p>
        </div>
        <PricingCards />
        <section className="pb-20">
          <div className="container-page max-w-2xl">
            <h2 className="mb-4 font-display text-2xl font-bold">Pricing FAQ</h2>
            <Accordion
              items={[
                { q: 'Are taxes included?', a: 'Prices shown are base rates. Applicable sales tax is calculated at checkout.' },
                { q: 'Can I change plans later?', a: 'Yes — upgrade or downgrade anytime from Subscription in your dashboard.' },
                { q: 'What about extra bins?', a: 'Plans include up to two bins. Additional carts are $15 each per visit.' },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  )
}
