import React, { useEffect, useRef, useState } from 'react';

export default function CursorPersonalizado() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [ativo, setAtivo] = useState(false);
  const [rotulo, setRotulo] = useState('');
  const [tamanho, setTamanho] = useState(28);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!mq.matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setAtivo(true);
    document.body.classList.add('cursor-custom');

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animar = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - tamanho / 2}px, ${ring.current.y - tamanho / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(animar);
    };

    const atualizar = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) {
        const tipo = el.dataset.cursor;
        if (tipo === 'projeto') { setRotulo('Ver'); setTamanho(64); }
        else if (tipo === 'link') { setRotulo('↗'); setTamanho(44); }
        else if (tipo === 'botao') { setTamanho(16); setRotulo(''); }
      } else {
        setRotulo('');
        setTamanho(28);
      }
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', atualizar);
    rafRef.current = requestAnimationFrame(animar);

    return () => {
      document.body.classList.remove('cursor-custom');
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', atualizar);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep tamanho in sync for the ring transform
  useEffect(() => {
    if (ringRef.current) {
      const w = tamanho;
      ringRef.current.style.width = `${w}px`;
      ringRef.current.style.height = `${w}px`;
    }
  }, [tamanho]);

  if (!ativo) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        {rotulo && <span className="cursor-rotulo">{rotulo}</span>}
      </div>
    </>
  );
}