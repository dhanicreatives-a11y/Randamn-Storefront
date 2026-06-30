'use client';

import { useEffect, useState } from 'react';

const stars = [
  { top: '8%',  left: '12%', duration: '2.1s', delay: '0s',    anim: 'twinkle'  },
  { top: '15%', left: '78%', duration: '3.4s', delay: '0.7s',  anim: 'twinkle2' },
  { top: '22%', left: '45%', duration: '1.8s', delay: '1.2s',  anim: 'twinkle'  },
  { top: '35%', left: '88%', duration: '2.7s', delay: '0.3s',  anim: 'twinkle2' },
  { top: '42%', left: '23%', duration: '3.1s', delay: '2.1s',  anim: 'twinkle'  },
  { top: '55%', left: '67%', duration: '1.6s', delay: '1.8s',  anim: 'twinkle2' },
  { top: '62%', left: '9%',  duration: '2.4s', delay: '0.9s',  anim: 'twinkle'  },
  { top: '18%', left: '56%', duration: '3.8s', delay: '2.5s',  anim: 'twinkle2' },
  { top: '78%', left: '34%', duration: '1.9s', delay: '0.4s',  anim: 'twinkle'  },
  { top: '30%', left: '92%', duration: '2.9s', delay: '1.6s',  anim: 'twinkle2' },
  { top: '70%', left: '72%', duration: '3.3s', delay: '2.8s',  anim: 'twinkle'  },
  { top: '48%', left: '5%',  duration: '2.2s', delay: '1.1s',  anim: 'twinkle2' },
];

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      background: '#0d0d0d',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '40px 24px'
    }}>

      {/* hero background image with parallax */}
      <img
        src="/hero.jpeg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          opacity: 0.75,
          zIndex: 0,
          transform: `translateY(${scrollY * 0.4}px)`
        }}
      />

      {/* blinking stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: 2,
            height: 2,
            background: '#ffffff',
            borderRadius: '50%',
            animation: `${s.anim} ${s.duration} ${s.delay} ease-in-out infinite`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* giant ghost text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '18vw',
        fontWeight: 900,
        color: '#F5F5F5',
        opacity: 0.04,
        letterSpacing: '-0.04em',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 1
      }}>RANDAMN</div>

      {/* red splatter top right */}
      <svg aria-hidden="true" focusable="false" style={{position:'absolute',top:24,right:24,width:80,height:80,zIndex:2}} viewBox="0 0 100 100">
        <path fill="#A8192E" d="M50 8C56 4,64 10,68 7C72 4,74 14,80 16C86 18,84 28,88 33C92 38,86 44,86 50C86 56,92 62,88 67C84 72,86 82,80 84C74 86,72 96,68 93C64 90,56 96,50 92C44 88,36 94,32 90C28 86,26 76,20 74C14 72,16 62,12 57C8 52,14 44,14 38C14 32,8 24,14 20C20 16,18 6,24 8C30 10,32 2,38 6C44 10,44 4,50 8Z"/>
      </svg>

      {/* bottom left text */}
      <div style={{position:'relative',zIndex:2}}>
        <p style={{
          fontSize: 10,
          color: '#A8192E',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 12
        }}>est. from a cosmic accident</p>
        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 80px)',
          fontWeight: 900,
          color: '#F5F5F5',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          transform: 'rotate(-1.5deg)',
          display: 'inline-block'
        }}>life is<br/><span style={{color:'#A8192E'}}>#RanDamn</span></h1>
      </div>

      {/* bottom right drop counter */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        right: 24,
        border: '1px solid #222',
        padding: '12px 16px',
        textAlign: 'right',
        transform: 'rotate(2deg)',
        zIndex: 2
      }}>
        <p style={{fontSize:9,color:'#888',letterSpacing:'0.2em',textTransform:'uppercase'}}>latest drop</p>
        <p style={{fontSize:32,fontWeight:900,color:'#F5F5F5',lineHeight:1}}>001</p>
        <p style={{fontSize:9,color:'#A8192E',letterSpacing:'0.1em'}}>no schedule. ever.</p>
      </div>

    </section>
  );
}
