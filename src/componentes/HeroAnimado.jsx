import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { reduzirMovimento } from '../movimento.js';

export default function HeroAnimado({ titulo, sub, children }) {
  const tituloRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const reduced = reduzirMovimento();
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Letra por letra
      if (tituloRef.current) {
        const spans = tituloRef.current.querySelectorAll('.hero-letra');
        gsap.fromTo(spans, 
          { opacity: 0, y: 30, rotateX: -60 },
          { 
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.55,
            stagger: 0.025,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }
      // Subtítulo
      if (subRef.current) {
        gsap.fromTo(subRef.current,
          { opacity: 0, y: 24 },
          { 
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.9,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [titulo]);

  // Quebrar título em spans, preservando tags especiais para gradiente
  const palavrasChave = ['Java/Spring Boot', 'React/Angular'];
  
  const renderizarTitulo = (texto) => {
    // Divide preservando as palavras-chave
    const partes = [];
    let restante = texto;
    
    // Encontrar posições das palavras-chave
    const ocorrencias = [];
    palavrasChave.forEach(pk => {
      let idx = restante.indexOf(pk);
      while (idx !== -1) {
        ocorrencias.push({ idx, len: pk.length, texto: pk });
        idx = restante.indexOf(pk, idx + 1);
      }
    });
    ocorrencias.sort((a, b) => a.idx - b.idx);
    
    let cursor = 0;
    const spans = [];
    let spanIdx = 0;
    
    for (const oc of ocorrencias) {
      // Texto antes
      if (oc.idx > cursor) {
        const antes = restante.slice(cursor, oc.idx);
        antes.split('').forEach(char => {
          spans.push(<span key={spanIdx++} className={`hero-letra${char === ' ' ? ' hero-espaco' : ''}`}>{char === ' ' ? '\u00A0' : char}</span>);
        });
      }
      // Palavra-chave com gradiente
      const palavra = restante.slice(oc.idx, oc.idx + oc.len);
      spans.push(<span key={spanIdx++} className="hero-letra hero-gradiente">{palavra}</span>);
      cursor = oc.idx + oc.len;
    }
    
    // Resto
    if (cursor < restante.length) {
      restante.slice(cursor).split('').forEach(char => {
        spans.push(<span key={spanIdx++} className={`hero-letra${char === ' ' ? ' hero-espaco' : ''}`}>{char === ' ' ? '\u00A0' : char}</span>);
      });
    }
    
    return spans;
  };

  return (
    <section id="topo" className="hero">
      <div className="light-orb light-orb-1"></div>
      <div className="light-orb light-orb-2"></div>
      <div className="light-orb light-orb-3"></div>
      <div className="hero-aurora" aria-hidden="true"></div>
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="particle" style={{
            left: `${(i * 37) % 100}%`, width: 2 + ((i * 13) % 4), height: 2 + ((i * 13) % 4),
            animationDuration: `${9 + ((i * 7) % 10)}s`, animationDelay: `${-((i * 3) % 12)}s`,
          }} />
        ))}
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 ref={tituloRef}>{renderizarTitulo(titulo)}</h1>
          <p ref={subRef}>{sub}</p>
          {children}
        </div>
        <OrbitSceneParallax />
      </div>
    </section>
  );
}

// Órbita com parallax reagindo ao mouse
function OrbitSceneParallax() {
  const stageRef = useRef(null);
  const manualRef = useRef(null);
  const lastX = useRef(null);
  const manualDeg = useRef(0);
  const sceneRef = useRef(null);

  const onMove = (e) => {
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (stage) {
      const r = scene?.parentElement?.getBoundingClientRect();
      if (r) {
        const y = (e.clientY - r.top) / r.height - 0.5;
        const x = (e.clientX - r.left) / r.width - 0.5;
        stage.style.setProperty('--tiltX', `${58 - y * 14}deg`);
        stage.style.setProperty('--tiltY', `${x * 8}deg`);
      }
    }
    if (lastX.current !== null && manualRef.current) {
      const deltaX = e.clientX - lastX.current;
      manualDeg.current += deltaX * 0.7;
      manualRef.current.style.transform = `rotate(${manualDeg.current}deg)`;
    }
    lastX.current = e.clientX;
  };

  const onEnter = (e) => { lastX.current = e.clientX; };
  const onLeave = () => {
    lastX.current = null;
    const stage = stageRef.current;
    if (stage) { stage.style.setProperty('--tiltX', '58deg'); stage.style.setProperty('--tiltY', '0deg'); }
  };

  const ORBIT_ITENS = [
    { emoji: '☕', label: 'Java' },
    { emoji: '🍃', label: 'Spring' },
    { emoji: '⚛️', label: 'React' },
    { emoji: '🐘', label: 'SQL' },
    { emoji: '🐳', label: 'Docker' },
    { emoji: '🔐', label: 'JWT' },
  ];

  return (
    <div className="orbit-scene" ref={sceneRef} onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave} aria-hidden="true">
      <div className="orbit-stage" ref={stageRef}>
        <div className="orbit-hub"><span>{'</>'}</span></div>
        <div className="orbit-manual" ref={manualRef}>
          <div className="orbit-ring">
            {ORBIT_ITENS.map((it, i) => (
              <div className="orbit-item" key={it.label} style={{ '--angle': `${(360 / ORBIT_ITENS.length) * i}deg` }}>
                <div className="orbit-item-counter" title={it.label} style={{ animationDelay: `0s, ${-(i * 1.6)}s` }}>
                  <span className="orbit-item-face" style={{ animationDuration: `${6 + i * 0.8}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}>
                    {it.emoji}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}