import React from 'react';

function TiltCard({ children }) {
  const ref = React.useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
  };

  return (
    <div className="tilt-wrap">
      <div ref={ref} className="card proj-card" onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </div>
    </div>
  );
}

// Carousel real: auto-rotação (5s), setas e dots clicáveis, pausa ao passar
// o mouse — não é só CSS de enfeite, tem estado de verdade (useState/useEffect).
function Carousel({ slides, children }) {
  const [index, setIndex] = React.useState(0);
  const [pausado, setPausado] = React.useState(false);
  const total = React.Children.count(children) || slides || 1;

  React.useEffect(() => {
    if (pausado || total <= 1) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [pausado, total]);

  const irPara = (i) => setIndex(((i % total) + total) % total);

  return (
    <div className="carousel" onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {children}
      </div>
      {total > 1 && (
        <>
          <button className="carousel-arrow carousel-prev" onClick={() => irPara(index - 1)} aria-label="Anterior">‹</button>
          <button className="carousel-arrow carousel-next" onClick={() => irPara(index + 1)} aria-label="Próximo">›</button>
          <div className="carousel-dots">
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} className={`carousel-dot ${i === index ? 'active' : ''}`} onClick={() => irPara(i)} aria-label={`Ir pro slide ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <section className={"hero" + (__HERO_VARIANT_B__ ? " hero--cyber" : "")}>
        {__HERO_VARIANT_B__ ? (
          <>
            <div className="hero-zigzag" aria-hidden="true">
              <span className="streak streak-1"></span>
              <span className="streak streak-2"></span>
              <span className="streak streak-3"></span>
              <span className="streak streak-4"></span>
              <span className="streak streak-5"></span>
            </div>
            <svg className="hero-avatar" viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="30" y="168" width="180" height="9" rx="4" fill="#1c2135" />
              <rect x="66" y="94" width="108" height="68" rx="7" fill="#11162a" stroke="#3a4a7a" strokeWidth="2" />
              <rect x="75" y="103" width="90" height="50" rx="3" fill="#0a0f1f">
                <animate attributeName="fill" values="#0a0f1f;#182a55;#0a0f1f" dur="3s" repeatCount="indefinite" />
              </rect>
              <rect x="84" y="112" width="42" height="4" rx="2" fill="#4da6ff" opacity=".85" />
              <rect x="84" y="122" width="62" height="4" rx="2" fill="#7bffb0" opacity=".75" />
              <rect x="84" y="132" width="32" height="4" rx="2" fill="#ff6ad5" opacity=".75" />
              <rect x="112" y="162" width="16" height="10" fill="#232a4a" />
              <path d="M96 152 q28 -26 56 0 l0 16 -56 0 z" fill="#3a4a7a" />
              <circle cx="124" cy="58" r="23" fill="#2a3560" />
              <path d="M101 55 q23 -20 46 0 q-2 16 -23 20 q-21 -4 -23 -20 z" fill="#111634" />
            </svg>
          </>
        ) : (
          <>
            <div className="light-orb light-orb-1"></div>
            <div className="light-orb light-orb-2"></div>
            <div className="light-orb light-orb-3"></div>
            <div className="hero-bg-icon" aria-hidden="true">{'</>'}</div>
          </>
        )}
        <h1>Java Backend Developer | Experiência sólida em sistemas seguros e escaláveis</h1>
        <p>Desenvolvedor com 13 anos no varejo e experiência técnica em Spring Boot, REST APIs, JWT, JPA/Hibernate, PostgreSQL e Docker</p>
      </section>
      <div className="container">
        <h2>Sobre</h2>
        <p>Combina experiência prática no varejo com desenvolvimento de sistemas robustos. Atua com Spring Boot, APIs RESTful, autenticacao JWT, controle de acesso por perfis e persistencia de dados com JPA/Hibernate, sempre seguindo principios de Clean Architecture e SOLID.</p>
      </div>
      <div className="container">
        <h2>Projetos entregues</h2>
        <Carousel slides={10}>
          <div className="carousel-slide" key="0"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-oficina-mecanica-api-frontend-onrender-com.png`} alt="Oficina Mecânica" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Oficina Mecânica</h3><p>Cadastro de veículos, ordens de serviço, controle por mecânico — backend Java + frontend React.</p><a className="proj-link" href="https://oficina-mecanica-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="1"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-otica-gestao-api-frontend-onrender-com.png`} alt="Gestão de Óptica" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Gestão de Óptica</h3><p>Clientes, receitas médicas, estoque de lentes, vendas e pagamento em carnê.</p><a className="proj-link" href="https://otica-gestao-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="2"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-restaurante-pdv-api-frontend-onrender-com.png`} alt="PDV para Restaurante" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>PDV para Restaurante</h3><p>Mesas, pedidos, cardápio — sistema de ponto de venda completo.</p><a className="proj-link" href="https://restaurante-pdv-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="3"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-rede-barbearias-api-frontend-onrender-com.png`} alt="Rede de Barbearias" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Rede de Barbearias</h3><p>Multi-unidade: agendamento por unidade e barbeiro, dashboard de faturamento.</p><a className="proj-link" href="https://rede-barbearias-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="4"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-clinica-api-api-frontend-onrender-com.png`} alt="Clínica" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Clínica</h3><p>Pacientes, agendamento sem conflito, prontuário com timeline e convênio — auth JWT + RBAC + auditoria.</p><a className="proj-link" href="https://clinica-api-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="5"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-imobiliaria-corretor-api-frontend-onrender-com.png`} alt="Corretor de Imóveis" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Corretor de Imóveis</h3><p>Cadastro de imóveis, clientes interessados e visitas agendadas.</p><a className="proj-link" href="https://imobiliaria-corretor-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="6"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-petshop-banho-tosa-api-frontend-onrender-com.png`} alt="Petshop" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Petshop</h3><p>Pets, agendamento de banho e tosa, histórico de atendimentos.</p><a className="proj-link" href="https://petshop-banho-tosa-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="7"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-advocacia-processos-api-frontend-onrender-com.png`} alt="Escritório de Advocacia" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Escritório de Advocacia</h3><p>Cadastro de clientes e processos jurídicos.</p><a className="proj-link" href="https://advocacia-processos-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="8"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-academia-mensalidade-api-frontend-onrender-com.png`} alt="Academia" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Academia</h3><p>Alunos, planos e controle de mensalidade em atraso.</p><a className="proj-link" href="https://academia-mensalidade-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="9"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-escola-infantil-api-frontend-onrender-com.png`} alt="Escola Infantil" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Escola Infantil</h3><p>Alunos, turmas e boletim escolar.</p><a className="proj-link" href="https://escola-infantil-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
        </Carousel>
      </div>
      <div className="container">
        <h2>Destaques</h2>
        <p className="destaques-sub">4 sistemas completos: backend Java + Spring Boot, frontend React, autenticação e deploy real — clique e navegue ao vivo.</p>
        <div className="grid destaques-grid">
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-escola-vitrine-escola-api-frontend-onrender-com.png`} alt="Escola" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Escola</h3><p>Matrícula, notas, boletim automático, financeiro com cobrança e portal da família — nível empresarial.</p><a className="proj-link" href="https://escola-vitrine-escola-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-feira-livre-marketplace-api-frontend-onrender-com.png`} alt="Marketplace" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Marketplace</h3><p>Multi-vendedor nível Amazon/Shopee: lojas, comissão, carrinho, variação de produto e gateway de pagamento.</p><a className="proj-link" href="https://feira-livre-marketplace-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-clinica-api-api-frontend-onrender-com.png`} alt="Clínica" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Clínica</h3><p>Pacientes, agendamento sem conflito, prontuário com timeline e convênio — auth JWT + RBAC + auditoria.</p><a className="proj-link" href="https://clinica-api-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-rede-barbearias-api-frontend-onrender-com.png`} alt="Barbearia" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Barbearia</h3><p>Multi-unidade: agenda visual por barbeiro, comissão automática e dashboard de faturamento.</p><a className="proj-link" href="https://rede-barbearias-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
        </div>
      </div>
      <a className="whatsapp-fab" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">💬</a>
    </div>
  );
}
