import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ato 1: o menino entra, joga a mochila na cama, senta e o computador liga.
// Ato 2: rolando a página, a câmera entra na tela do monitor.
// Ato 3: dentro da tela flutua a stack, e a cena se funde com o resto do site.
const STACK_TELA = ['React', 'Spring', 'Java', 'Docker', 'PostgreSQL', 'IA', 'Python', 'Vite'];

export default function IntroQuarto({ textos }) {
  const raiz = useRef(null);
  const [legenda, setLegenda] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(raiz);

      // ── Ato 1 ──
      gsap.set([q('.braco'), q('.perna-a'), q('.perna-b')], { transformOrigin: '50% 0%' });
      const ato1 = gsap.timeline({ delay: 0.4 });
      const passos = gsap.timeline({ repeat: 7, yoyo: true, paused: true })
        .to(q('.perna-a'), { rotation: 24, duration: 0.22, ease: 'sine.inOut' }, 0)
        .to(q('.perna-b'), { rotation: -24, duration: 0.22, ease: 'sine.inOut' }, 0)
        .to(q('.braco'), { rotation: -18, duration: 0.22, ease: 'sine.inOut' }, 0);
      ato1
        .add(() => passos.restart())
        .fromTo([q('.menino'), q('.mochila')], { x: -260 }, { x: 600, duration: 2.2, ease: 'none' })
        .add(() => { passos.pause(0); setLegenda(1); })
        // joga a mochila na cama (vai pra trás e cai em arco)
        .to(q('.braco'), { rotation: 150, duration: 0.25, ease: 'power2.out' })
        .to(q('.mochila'), { x: 330, duration: 0.8, ease: 'power1.out' }, '<')
        .to(q('.mochila'), { y: -150, duration: 0.4, ease: 'power2.out' }, '<')
        .to(q('.mochila'), { y: 40, duration: 0.4, ease: 'bounce.out' }, '>')
        .to(q('.mochila'), { rotation: -100, duration: 0.8, ease: 'power1.out', transformOrigin: '50% 50%' }, '<-0.4')
        .to(q('.braco'), { rotation: 0, duration: 0.3 }, '<')
        // anda até a cadeira
        .add(() => passos.restart())
        .to(q('.menino'), { x: 955, duration: 1.4, ease: 'none' })
        .add(() => passos.pause(0))
        // senta
        .to(q('.menino'), { y: 18, duration: 0.35, ease: 'power2.out' })
        .to([q('.perna-a'), q('.perna-b')], { rotation: -80, duration: 0.35, ease: 'power2.out' }, '<')
        .to(q('.braco'), { rotation: -62, duration: 0.35 }, '<')
        // o quarto escurece e o computador liga
        .to(q('.noite'), { opacity: 0.45, duration: 0.6 })
        .to(q('.tela-fundo'), { fill: '#1b2a55', duration: 0.15 }, '>')
        .to(q('.tela-fundo'), { fill: '#24408f', duration: 0.5 })
        .to(q('.brilho'), { opacity: 1, duration: 0.6 }, '<')
        .fromTo(q('.linha-codigo'), { scaleX: 0 }, { scaleX: 1, duration: 0.25, stagger: 0.12, transformOrigin: 'left center' }, '<')
        .add(() => setLegenda(2));

      // estrelas piscando o tempo todo
      gsap.to(q('.estrela'), { opacity: 0.2, duration: 1.2, repeat: -1, yoyo: true, stagger: { each: 0.3, from: 'random' } });

      // ── Ato 2 e 3: zoom na tela conforme rola ──
      const tela = q('.tela-fundo')[0];
      const camera = q('.camera')[0];
      const montarZoom = () => {
        gsap.set(camera, { clearProps: 'transform' });
        const r = tela.getBoundingClientRect();
        const c = camera.getBoundingClientRect();
        const cx = r.left + r.width / 2 - c.left;
        const cy = r.top + r.height / 2 - c.top;
        const escala = Math.max(c.width / r.width, c.height / r.height) * 1.08;
        return { cx, cy, escala, dx: c.width / 2 - cx, dy: c.height / 2 - cy };
      };
      let z = montarZoom();
      const ato2 = gsap.timeline({
        scrollTrigger: {
          trigger: raiz.current, start: 'top top', end: 'bottom bottom', scrub: 0.8,
          invalidateOnRefresh: true,
          onRefreshInit: () => { z = montarZoom(); },
        },
      });
      ato2
        .to(camera, { transformOrigin: () => `${z.cx}px ${z.cy}px`, x: () => z.dx, y: () => z.dy, scale: () => z.escala, ease: 'power2.in', duration: 1 })
        .to(q('.legenda, .pular'), { opacity: 0, duration: 0.2 }, 0)
        .fromTo(q('.noite'), { opacity: 0.45 }, { opacity: 0, duration: 0.3, immediateRender: false }, 0.35)
        .to(q('.linha-codigo'), { opacity: 0, duration: 0.2 }, 0.45)
        .fromTo(q('.stack-tela'), { opacity: 0 }, { opacity: 1, stagger: 0.04, duration: 0.3 }, 0.5)
        .to(q('.fusao'), { opacity: 1, duration: 0.12 }, 0.9);
      gsap.to(q('.stack-tela'), { y: -6, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.2 });
    }, raiz);
    return () => ctx.revert();
  }, []);

  const pular = () => {
    const destino = document.getElementById('topo');
    if (destino) window.scrollTo({ top: destino.offsetTop, behavior: 'smooth' });
  };

  return (
    <section className="intro" ref={raiz} aria-label={textos.rotulo}>
      <div className="intro-palco">
        <div className="camera">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" className="intro-svg" overflow="visible" role="img" aria-label={textos.rotulo}>
            <defs>
              <linearGradient id="parede" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b2f6b" /><stop offset="1" stopColor="#5a4a8f" /></linearGradient>
              <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d1238" /><stop offset="1" stopColor="#2b2a6e" /></linearGradient>
              <radialGradient id="luz-tela" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#7fb2ff" stopOpacity=".75" /><stop offset="1" stopColor="#7fb2ff" stopOpacity="0" /></radialGradient>
            </defs>
            <rect x="-2000" y="-2000" width="5600" height="2700" fill="#3b2f6b" />
            <rect width="1600" height="700" fill="url(#parede)" />
            <rect x="-2000" y="700" width="5600" height="2200" fill="#2a2140" />
            <rect x="-2000" y="700" width="5600" height="8" fill="#1d1730" />
            {/* janela */}
            <rect x="630" y="150" width="240" height="230" rx="10" fill="#2a2140" />
            <rect x="642" y="162" width="216" height="206" rx="6" fill="url(#ceu)" />
            <circle cx="810" cy="215" r="26" fill="#fff4c9" />
            <circle cx="822" cy="207" r="24" fill="#20255a" />
            {[[680, 200], [720, 260], [760, 190], [700, 320], [840, 300], [790, 340]].map(([x, y], i) => (
              <circle key={i} className="estrela" cx={x} cy={y} r="3" fill="#fff" />
            ))}
            <rect x="748" y="162" width="6" height="206" fill="#2a2140" />
            <rect x="642" y="262" width="216" height="6" fill="#2a2140" />
            {/* quadro */}
            <rect x="1110" y="190" width="170" height="110" rx="8" fill="#1d1730" />
            <text x="1195" y="262" textAnchor="middle" fontSize="54" fontWeight="900" fill="#ff7ab6" fontFamily="monospace">&lt;/&gt;</text>
            {/* cama */}
            <rect x="70" y="520" width="26" height="190" rx="6" fill="#6b4a2b" />
            <rect x="80" y="610" width="500" height="80" rx="10" fill="#7a5533" />
            <rect x="80" y="580" width="500" height="44" rx="14" fill="#e9e4ff" />
            <rect x="250" y="575" width="330" height="56" rx="16" fill="#6ea8ff" />
            <ellipse cx="160" cy="575" rx="62" ry="24" fill="#ffffff" />
            {/* cadeira (o encosto fica atrás do menino) */}
            <rect x="900" y="470" width="16" height="160" rx="6" fill="#30304a" />
            <rect x="900" y="620" width="120" height="16" rx="6" fill="#30304a" />
            <rect x="952" y="636" width="12" height="54" fill="#30304a" />
            <rect x="920" y="688" width="76" height="10" rx="5" fill="#30304a" />
            {/* mochila (separada do menino para poder ser jogada) */}
            <g className="mochila" transform="translate(0 0)">
              <g transform="translate(-58 535)">
                <rect x="-20" y="-40" width="40" height="80" rx="12" fill="#ff8c42" />
                <rect x="-14" y="0" width="28" height="22" rx="6" fill="#e06d24" />
              </g>
            </g>
            {/* menino (pés em y=700) */}
            <g className="menino">
              <g transform="translate(0 700)">
                <g className="perna-a" style={{ transformOrigin: '-6px -92px' }}>
                  <rect x="-16" y="-92" width="20" height="86" rx="9" fill="#2f3b66" />
                  <rect x="-18" y="-12" width="32" height="14" rx="7" fill="#fafafa" />
                </g>
                <g className="perna-b" style={{ transformOrigin: '6px -92px' }}>
                  <rect x="-4" y="-92" width="20" height="86" rx="9" fill="#3a4880" />
                  <rect x="-6" y="-12" width="32" height="14" rx="7" fill="#ffffff" />
                </g>
                <rect x="-32" y="-225" width="64" height="140" rx="24" fill="#3ee6a0" />
                <rect x="-50" y="-210" width="10" height="70" rx="5" fill="#2bb67e" />
                <g className="braco" style={{ transformOrigin: '2px -205px' }}>
                  <rect x="-8" y="-210" width="18" height="92" rx="9" fill="#2fd08f" />
                  <circle cx="1" cy="-114" r="11" fill="#ffcf9e" />
                </g>
                <circle cx="6" cy="-268" r="42" fill="#ffcf9e" />
                <path d="M-36 -280 Q-30 -325 14 -316 Q50 -312 48 -282 Q30 -300 -2 -296 Q-20 -296 -36 -280 Z" fill="#3b2418" />
                <circle cx="28" cy="-272" r="5" fill="#1a1a1a" />
                <path d="M20 -246 Q32 -238 42 -248" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="44" cy="-258" r="6" fill="#ff9f9f" opacity=".6" />
              </g>
            </g>
            {/* mesa e computador */}
            <rect x="1010" y="600" width="450" height="20" rx="6" fill="#8a6440" />
            <rect x="1030" y="620" width="16" height="85" fill="#6b4a2b" />
            <rect x="1425" y="620" width="16" height="85" fill="#6b4a2b" />
            <rect x="1180" y="575" width="22" height="28" fill="#2b2b3a" />
            <rect x="1140" y="596" width="100" height="8" rx="4" fill="#2b2b3a" />
            <rect x="1040" y="398" width="300" height="186" rx="12" fill="#1a1a26" />
            <rect className="tela-fundo" x="1052" y="410" width="276" height="162" rx="6" fill="#0b0d14" />
            {[[1070, 432, 120, '#ff7ab6'], [1086, 452, 170, '#7bffb0'], [1086, 472, 90, '#ffd76e'], [1070, 492, 150, '#b18cff'], [1086, 512, 200, '#7bffb0'], [1070, 532, 110, '#ff7ab6']].map(([x, y, w, cor], i) => (
              <rect key={i} className="linha-codigo" x={x} y={y} width={w} height="8" rx="4" fill={cor} opacity=".9" />
            ))}
            {STACK_TELA.map((nome, i) => (
              <text key={nome} className="stack-tela" x={1072 + (i % 4) * 66} y={450 + Math.floor(i / 4) * 70 + (i % 2) * 14}
                fontSize="13" fontWeight="800" fill={['#6ea8ff', '#3ee6a0', '#ffd76e', '#ff7ab6'][i % 4]} fontFamily="Inter, sans-serif" opacity="0">{nome}</text>
            ))}
            <rect x="1250" y="588" width="70" height="12" rx="5" fill="#3a3a4d" />
            <rect className="noite" x="-2000" y="-2000" width="5600" height="4900" fill="#05060f" opacity="0" />
            <ellipse className="brilho" cx="1110" cy="480" rx="340" ry="250" fill="url(#luz-tela)" opacity="0" style={{ mixBlendMode: 'screen' }} />
          </svg>
        </div>
        <p className="legenda">{textos.legendas[legenda]}</p>
        <button type="button" className="pular" onClick={pular}>{textos.pular}</button>
        <div className="fusao" />
      </div>
    </section>
  );
}
