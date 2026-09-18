import { Helmet } from 'react-helmet-async'
import { COMPANY } from '@/data/content'

export default function SEO({
  title,
  description = `${COMPANY.name} — eco-friendly professional trash can cleaning in Lakewood Ranch, FL. ${COMPANY.tagline}`,
  path = '',
}) {
  const fullTitle = title ? `${title} | ${COMPANY.name}` : `${COMPANY.name} | ${COMPANY.tagline}`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={`https://cansani.com${path}`} />
    </Helmet>
  )
}
