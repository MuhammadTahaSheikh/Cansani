import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description = 'CanSani — Premium trash bin cleaning in Lakewood Ranch, FL. Sparkling bins. Spotless curb appeal.',
  path = '',
}) {
  const fullTitle = title ? `${title} | CanSani` : 'CanSani | Sparkling Bins. Spotless Curb Appeal.'
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
