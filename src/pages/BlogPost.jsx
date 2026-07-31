import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import SEO from '@/components/layout/SEO'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { BLOG_POSTS } from '@/data/content'
import { formatDate } from '@/lib/utils'
import api from '@/lib/api'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/blogs/${slug}`)
        if (!cancelled) setPost(data.data?.post || data.data)
      } catch {
        const fallback = BLOG_POSTS.find((p) => p.slug === slug)
        if (!cancelled) {
          if (fallback) setPost(fallback)
          else setNotFound(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!loading && notFound) return <Navigate to="/blog" replace />

  const content = post?.content || post?.body || ''
  const paragraphs = typeof content === 'string' ? content.split(/\n\n+/) : []

  return (
    <>
      <SEO
        title={post?.title || 'Blog'}
        description={post?.excerpt}
        path={`/blog/${slug}`}
      />
      <article className="section-pad">
        <div className="container-page max-w-3xl">
          <Link to="/blog" className="text-sm font-medium text-teal">
            ← Back to blog
          </Link>
          {loading && (
            <div className="mt-16 flex justify-center">
              <Spinner />
            </div>
          )}
          {!loading && post && (
            <>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-teal">
                {post.category || 'Guides'}
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold">{post.title}</h1>
              {(post.date || post.published_at || post.created_at) && (
                <p className="mt-2 text-sm text-muted">
                  {formatDate(post.date || post.published_at || post.created_at)}
                </p>
              )}
              {(post.image || post.cover_image || post.featured_image) && (
                <img
                  src={post.image || post.cover_image || post.featured_image}
                  alt=""
                  className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
                />
              )}
              <div className="prose mt-8 space-y-4 leading-relaxed text-muted">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-10 rounded-3xl bg-mint/40 p-6 text-center">
                <p className="font-display text-lg font-semibold">Ready for sparkling bins?</p>
                <Link to="/book" className="mt-4 inline-block">
                  <Button>Book Now</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </article>
    </>
  )
}
