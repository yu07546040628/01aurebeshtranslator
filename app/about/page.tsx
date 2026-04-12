import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--gold)' }}>
          关于本项目
        </h1>

        <div className="space-y-8">
          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>什么是 Aurebesh？</h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
              奥雷贝什文（Aurebesh）是星球大战宇宙中银河共和国/帝国的官方书写系统。
              它在星战系列的标识、屏幕显示和道具上随处可见，是一套完整的字母表系统，每个字母对应英语的一个字母或双字母组合（Dipthong）。
            </p>
          </section>

          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>支持的语言</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Aurebesh', desc: '银河共和国标准文字，基于腓尼基 Unicode 字符集渲染', color: 'var(--gold)' },
                { name: 'Sith (Ur-Kittât)', desc: '古西斯帝国文字，基于楔形文字 Unicode 字符集渲染', color: 'var(--sith)' },
                { name: 'Huttese', desc: '赫特人词汇替换，保留原词汇形态', color: 'var(--huttese)' },
                { name: 'Droidspeak', desc: 'R2-D2 风格摩斯码编码', color: 'var(--binary)' },
              ].map(lang => (
                <div key={lang.name} className="p-4 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
                  <div className="font-bold mb-1" style={{ color: lang.color }}>{lang.name}</div>
                  <div className="text-sm" style={{ color: 'var(--text-3)' }}>{lang.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border-2)' }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>技术实现</h2>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-2)' }}>
              <li>• <strong style={{ color: 'var(--text)' }}>Next.js 15</strong> — App Router 架构</li>
              <li>• <strong style={{ color: 'var(--text)' }}>Aurebesh 引擎</strong> — 优先匹配双字母组合（12个 Dipthong），支持大写字母镜像翻转</li>
              <li>• <strong style={{ color: 'var(--text)' }}>字形渲染</strong> — 腓尼基 Unicode 字符块作为视觉替代（无授权限制）</li>
              <li>• <strong style={{ color: 'var(--text)' }}>PNG 导出</strong> — html2canvas 动态加载（避免 SSR 问题）</li>
              <li>• <strong style={{ color: 'var(--text)' }}>SVG 导出</strong> — 纯 JavaScript SVG 生成器</li>
              <li>• <strong style={{ color: 'var(--text)' }}>分享链接</strong> — URL Query Params 编码</li>
            </ul>
          </section>

          <div className="text-center">
            <Link
              href="/translator"
              className="inline-block px-8 py-3 rounded-lg font-bold transition-all"
              style={{ background: 'var(--gold)', color: '#000' }}
            >
              开始翻译 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
