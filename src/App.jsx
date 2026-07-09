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

const CONTATO = {
  whatsapp: 'https://wa.me/5534996915734',
  telefone: '+55 34 99691-5734',
  github: 'https://github.com/EriveltonArantes',
  linkedin: 'https://www.linkedin.com/in/erivelton-arantes-de-souza-46a4032b5/',
};

const STACK = [
  { grupo: 'Back-end', itens: ['Java', 'Spring Boot', 'REST APIs', 'JWT', 'JPA / Hibernate'] },
  { grupo: 'Dados & Infra', itens: ['PostgreSQL', 'Docker', 'Git', 'Swagger'] },
  { grupo: 'Front-end', itens: ['React', 'Angular', 'JavaScript', 'Vite'] },
  { grupo: 'Arquitetura', itens: ['Clean Architecture', 'SOLID', 'RBAC', 'Auditoria de dados'] },
];

function Navbar() {
  const [aberto, setAberto] = React.useState(false);
  const fechar = () => setAberto(false);
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#topo" className="navbar-logo" onClick={fechar}>Erivelton Arantes</a>
        <nav className={`navbar-links ${aberto ? 'is-open' : ''}`}>
          <a href="#sobre" onClick={fechar}>Sobre</a>
          <a href="#projetos" onClick={fechar}>Projetos</a>
          <a href="#stack" onClick={fechar}>Stack</a>
          <a href="#contato" onClick={fechar}>Contato</a>
          <div className="navbar-icons">
            <a href={CONTATO.github} target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
            <a href={CONTATO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </nav>
        <button className="navbar-toggle" onClick={() => setAberto(a => !a)} aria-label="Abrir menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="container footer-inner">
        <div>
          <h2>Vamos conversar</h2>
          <p className="destaques-sub">Aberto a oportunidades de desenvolvimento full stack Java/React. Resposta rápida por WhatsApp.</p>
        </div>
        <div className="footer-links">
          <a href={CONTATO.whatsapp} target="_blank" rel="noreferrer" className="footer-link">💬 WhatsApp — {CONTATO.telefone}</a>
          <a href={CONTATO.github} target="_blank" rel="noreferrer" className="footer-link">GitHub — EriveltonArantes</a>
          <a href={CONTATO.linkedin} target="_blank" rel="noreferrer" className="footer-link">LinkedIn — Erivelton Arantes de Souza</a>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Erivelton Arantes — desenvolvido com React.</p>
    </footer>
  );
}

