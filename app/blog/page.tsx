import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Blog – Aurebesh Translator',
  description: 'Guides and articles about Aurebesh, Star Wars languages, and fan culture.',
  alternates: { canonical: 'https://www.freeaurebesh.com/blog' },
}

const posts = [
  {
    slug: 'what-is-aurebesh',
    title: 'What Is Aurebesh? The Complete Guide to the Star Wars Alphabet',
    description: 'Everything you need to know about Aurebesh — the official writing system of the Galactic Republic and Empire, as seen throughout the Star Wars universe.',
    date: 'April 2025',
  },
  {
    slug: 'write-your-name-in-aurebesh',
    title: 'How to Write Your Name in Aurebesh',
    description: 'A step-by-step guide to translating your name into Aurebesh script, including how dipthongs work and tips for tattoos.',
    date: 'April 2025',
  },
  {
    slug: 'aurebesh-in-star-wars',
    title: 'Aurebesh in Star Wars: Every Time the Script Appears On Screen',
    description: 'From the original trilogy to The Mandalorian and Andor — a deep dive into every notable Aurebesh appearance in Star Wars canon.',
    date: 'April 2025',
  },
]

export default function BlogPage() {
  return (
    <>
    <Nav />
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--text-3)' }}>
            Guides & Articles
          </p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold)' }}>Blog</h1>
          <p className="text-lg" style={{ color: 'var(--text-2)' }}>
            Deep dives into Aurebesh, Star Wars languages, and fan culture.
          </p>
        </header>

        <div className="space-y-4">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-xl border transition-opacity hover:opacity-80"
              style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}
            >
              <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>{post.date}</p>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>{post.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
