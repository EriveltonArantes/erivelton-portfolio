import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { reduzirMovimento } from '../movimento.js';

const Erro404Fisica = lazy(() => import('./Erro404Fisica.jsx')); // Matter.js só baixa quando a página de erro abre

export default function PaginaErro({ lang }) {
  const t = TEXTO[lang];

  return (
    <div className="erro-page">
      <div className="erro-container">
        <h1 className="erro-titulo">
          <span>Erro 4</span>
          <OlhoSvg />
          <OlhoSvg />
          <span> — {t.titulo}</span>
        </h1>
        <a href="#topo" className="erro-voltar">{t.voltar}</a>
      </div>

      <Suspense fallback={<div className="erro-fisica" />}><Erro404Fisica dica={t.dica} /></Suspense>

      <div className="erro-outros">
        <h2>{t.outros}</h2>
        <div className="erro-grid">
          <ErroCard codigo="400" frase={t.f400} efeito="rosquinha" />
          <ErroCard codigo="401" frase={t.f401} efeito="cadeado" />
          <ErroCard codigo="500" frase={t.f500} efeito="engrenagem" />
        </div>
      </div>
    </div>
  );
}

// Olho SVG com pupila que segue o mouse e pisca
function OlhoSvg() {
  const pupilaRef = useRef(null);
  const palpebraRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const reduced = reduzirMovimento();
    if (reduced) return;

    const move = (e) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 1);
      const angle = Math.atan2(dy, dx);
      const mx = Math.cos(angle) * dist * 5;
      const my = Math.sin(angle) * dist * 5;
      if (pupilaRef.current) {
        pupilaRef.current.setAttribute('cx', 25 + mx);
        pupilaRef.current.setAttribute('cy', 25 + my);
      }
    };

    // Piscar a cada 3-5 segundos
    let timer;
    const piscar = () => {
      if (palpebraRef.current) {
        palpebraRef.current.style.transform = 'scaleY(1)';
        setTimeout(() => {
          if (palpebraRef.current) palpebraRef.current.style.transform = 'scaleY(0)';
        }, 120);
      }
      timer = setTimeout(piscar, 2500 + Math.random() * 3000);
    };
    timer = setTimeout(piscar, 2000);

    document.addEventListener('mousemove', move);
    return () => {
      document.removeEventListener('mousemove', move);
      clearTimeout(timer);
    };
  }, []);

  return (
    <span className="erro-olho" ref={containerRef} aria-hidden="true">
      <svg viewBox="0 0 50 50" className="erro-olho-svg">
        <circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle ref={pupilaRef} cx="25" cy="25" r="8" fill="currentColor" />
      </svg>
      <span ref={palpebraRef} className="erro-palpebra" />
    </span>
  );
}

// Cards de outros erros
function ErroCard({ codigo, frase, efeito }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  const partes = codigo.split('0');
  // codigo = "400" -> ["4", "", ""] -> renderiza "4", rosquinha, rosquinha
  // codigo = "401" -> ["4", "", "1"] -> renderiza "4", cadeado, "1"
  // codigo = "500" -> ["5", "", ""] -> renderiza "5", engrenagem, engrenagem

  const renderizar = () => {
    const chars = [];
    let zeroIdx = 0;
    for (let i = 0; i < codigo.length; i++) {
      if (codigo[i] === '0') {
        chars.push(
          <EfeitoZero key={`z${zeroIdx}`} efeito={efeito} idx={zeroIdx} hover={hover} />
        );
        zeroIdx++;
      } else {
        chars.push(<span key={`c${i}`}>{codigo[i]}</span>);
      }
    }
    return chars;
  };

  return (
    <div
      ref={ref}
      className={`erro-card erro-card-${efeito}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="erro-card-codigo">{renderizar()}</div>
      <p className="erro-card-frase">{frase}</p>
    </div>
  );
}

function EfeitoZero({ efeito, idx, hover }) {
  if (efeito === 'rosquinha') {
    return (
      <span className={`erro-zero-rosquinha ${hover ? 'girando' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="18" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="85 28" />
        </svg>
      </span>
    );
  }
  if (efeito === 'cadeado') {
    return (
      <span className={`erro-zero-cadeado ${hover ? 'tremendo' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 50 50">
          <rect x="12" y="22" width="26" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M17 22V15a8 8 0 0 1 16 0v7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="25" cy="33" r="3" fill="currentColor" />
        </svg>
      </span>
    );
  }
  if (efeito === 'engrenagem') {
    return (
      <span className={`erro-zero-engrenagem ${hover ? 'acelerando' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 50 50" style={{ animationDirection: idx === 0 ? 'normal' : 'reverse' }}>
          <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
          {[0, 60, 120, 180, 240, 300].map(ang => (
            <line key={ang} x1="25" y1="5" x2="25" y2="15" stroke="currentColor" strokeWidth="5" strokeLinecap="round"
              transform={`rotate(${ang} 25 25)`} />
          ))}
        </svg>
      </span>
    );
  }
  return <span>0</span>;
}

const TEXTO = {
  pt: {
    titulo: 'esta página foi tomar sorvete',
    dica: 'Enquanto isso: arraste e arremesse os números. Clique duplo faz eles pularem.',
    voltar: 'Voltar para o início',
    outros: 'Outros erros que já vimos por aí',
    f400: 'Requisição tão errada que o servidor nem entendeu.',
    f401: 'Você não tem a chave. E não adianta chutar.',
    f500: 'O servidor surtou. Mas já reiniciamos ele.',
  },
  en: {
    titulo: 'this page went out for ice cream',
    dica: 'Meanwhile: drag and throw the numbers. Double-click makes them jump.',
    voltar: 'Back to home',
    outros: 'Other errors we\'ve seen around',
    f400: 'Request so wrong the server didn\'t even understand it.',
    f401: 'You don\'t have the key. And guessing won\'t help.',
    f500: 'The server panicked. But we already restarted it.',
  },
};