export default function App() {
  return (
    <div>
      <Navbar />
      <section id="topo" className={"hero" + (__HERO_VARIANT_B__ ? " hero--cyber" : "")}>
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
        <h1>Full Stack Developer — Java/Spring Boot &amp; React/Angular</h1>
        <p>13 anos gerindo operação real, quase 3 construindo sistemas completos em produção: back-end em Spring Boot com JWT, JPA/Hibernate e PostgreSQL, front-end em React e Angular.</p>
      </section>
      <div id="sobre" className="container about-container">
        <span className="about-kicker">Minha trajetória</span>
        <h2 className="about-title">13 anos de operação real. Quase 3 construindo o software que sustenta ela.</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>Passei 13 anos dentro de um supermercado — os últimos 8 como gerente, respondendo por equipe, estoque, prazo e resultado todo santo dia. Aprendi na prática o que quebra uma operação: processo mal desenhado, informação que não chega a tempo, gente sem ferramenta pra trabalhar direito.</p>
            <p>Há quase 3 anos, resolvi construir essas ferramentas com as próprias mãos. Mergulhei em Java, Spring Boot, APIs REST, JWT, JPA/Hibernate, PostgreSQL e Docker no back-end, e React e Angular no front — não em curso avulso, mas construindo sistemas completos, do banco de dados até a tela, pensados pra rodar em produção de verdade.</p>
            <p>Isso muda o tipo de desenvolvedor que sou: não escrevo pensando só em passar no teste — penso em quem vai usar aquilo numa segunda-feira de manhã com a loja lotada. É a mesma exigência que 13 anos de gestão ensinam, agora aplicada à arquitetura de software.</p>
          </div>
          <div className="about-stats">
            <div className="stat-card"><span className="stat-num">13</span><span className="stat-label">anos de operação e gestão real</span></div>
            <div className="stat-card"><span className="stat-num">8</span><span className="stat-label">anos liderando equipe e resultado</span></div>
            <div className="stat-card"><span className="stat-num">~3</span><span className="stat-label">anos construindo software em produção</span></div>
            <div className="stat-card"><span className="stat-num">10+</span><span className="stat-label">sistemas completos no ar</span></div>
          </div>
        </div>
      </div>
      <div id="projetos" className="container">
        <h2>Projetos entregues</h2>
        <Carousel slides={10}>
          <div className="carousel-slide" key="0"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-escola-vitrine-escola-api-frontend-onrender-com.png`} alt="Escola" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Escola</h3><p>Matrícula, notas, boletim automático, financeiro com cobrança e portal da família — nível empresarial.</p><a className="proj-link" href="https://escola-vitrine-escola-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="1"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-feira-livre-marketplace-api-frontend-onrender-com.png`} alt="Marketplace" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Marketplace</h3><p>Multi-vendedor nível Amazon/Shopee: lojas, comissão, carrinho, variação de produto e gateway de pagamento.</p><a className="proj-link" href="https://feira-livre-marketplace-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="2"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-clinica-api-api-frontend-onrender-com.png`} alt="Clínica" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Clínica</h3><p>Pacientes, agendamento sem conflito, prontuário com timeline e convênio — auth JWT + RBAC + auditoria.</p><a className="proj-link" href="https://clinica-api-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="3"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-rede-barbearias-api-frontend-onrender-com.png`} alt="Barbearia" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Barbearia</h3><p>Multi-unidade: agenda visual por barbeiro, comissão automática e dashboard de faturamento.</p><a className="proj-link" href="https://rede-barbearias-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="4"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-amigo-fiel-petshop-api-frontend-onrender-com.png`} alt="Petshop" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Petshop</h3><p>Tutor com autoatendimento, agenda de banho e tosa, prontuário do pet e financeiro — RBAC completo.</p><a className="proj-link" href="https://amigo-fiel-petshop-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="5"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-academia-teste-pro-academia-api-frontend-onrender-com.png`} alt="Academia" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Academia</h3><p>Matrícula, check-in de alunos, reserva de aula e controle de mensalidade em atraso.</p><a className="proj-link" href="https://academia-teste-pro-academia-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="6"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-oficina-mecanica-api-frontend-onrender-com.png`} alt="Oficina Mecânica" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Oficina Mecânica</h3><p>Ordens de serviço, controle por mecânico, peças e comissão — backend Java + frontend React.</p><a className="proj-link" href="https://oficina-mecanica-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="7"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-hotel-vitrine-hotel-api-frontend-onrender-com.png`} alt="Hotel" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Rede de Hotéis</h3><p>Multi-propriedade, mapa de quartos por unidade/andar, portal do hóspede e financeiro com ocupação.</p><a className="proj-link" href="https://hotel-vitrine-hotel-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="8"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-restaurante-oficial-restaurante-api-frontend-onrender-com.png`} alt="Restaurante" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Restaurante</h3><p>Mapa de mesas, pedidos por status até a cozinha, cardápio e comissão de garçom.</p><a className="proj-link" href="https://restaurante-oficial-restaurante-api-9zc9.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
          <div className="carousel-slide" key="9"><TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-banco-vitrine-banco-api-frontend-onrender-com.png`} alt="Banco Digital" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Banco Digital</h3><p>Ledger de partida dobrada, PIX/TED, limite diário e bloqueio automático de fraude — nível fintech.</p><a className="proj-link" href="https://banco-vitrine-banco-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard></div>
        </Carousel>
      </div>
      <div className="container">
        <h2>Destaques</h2>
        <p className="destaques-sub">4 sistemas completos: backend Java + Spring Boot, frontend React, autenticação e deploy real — clique e navegue ao vivo.</p>
        <div className="grid destaques-grid">
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-banco-vitrine-banco-api-frontend-onrender-com.png`} alt="Banco Digital" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Banco Digital</h3><p>Ledger de partida dobrada de verdade — toda transferência debita e credita atomicamente, com limite diário e bloqueio automático de fraude.</p><a className="proj-link" href="https://banco-vitrine-banco-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-hotel-vitrine-hotel-api-frontend-onrender-com.png`} alt="Hotel" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Rede de Hotéis</h3><p>Multi-propriedade nível grande rede: mapa de quartos por unidade/andar, reserva sem sobreposição de datas e portal do hóspede.</p><a className="proj-link" href="https://hotel-vitrine-hotel-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-restaurante-oficial-restaurante-api-frontend-onrender-com.png`} alt="Restaurante" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Restaurante</h3><p>Mesa ocupa/libera sozinha com o pedido, item bloqueado quando sai do cardápio, comissão de garçom calculada pelo servidor.</p><a className="proj-link" href="https://restaurante-oficial-restaurante-api-9zc9.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
          <TiltCard><div className="browser-frame"><div className="bar"><span></span><span></span><span></span></div><img src={`${import.meta.env.BASE_URL}screenshots/https-feira-livre-marketplace-api-frontend-onrender-com.png`} alt="Marketplace" loading="lazy" /></div><span className="proj-badge"><span className="dot"></span>No ar</span><h3>Marketplace</h3><p>Multi-vendedor nível Amazon/Shopee: lojas, comissão, carrinho, variação de produto e gateway de pagamento.</p><a className="proj-link" href="https://feira-livre-marketplace-api-frontend.onrender.com" target="_blank" rel="noreferrer">Ver sistema no ar →</a></TiltCard>
        </div>
      </div>
      <div id="stack" className="container">
        <h2>Stack</h2>
        <p className="destaques-sub">O que uso pra tirar um sistema do zero e colocar em produção — sozinho, do banco de dados até a interface.</p>
        <div className="stack-groups">
          {STACK.map(({ grupo, itens }) => (
            <div className="stack-group" key={grupo}>
              <h3 className="stack-group-title">{grupo}</h3>
              <div className="stack-badges">
                {itens.map(item => <span className="stack-badge" key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <a className="whatsapp-fab" href={CONTATO.whatsapp} target="_blank" rel="noreferrer">💬</a>
    </div>
  );
}
