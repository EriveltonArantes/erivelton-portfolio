import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduzirMovimento } from '../movimento.js';

gsap.registerPlugin(ScrollTrigger);

export default function Rodape({ t, contato }) {
  const textoRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const reduced = reduzirMovimento();
    if (reduced) {
      if (fillRef.current) fillRef.current.style.clipPath = 'inset(0 0 0 0)';
      return;
    }
    if (!textoRef.current || !fillRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: textoRef.current,
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (fillRef.current) {
          fillRef.current.style.clipPath = `inset(0 0 ${(1 - p) * 100}% 0)`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer id="contato" className="footer">
      <div className="footer-frase-wrap">
        <h2 className="footer-frase" ref={textoRef}>
          <span className="footer-frase-base">Vamos construir algo juntos?</span>
          <span className="footer-frase-fill" ref={fillRef} aria-hidden="true">
            Vamos construir algo juntos?
          </span>
        </h2>
      </div>
      <div className="container footer-inner">
        <div>
          <h2>{t.footerTitulo}</h2>
          <p className="destaques-sub">{t.footerSub}</p>
        </div>
        <div className="footer-links">
          <a href={contato.whatsapp} target="_blank" rel="noreferrer" className="footer-link" data-cursor="link">💬 WhatsApp — {contato.telefone}</a>
          <a href={contato.github} target="_blank" rel="noreferrer" className="footer-link" data-cursor="link">GitHub — EriveltonArantes</a>
          <a href={contato.linkedin} target="_blank" rel="noreferrer" className="footer-link" data-cursor="link">LinkedIn — Erivelton Arantes de Souza</a>
          <a href="#/erro" className="footer-link footer-bug" data-cursor="link">Achou um bug? 🐛</a>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Erivelton Arantes — {t.footerCopy}.</p>
    </footer>
  );
}