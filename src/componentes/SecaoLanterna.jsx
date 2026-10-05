import React, { useEffect, useRef } from 'react';

// Seção escura: o mouse vira uma lanterna que revela o conteúdo. Sem mouse (celular), a luz passeia sozinha.
export default function SecaoLanterna({ kicker, titulo, dica, passos }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const temMouse = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calmo) { el.classList.add('lanterna-acesa'); return; }

    const posicionar = (x, y) => { el.style.setProperty('--lx', `${x}px`); el.style.setProperty('--ly', `${y}px`); };
    if (temMouse) {
      const mover = (e) => { const r = el.getBoundingClientRect(); posicionar(e.clientX - r.left, e.clientY - r.top); };
      el.addEventListener('mousemove', mover);
      return () => el.removeEventListener('mousemove', mover);
    }
    let raf;
    const t0 = performance.now();
    const passear = (t) => {
      const s = (t - t0) / 1000;
      posicionar(el.clientWidth * (0.5 + 0.38 * Math.sin(s * 0.7)), el.clientHeight * (0.5 + 0.35 * Math.sin(s * 1.1 + 1)));
      raf = requestAnimationFrame(passear);
    };
    raf = requestAnimationFrame(passear);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="lanterna" ref={ref}>
      <div className="lanterna-conteudo">
        <span className="about-kicker">{kicker}</span>
        <h2>{titulo}</h2>
        <ol className="lanterna-passos">
          {passos.map((p, i) => (
            <li key={p.titulo}>
              <span className="lanterna-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="lanterna-sombra" aria-hidden="true" />
      <span className="lanterna-dica" aria-hidden="true">{dica}</span>
    </section>
  );
}
