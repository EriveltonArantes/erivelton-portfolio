import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduzirMovimento } from '../movimento.js';

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduced = reduzirMovimento();
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3), smoothWheel: true });
    lenisRef.current = lenis;

    // Integrar com ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const passo = (time) => lenis.raf(time * 1000); // mesma função no add e no remove
    gsap.ticker.add(passo);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove(passo);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}