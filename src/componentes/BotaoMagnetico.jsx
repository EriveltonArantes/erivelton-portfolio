import React, { useRef, useMemo } from 'react';
import { reduzirMovimento } from '../movimento.js';

export default function BotaoMagnetico({ children, href, className, ...props }) {
  const ref = useRef(null);
  const reduced = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return reduzirMovimento();
  }, []);

  const mover = (e) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const sair = () => {
    if (reduced) return;
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      ref={ref}
      href={href}
      className={`magnetic ${className || ''}`}
      onMouseMove={mover}
      onMouseLeave={sair}
      data-cursor={href ? 'link' : 'botao'}
      {...props}
    >
      {children}
    </Tag>
  );
}