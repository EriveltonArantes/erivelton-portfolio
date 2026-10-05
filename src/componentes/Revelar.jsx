import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduzirMovimento } from '../movimento.js';

gsap.registerPlugin(ScrollTrigger);

export default function Revelar({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const reduced = reduzirMovimento();
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay / 1000, // delay chega em ms (ex. i * 90); o GSAP usa segundos
          ease: 'power3.out',
        });
      },
    });

    return () => trigger.kill();
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`revelar ${className}`}
      style={{ opacity: 0, transform: 'translateY(28px)' }}
    >
      {children}
    </Tag>
  );
}

// Contador numérico: anima de 0 até o valor quando entra na tela
export function Contador({ value }) {
  const ref = useRef(null);
  const match = value.match(/^(~?)(\d+)(\+?)$/);
  const [display, setDisplay] = React.useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match) return;
    const reduced = reduzirMovimento();
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: 'power3.out',
          onUpdate: () => {
            setDisplay(`${prefix}${Math.round(obj.val)}${suffix}`);
          },
        });
      },
    });
    return () => trigger.kill();
    // só `value`: `match` é um array novo a cada render e recriava o efeito em laço (travava a página)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{display}</span>;
}