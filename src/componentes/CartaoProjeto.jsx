import React, { useRef, useState } from 'react';
import { reduzirMovimento } from '../movimento.js';

export default function CartaoProjeto({ p, t, lang }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const glowRef = useRef(null);
  const [erroImg, setErroImg] = useState(false);

  const mover = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const reduced = reduzirMovimento();
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (!reduced) {
      card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    }
    // Brilho segue o cursor
    if (glowRef.current) {
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      glowRef.current.style.background = `radial-gradient(circle at ${px}px ${py}px, rgba(255,255,255,0.12), transparent 55%)`;
    }
    // Imagem rola (scroll suave interno)
    if (imgRef.current) {
      const img = imgRef.current;
      const progresso = y + 0.5;
      const maxScroll = 35;
      img.style.objectPosition = `top ${progresso * maxScroll}%`;
    }
  };

  const sair = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
    if (imgRef.current) imgRef.current.style.objectPosition = 'top';
    if (glowRef.current) glowRef.current.style.background = 'none';
  };

  const imgSrc = `${import.meta.env.BASE_URL}${p.screenshot}`;

  return (
    <div className="tilt-wrap">
      <article
        ref={cardRef}
        className="card proj-card"
        data-cursor="projeto"
        onMouseMove={mover}
        onMouseLeave={sair}
      >
        <div className="proj-glow" ref={glowRef} aria-hidden="true" />
        {p.tema && (
          <div className="proj-theme-bg" aria-hidden="true">
            {p.tema.map((emoji, i) => <span className="proj-theme-icon" key={i}>{emoji}</span>)}
          </div>
        )}
        <div className="browser-frame">
          <div className="bar"><span></span><span></span><span></span></div>
          {erroImg ? (
            <div className="proj-fallback" aria-hidden="true">
              <span className="proj-fallback-emoji">{p.tema ? p.tema[0] : '💻'}</span>
            </div>
          ) : (
            <img
              ref={imgRef}
              src={imgSrc}
              alt={p.nome[lang]}
              loading="lazy"
              onError={() => setErroImg(true)}
            />
          )}
        </div>
        {p.novo && <span className="proj-selo-novo">Novo</span>}
        <span className="proj-badge"><span className="dot"></span>{t.noAr}</span>
        <h3>{p.nome[lang]}</h3>
        <p>{p.desc[lang]}</p>
        <a className="proj-link" href={p.url} target="_blank" rel="noreferrer" data-cursor="link">
          {t.verSistema}
        </a>
      </article>
    </div>
  );
}