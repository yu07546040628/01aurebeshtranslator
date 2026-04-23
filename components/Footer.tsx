import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-10 px-4" style={{ borderColor: 'var(--border-2)', background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <p className="font-bold mb-3" style={{ color: 'var(--text)' }}>Translators</p>
            <ul className="space-y-2" style={{ color: 'var(--text-3)' }}>
              <li><Link href="/" className="hover:opacity-80">Aurebesh</Link></li>
              <li><Link href="/sith" className="hover:opacity-80">Sith Alphabet</Link></li>
              <li><Link href="/huttese" className="hover:opacity-80">Huttese</Link></li>
              <li><Link href="/binary" className="hover:opacity-80">Droidspeak</Link></li>
              <li><Link href="/deathtrooper" className="hover:opacity-80">Death Trooper</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-3" style={{ color: 'var(--text)' }}>Resources</p>
            <ul className="space-y-2" style={{ color: 'var(--text-3)' }}>
              <li><Link href="/alphabet" className="hover:opacity-80">Alphabet Chart</Link></li>
              <li><Link href="/font-download" className="hover:opacity-80">Font Download</Link></li>
              <li><Link href="/blog" className="hover:opacity-80">Blog</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-3" style={{ color: 'var(--text)' }}>Site</p>
            <ul className="space-y-2" style={{ color: 'var(--text-3)' }}>
              <li><Link href="/about" className="hover:opacity-80">About</Link></li>
              <li><Link href="/contact" className="hover:opacity-80">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:opacity-80">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-3" style={{ color: 'var(--text)' }}>Contact</p>
            <a href="mailto:yu07546040628@gmail.com" className="text-sm hover:opacity-80" style={{ color: 'var(--text-3)' }}>
              yu07546040628@gmail.com
            </a>
          </div>
        </div>
        <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ borderColor: 'var(--border-2)', color: 'var(--text-3)' }}>
          <p>© {new Date().getFullYear()} freeaurebesh.com — Fan-made Star Wars language tools. Not affiliated with Lucasfilm or Disney.</p>
          <Link href="/privacy-policy" className="hover:opacity-80">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
