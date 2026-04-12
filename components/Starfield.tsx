'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let stars: Array<{x:number;y:number;r:number;a:number;da:number;speed:number}> = [];
    let animId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function initStars() {
      stars = [];
      const n = Math.floor((W * H) / 4000);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random(),
          da: (Math.random() - 0.5) * 0.005,
          speed: Math.random() * 0.06 + 0.01,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const s of stars) {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200,210,255,${s.a * 0.7})`;
        ctx!.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    const onResize = () => { resize(); initStars(); };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
