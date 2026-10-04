import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CartaoProjeto from './CartaoProjeto.jsx';

const CATEGORIAS = ['todos', 'gestao', 'saude', 'comercio', 'financas', 'servicos'];

export default function GradeProjetos({ projetos, t, lang }) {
  const [filtro, setFiltro] = useState('todos');
  const gridRef = useRef(null);
  const firstRender = useRef(true);

  const projetosFiltrados = filtro === 'todos'
    ? projetos
    : projetos.filter(p => p.categoria === filtro);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !gridRef.current) return;

    const itens = [...gridRef.current.querySelectorAll('.tilt-wrap')];
    if (!itens.length) return;

    // FLIP: captura posição antes
    const first = itens.map(el => el.getBoundingClientRect().top);

    // Força reflow e anima da posição antiga para a nova
    requestAnimationFrame(() => {
      itens.forEach((el, i) => {
        const last = el.getBoundingClientRect().top;
        const delta = first[i] - last;
        if (delta !== 0) {
          gsap.fromTo(el,
            { y: delta },
            { y: 0, duration: 0.6, ease: 'power3.out' }
          );
        }
      });
      // Fade-in dos novos
      gsap.fromTo(itens,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.04 }
      );
    });
  }, [filtro, projetos]);

  return (
    <div>
      <div className="proj-filtros" role="tablist" aria-label="Filtro de projetos">
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={filtro === cat}
            className={`proj-filtro ${filtro === cat ? 'ativo' : ''}`}
            onClick={() => setFiltro(cat)}
          >
            {cat === 'todos' ? t.filtroTodos : t[`cat_${cat}`]}
          </button>
        ))}
      </div>
      <div className="grid destaques-grid proj-grade" ref={gridRef}>
        {projetosFiltrados.map((p, i) => (
          <RevelarProjeto key={p.id} delay={i * 60}>
            <CartaoProjeto p={p} t={t} lang={lang} />
          </RevelarProjeto>
        ))}
      </div>
    </div>
  );
}

// Wrapper leve para animar entrada em cascata
function RevelarProjeto({ children, delay }) {
  return (
    <div style={{ opacity: 0, animation: `revelarProjeto .5s ease both ${delay}ms` }}>
      {children}
    </div>
  );
}