import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@/components/layout/SEO'
import Spinner from '@/components/ui/Spinner'
import { BLOG_POSTS } from '@/data/content'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get('/blogs')
        const items = data.data?.items || data.data || []
        if (!cancelled) setPosts(items.length ? items : BLOG_POSTS)
      } catch {
        if (!cancelled) {
          setPosts(BLOG_POSTS)
          setError('')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <SEO title="Blog" description="Tips and guides from CanSani on bin care and curb appeal." path="/blog" />
      <section className="section-pad">
        <div className="container-page">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="mt-3 text-muted">Guides for cleaner bins and happier curbs.</p>
          {loading && (
            <div className="mt-16 flex justify-center">
              <Spinner />
            </div>
          )}
          {error && <p className="mt-8 text-sm text-red-600">{error}</p>}
          {!loading && !posts.length && (
            <p className="mt-10 text-muted">No posts yet. Check back soon.</p>
          )}
          {!loading && posts.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug || post.id}
                  to={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-3xl border border-charcoal/8 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-mint/10 dark:bg-[#0c1e32]"
                >
                  <img
                    src={post.image || post.cover_image || post.featured_image}
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition group-hover:scale-[1.02]"
                  />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                      {post.category || 'Guides'}
                    </p>
                    <h2 className="mt-1 font-display text-lg font-semibold">{post.title}</h2>
                    <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                    {(post.date || post.published_at || post.created_at) && (
                      <p className="mt-3 text-xs text-muted">
                        {formatDate(post.date || post.published_at || post.created_at)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
