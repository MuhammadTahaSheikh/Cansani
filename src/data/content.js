import beforeBin from '@/assets/before-bin.png'
import afterBin from '@/assets/after-bin.png'
import beforeBinInside from '@/assets/before-bin-inside.png'
import afterBinInside from '@/assets/after-bin-inside.png'

export const PLANS = [
  {
    id: 'biweekly',
    name: 'Bi-Weekly',
    price: 29,
    period: 'per clean',
    description: 'Bins Cleaned Every 2 Weeks',
    washesLabel: '26 Washes Per Year',
    features: ['Priority scheduling', 'Odor neutralization', 'Photo report', 'Member discounts'],
    popular: true,
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: 39,
    period: 'per month',
    description: 'Bins Cleaned Once Per Month',
    washesLabel: '12 Washes Per Year',
    features: ['1–2 bins included', 'Eco-friendly wash', 'Photo report', 'Flexible skip'],
    popular: false,
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: 49,
    period: 'per quarter',
    description: 'Bins Cleaned Every 3 Months',
    washesLabel: '4 Washes Per Year',
    features: ['Deep sanitizing', 'Lid & wheel detail', 'Photo report', 'Reminder texts'],
    popular: false,
  },
  {
    id: 'onetime',
    name: 'One-Time',
    price: 69,
    period: 'per bin',
    description: 'Single Sparkling Clean',
    washesLabel: '1 Wash — Anytime',
    features: ['Same-week slots', 'Hot water wash', 'Deodorize', 'No commitment'],
    popular: false,
  },
]

export const SERVICE_AREAS = [
  'Lakewood Ranch',
  'University Park',
  'The Lake Club',
  'Country Club East',
  'Greenbrook',
  'Summerfield',
  'Lakewood Ranch Village',
  'Main Street at Lakewood Ranch',
  'Palmer Ranch',
  'Sarasota',
  'Bradenton',
  'Parrish',
  'Ellenton',
  'Lakewood Ranch East',
  'Lakewood Ranch Golf & Country Club',
  'Siesta Key',
]

export const FAQS = [
  {
    q: 'How does trash bin cleaning work?',
    a: 'Place your bins curbside on your scheduled day. Our tech arrives with a mobile wash unit, high-pressure hot water, and eco-safe sanitizer. We scrub interiors, rinse, deodorize, and leave photo proof in your portal.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'We proudly serve Lakewood Ranch, Florida and nearby communities including Sarasota, Bradenton, University Park, Palmer Ranch, Parrish, and more. Enter your address during booking to confirm coverage.',
  },
  {
    q: 'What if my bins are empty or I need to skip?',
    a: 'Subscribers can skip or reschedule from the customer portal up to 24 hours before service with no penalty.',
  },
  {
    q: 'Is your cleaning eco-friendly?',
    a: 'Yes. We use biodegradable detergents and reclaim wastewater through our closed-loop system whenever possible.',
  },
  {
    q: 'How many bins can I include?',
    a: 'Plans include up to two residential bins. Additional bins can be added as extras during booking.',
  },
  {
    q: 'Do you clean recycling and compost bins?',
    a: 'Absolutely — trash, recycling, and compost carts are all welcome.',
  },
]

export const BLOG_POSTS = [
  {
    slug: 'why-bin-cleaning-matters',
    title: 'Why Bin Cleaning Matters for Curb Appeal',
    excerpt: 'A sparkling can says as much about your home as a fresh lawn.',
    date: '2026-06-12',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'Home Tips',
    content: `Florida heat and humidity turn trash bins into odor factories. Regular professional cleaning protects your curb appeal, reduces pests, and keeps neighbors happy.\n\nCanSani uses hot water, high pressure, and eco-safe sanitizers so every cart looks and smells fresh again.`,
  },
  {
    slug: 'eco-friendly-cleaning',
    title: 'How Eco-Friendly Bin Cleaning Works',
    excerpt: 'Closed-loop wash systems keep chemicals out of storm drains.',
    date: '2026-05-28',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b4b0?w=800&q=80',
    category: 'Sustainability',
    content: `Traditional hose-downs send dirty runoff into the street. Our mobile units capture wastewater and use biodegradable detergents approved for residential use.\n\nYou get a cleaner bin — and Lakewood Ranch keeps cleaner waterways.`,
  },
  {
    slug: 'subscription-vs-onetime',
    title: 'Subscription vs One-Time: Which Plan Fits?',
    excerpt: 'Match your cadence to how often Florida heat hits your bins.',
    date: '2026-05-10',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    category: 'Guides',
    content: `Bi-weekly is our most popular plan for families. Monthly works for smaller households. One-time cleans are perfect before hosting or after a messy week.`,
  },
]

export const TESTIMONIALS = [
  {
    name: 'Megan R.',
    area: 'Lakewood Ranch',
    rating: 5,
    text: 'Our bins looked brand new. The photo report after each visit is such a nice touch.',
  },
  {
    name: 'Carlos V.',
    area: 'University Park',
    rating: 5,
    text: 'Booked bi-weekly and never think about it. Reliable, friendly, and the curb smells fine again.',
  },
  {
    name: 'Priya S.',
    area: 'Sarasota',
    rating: 5,
    text: 'Worth every penny in July. CanSani is the only bin service I recommend to neighbors.',
  },
]

export const REVIEWS = [
  { author: 'Jordan M.', rating: 5, text: 'Professional and fast. Bins sparkle.', date: '2 weeks ago' },
  { author: 'Elena K.', rating: 5, text: 'Easy booking, great communication.', date: '1 month ago' },
  { author: 'Sam T.', rating: 5, text: 'Finally a premium bin clean in Lakewood Ranch.', date: '1 month ago' },
  { author: 'Nina P.', rating: 4, text: 'Love the subscription. Occasional delay but quality is top.', date: '2 months ago' },
]

export const GALLERY = [
  {
    before: beforeBin,
    after: afterBin,
    caption: 'Exterior cart refresh — grimy streaks to curb-ready shine',
  },
  {
    before: beforeBinInside,
    after: afterBinInside,
    caption: 'Interior deep clean — sludge removed, sanitized & fresh',
  },
]

export const EXTRAS = [
  { id: 'extra-bin', name: 'Extra Bin', price: 15, description: 'Add another trash, recycle, or compost cart' },
  { id: 'deodorize', name: 'Premium Deodorize', price: 8, description: 'Extended odor neutralization treatment' },
  { id: 'lid-detail', name: 'Lid & Wheel Detail', price: 10, description: 'Scrub lids, handles, and wheels' },
]

export const COMPANY = {
  name: 'CanSani',
  tagline: 'Sparkling bins. Spotless curb appeal.',
  phone: '(941) 555-0199',
  phoneHref: 'tel:+19415550199',
  email: 'hello@cansani.com',
  address: 'Lakewood Ranch, FL',
  hours: 'Mon–Sat 7am–6pm',
}
