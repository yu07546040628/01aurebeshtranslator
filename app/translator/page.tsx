'use client'

import { useState, useCallback } from 'react'
import Nav from '@/components/Nav'
import { engToAurTokens, aurToEng, DIPTHONGS, ENG_TO_AUR } from '@/lib/aurebesh'
import { engToSith, SITH_MAP } from '@/lib/sith'
import { engToHuttese } from '@/lib/huttese'
import { engToDroid } from '@/lib/droidspeak'

type Lang = 'aurebesh' | 'sith' | 'huttese' | 'droidspeak'
type Dir = 'eng2target' | 'target2eng'

const LANG_CONFIG = {
  aurebesh: { label: 'Aurebesh', color: '#c9a84c', bg: 'from-yellow-900/30', placeholder: 'Aurebesh translation appears here…' },
  sith:     { label: 'Sith Alphabet', color: '#c0392b', bg: 'from-red-900/30', placeholder: 'Ur-Kittât translation appears here…' },
  huttese:  { label: 'Huttese', color: '#27ae60', bg: 'from-green-900/30', placeholder: 'Huttese translation appears here…' },
  droidspeak: { label: 'Droidspeak', color: '#2980b9', bg: 'from-blue-900/30', placeholder: 'Droidspeak binary appears here…' },
}

