'use client';

import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function Comments() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  /* 跟随网站亮暗模式 */
  useEffect(() => {
    const update = () => {
      setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
    };
    update();

    /* 监听主题切换 */
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="comments-section">
      <div className="wrap">

        {/* 标题 */}
        <div className="section-label" style={{ marginBottom: '32px' }}>
          <span className="section-label__line" />
          <span className="section-label__text">Comments</span>
          <span className="section-label__line" />
        </div>

        <div className="comments-box">
          <Giscus
            repo="yu07546040628/01aurebeshtranslator"
            repoId="R_kgDOSAhILw"
            category="Announcements"
            categoryId="DIC_kwDOSAhIL84C6yp0"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={theme === 'light' ? 'light' : 'dark_dimmed'}
            lang="en"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}
