import { Link } from 'react-router-dom'
import Accordion from '@/components/ui/Accordion'
import Button from '@/components/ui/Button'
import { FAQS } from '@/data/content'

export default function FAQPreview() {
  return (
    <section className="section-pad bg-white dark:bg-[#0c1e32]">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Questions, answered</h2>
          <p className="mt-3 text-muted">
            Everything you need to know before your first CanSani visit.
          </p>
          <Link to="/faq" className="mt-6 inline-block">
            <Button variant="outline">View all FAQs</Button>
          </Link>
        </div>
        <Accordion items={FAQS.slice(0, 4)} />
      </div>
    </section>
  )
}