export default function TranslatorPage() {
  const [lang, setLang] = useState<Lang>('aurebesh')
  const [dir, setDir] = useState<Dir>('eng2target')
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const cfg = LANG_CONFIG[lang]

  const translated = useCallback(() => {
    if (!input.trim()) return ''
    if (dir === 'eng2target') {
      switch (lang) {
        case 'aurebesh': return engToAurTokens(input).map(t => {
          if (!t.key) return t.raw === '\n' ? '\n' : t.raw
          const g = ENG_TO_AUR[t.key] || t.raw
          return t.upper ? `[M:${g}]` : g
        }).join('')
        case 'sith': return engToSith(input)
        case 'huttese': return engToHuttese(input)
        case 'droidspeak': return engToDroid(input)
      }
    } else {
      if (lang === 'aurebesh') return aurToEng(input)
      return input
    }
  }, [input, lang, dir])

  const result = translated()

  const renderAurebesh = () => {
    if (lang !== 'aurebesh' || dir !== 'eng2target' || !input.trim()) return null
    const tokens = engToAurTokens(input)
    return (
      <div className="flex flex-wrap gap-0.5 items-baseline text-3xl leading-relaxed" style={{ fontFamily: "'Noto Sans Phoenician', serif", color: cfg.color }}>
        {tokens.map((t, i) => {
          if (!t.key) {
            if (t.raw === '\n') return <br key={i} />
            return <span key={i} className="text-gray-500 text-base">{t.raw}</span>
          }
          const g = ENG_TO_AUR[t.key] || t.raw
          return (
            <span
              key={i}
              title={t.raw}
              style={{ display: 'inline-block', transform: t.upper ? 'scaleX(-1)' : 'none' }}
            >
              {g}
            </span>
          )
        })}
      </div>
    )
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const handleSwap = () => {
    setDir(d => d === 'eng2target' ? 'target2eng' : 'eng2target')
    setInput('')
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Language Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {(Object.keys(LANG_CONFIG) as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => { setLang(l); setInput('') }}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all border"
              style={{
                background: lang === l ? LANG_CONFIG[l].color : 'transparent',
                color: lang === l ? '#000' : LANG_CONFIG[l].color,
                borderColor: LANG_CONFIG[l].color + '66',
              }}
            >
              {LANG_CONFIG[l].label}
            </button>
          ))}
        </div>

        {/* Translator Card */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>

          {/* Direction Bar */}
          <div className="flex items-center px-6 py-4 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}>
            <span className="text-sm font-semibold" style={{ color: dir === 'eng2target' ? '#e8eaf0' : cfg.color }}>
              {dir === 'eng2target' ? 'English' : cfg.label}
            </span>
            <button
              onClick={handleSwap}
              className="mx-auto flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{ background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
            >
              ⇄ Swap
            </button>
            <span className="text-sm font-semibold" style={{ color: dir === 'target2eng' ? '#e8eaf0' : cfg.color }}>
              {dir === 'target2eng' ? 'English' : cfg.label}
            </span>
          </div>

          {/* Panes */}
          <div className="grid md:grid-cols-2 min-h-[280px]">
            {/* Input */}
            <div className="flex flex-col border-r" style={{ borderColor: 'var(--border)' }}>
              <textarea
                className="flex-1 p-5 bg-transparent resize-none text-base outline-none placeholder:text-gray-600"
                style={{ color: 'var(--text)' }}
                placeholder={dir === 'eng2target' ? 'Type English text here…' : `Paste ${cfg.label} here…`}
                value={input}
                onChange={e => setInput(e.target.value)}
                spellCheck={false}
              />
              <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>{input.length} chars</span>
                <button onClick={() => setInput('')} className="text-xs px-3 py-1 rounded hover:bg-white/5 transition-colors" style={{ color: 'var(--text-3)' }}>✕ Clear</button>
              </div>
            </div>

            {/* Output */}
            <div className="flex flex-col translator-output">
              <div className="flex-1 p-5 min-h-[200px]" style={{ background: `var(--bg-2)` }}>
                {renderAurebesh() || (
                  <p className="text-base leading-relaxed" style={{ color: result ? cfg.color : 'var(--text-3)', fontFamily: lang === 'droidspeak' ? 'monospace' : 'inherit' }}>
                    {result || cfg.placeholder}
                  </p>
                )}
              </div>
              {/* Toolbar */}
              <div className="flex items-center gap-2 px-5 py-3 border-t flex-wrap" style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}>
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40"
                  style={{ background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
                >
                  📋 {copied ? 'Copied!' : 'Copy'}
                </button>
                {lang === 'aurebesh' && (
                  <>
                    <button
                      onClick={() => downloadPNG()}
                      disabled={!result}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40"
                      style={{ background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
                    >
                      ↓ PNG
                    </button>
                    <button
                      onClick={() => downloadSVG(input)}
                      disabled={!result}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40"
                      style={{ background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border-2)' }}
                    >
                      ↓ SVG
                    </button>
                  </>
                )}
                <button
                  onClick={() => shareLink(input, dir)}
                  disabled={!input}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40 ml-auto"
                  style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--gold-dim)' }}
                >
                  🔗 Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Aurebesh Alphabet Chips */}
        {lang === 'aurebesh' && (
          <div className="mt-10">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Click to Insert</h3>

            {/* Letters */}
            <div className="mb-4">
              <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Letters (26)</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(ENG_TO_AUR).filter(([k]) => k.length === 1).map(([eng, aur]) => (
                  <button
                    key={eng}
                    onClick={() => setInput(i => i + eng)}
                    className="flex flex-col items-center px-3 py-2 rounded-lg border text-center transition-all hover:scale-105"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border-2)', minWidth: '52px' }}
                  >
                    <span className="text-xl" style={{ color: 'var(--gold)', fontFamily: "'Noto Sans Phoenician', serif" }}>{aur}</span>
                    <span className="text-xs mt-0.5 uppercase" style={{ color: 'var(--text-3)' }}>{eng}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dipthongs */}
            <div>
              <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Dipthongs (12)</p>
              <div className="flex flex-wrap gap-2">
                {DIPTHONGS.map(dip => (
                  <button
                    key={dip}
                    onClick={() => setInput(i => i + dip)}
                    className="flex flex-col items-center px-3 py-2 rounded-lg border text-center transition-all hover:scale-105"
                    style={{ background: 'var(--bg-3)', borderColor: 'var(--blue)' + '44', minWidth: '58px' }}
                  >
                    <span className="text-xl" style={{ color: 'var(--blue-light)', fontFamily: "'Noto Sans Phoenician', serif" }}>{ENG_TO_AUR[dip]}</span>
                    <span className="text-xs mt-0.5 uppercase" style={{ color: 'var(--text-3)' }}>{dip}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sith Alphabet Chips */}
        {lang === 'sith' && (
          <div className="mt-10">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>All 26 Sith Glyphs — Click to Insert</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(SITH_MAP).map(([eng, sith]) => (
                <button
                  key={eng}
                  onClick={() => setInput(i => i + eng)}
                  className="flex flex-col items-center px-3 py-2 rounded-lg border text-center transition-all hover:scale-105"
                  style={{ background: 'var(--surface)', borderColor: '#c0392b44', minWidth: '52px' }}
                >
                  <span className="text-xl" style={{ color: '#e05050' }}>{sith}</span>
                  <span className="text-xs mt-0.5 uppercase" style={{ color: 'var(--text-3)' }}>{eng}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  )
}

/* ── helpers ── */
function downloadPNG() {
  const el = document.querySelector('.translator-output') as HTMLElement
  if (!el) return
  import('html2canvas').then(({ default: html2canvas }) => {
    html2canvas(el, { backgroundColor: '#0d1117', scale: 2 }).then(canvas => {
      const a = document.createElement('a')
      a.download = 'aurebesh.png'
      a.href = canvas.toDataURL()
      a.click()
    })
  })
}

function downloadSVG(text: string) {
  const { engToAurTokens, ENG_TO_AUR } = require('@/lib/aurebesh')
  const tokens = engToAurTokens(text)
  const CHAR_W = 50, CHAR_H = 64, PAD = 20
  let x = PAD, y = PAD + CHAR_H
  let lines = ''
  for (const t of tokens) {
    if (t.raw === '\n') { x = PAD; y += CHAR_H + 10; continue }
    if (t.raw === ' ')  { x += 25; continue }
    const g = t.key ? (ENG_TO_AUR[t.key] || t.raw) : t.raw
    if (t.upper) {
      lines += `<text x="${x + 25}" y="${y}" text-anchor="middle" transform="scale(-1,1) translate(${-(x * 2 + 50)},0)">${g}</text>\n`
    } else {
      lines += `<text x="${x + 25}" y="${y}" text-anchor="middle">${g}</text>\n`
    }
    x += CHAR_W
    if (x > 1180) { x = PAD; y += CHAR_H + 10 }
  }
  const W = 1200, H = y + PAD
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#07090f"/>
  <style>text{font-family:'Noto Sans Phoenician',serif;font-size:40px;fill:#c9a84c;}</style>
  ${lines}
</svg>`
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const a = document.createElement('a')
  a.download = 'aurebesh.svg'
  a.href = URL.createObjectURL(blob)
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 8000)
}

function shareLink(text: string, dir: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('t', text)
  url.searchParams.set('dir', dir)
  navigator.clipboard.writeText(url.toString()).catch(() => {
    prompt('Share link:', url.toString())
  })
}
