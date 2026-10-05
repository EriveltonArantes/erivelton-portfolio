import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

// "404" com física de verdade: os números caem, quicam e dá pra arrastar e arremessar contra as paredes.
const CORES = ['#6ea8ff', '#ff7ab6', '#3ee6a0'];

export default function Erro404Fisica({ dica }) {
  const caixaRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const caixa = caixaRef.current;
    const canvas = canvasRef.current;
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;
    const largura = caixa.clientWidth;
    const altura = caixa.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = largura * dpr;
    canvas.height = altura * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const engine = Engine.create({ gravity: { y: 1.1 } });
    const parede = { isStatic: true, render: { visible: false } };
    const grossura = 200;
    Composite.add(engine.world, [
      Bodies.rectangle(largura / 2, altura + grossura / 2, largura * 3, grossura, parede),
      Bodies.rectangle(largura / 2, -grossura / 2 - 400, largura * 3, grossura, parede), // teto acima da área: nada foge
      Bodies.rectangle(-grossura / 2, altura / 2, grossura, altura * 4, parede),
      Bodies.rectangle(largura + grossura / 2, altura / 2, grossura, altura * 4, parede),
    ]);

    const tamanho = Math.min(150, largura / 5);
    const numeros = ['4', '0', '4'].map((txt, i) =>
      Bodies.rectangle(largura / 2 + (i - 1) * tamanho * 1.15, -tamanho * (1 + i * 0.8), tamanho * 0.72, tamanho,
        { restitution: 0.55, friction: 0.25, chamfer: { radius: 12 }, angle: (i - 1) * 0.35, label: txt, cor: CORES[i] }));
    Composite.add(engine.world, numeros);

    const mouse = Mouse.create(canvas);
    mouse.pixelRatio = dpr;
    // não prender a rolagem da página na roda do mouse
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    const pegar = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    Composite.add(engine.world, pegar);

    const desenhar = () => {
      ctx.clearRect(0, 0, largura, altura);
      for (const b of numeros) {
        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.rotate(b.angle);
        ctx.font = `900 ${tamanho * 1.05}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = b.cor;
        ctx.shadowBlur = 28;
        ctx.fillStyle = b.cor;
        ctx.fillText(b.label, 0, tamanho * 0.04);
        ctx.restore();
      }
    };
    Events.on(engine, 'afterUpdate', desenhar);

    // clique duplo: os números pulam de novo
    const pular = () => numeros.forEach(b => Body.setVelocity(b, { x: (Math.random() - 0.5) * 18, y: -18 - Math.random() * 8 }));
    canvas.addEventListener('dblclick', pular);

    const runner = Runner.create();
    Runner.run(runner, engine);
    return () => {
      canvas.removeEventListener('dblclick', pular);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="erro-fisica" ref={caixaRef}>
      <canvas ref={canvasRef} data-cursor="botao" />
      <span className="erro-fisica-dica">{dica}</span>
    </div>
  );
}
