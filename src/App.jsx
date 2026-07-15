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
          <button className="carousel-arrow carousel-prev" onClick={() => irPara(index - 1)} aria-label="Previous">‹</button>
          <button className="carousel-arrow carousel-next" onClick={() => irPara(index + 1)} aria-label="Next">›</button>
          <div className="carousel-dots">
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} className={`carousel-dot ${i === index ? 'active' : ''}`} onClick={() => irPara(i)} aria-label={`Go to slide ${i + 1}`} />
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
  { id: 'backend', itens: ['Java', 'Spring Boot', 'REST APIs', 'JWT', 'JPA / Hibernate'] },
  { id: 'dados', itens: ['PostgreSQL', 'Docker', 'Git', 'Swagger'] },
  { id: 'frontend', itens: ['React', 'Angular', 'JavaScript', 'Vite'] },
  { id: 'arquitetura', itens: ['Clean Architecture', 'SOLID', 'RBAC', 'Auditoria de dados'] },
];

// Cada projeto do carrossel "Projetos entregues" — nome/descrição em pt/en,
// screenshot e URL (Vercel, zero cold start) compartilhados entre os dois idiomas.
const PROJETOS = [
  { id: 'escola', screenshot: 'screenshots/https-escola-vitrine-escola-api-frontend-onrender-com.png', url: 'https://escola-vitrine-escola-api-frontend.vercel.app',
    nome: { pt: 'Escola', en: 'School' },
    desc: { pt: 'Matrícula, notas, boletim automático, financeiro com cobrança e portal da família — nível empresarial.', en: 'Enrollment, grades, automatic report cards, billing and a family portal — enterprise-grade.' } },
  { id: 'marketplace', screenshot: 'screenshots/https-feira-livre-marketplace-api-frontend-onrender-com.png', url: 'https://feira-livre-marketplace-api-fronten.vercel.app',
    nome: { pt: 'Marketplace', en: 'Marketplace' },
    desc: { pt: 'Multi-vendedor nível Amazon/Shopee: lojas, comissão, carrinho, variação de produto e gateway de pagamento.', en: 'Amazon/Shopee-level multi-vendor: stores, commission, cart, product variants and payment gateway.' } },
  { id: 'clinica', screenshot: 'screenshots/https-clinica-api-api-frontend-onrender-com.png', url: 'https://clinica-api-api-frontend.vercel.app',
    nome: { pt: 'Clínica', en: 'Clinic' },
    desc: { pt: 'Pacientes, agendamento sem conflito, prontuário com timeline e convênio — auth JWT + RBAC + auditoria.', en: 'Patients, conflict-free scheduling, timeline medical records and insurance — JWT auth + RBAC + audit log.' } },
  { id: 'barbearia', screenshot: 'screenshots/https-rede-barbearias-api-frontend-onrender-com.png', url: 'https://rede-barbearias-api-frontend.vercel.app',
    nome: { pt: 'Barbearia', en: 'Barbershop' },
    desc: { pt: 'Multi-unidade: agenda visual por barbeiro, comissão automática e dashboard de faturamento.', en: 'Multi-location: visual schedule per barber, automatic commission and revenue dashboard.' } },
  { id: 'petshop', screenshot: 'screenshots/https-amigo-fiel-petshop-api-frontend-onrender-com.png', url: 'https://amigo-fiel-petshop-api-frontend.vercel.app',
    nome: { pt: 'Petshop', en: 'Pet Shop' },
    desc: { pt: 'Tutor com autoatendimento, agenda de banho e tosa, prontuário do pet e financeiro — RBAC completo.', en: 'Self-service owner portal, grooming schedule, pet medical record and finances — full RBAC.' } },
  { id: 'academia', screenshot: 'screenshots/https-academia-teste-pro-academia-api-frontend-onrender-com.png', url: 'https://academia-teste-pro-academia-api-fro.vercel.app',
    nome: { pt: 'Academia', en: 'Gym' },
    desc: { pt: 'Matrícula, check-in de alunos, reserva de aula e controle de mensalidade em atraso.', en: 'Enrollment, member check-in, class booking and overdue payment tracking.' } },
  { id: 'oficina', screenshot: 'screenshots/https-oficina-mecanica-api-frontend-onrender-com.png', url: 'https://oficina-mecanica-api-frontend.vercel.app',
    nome: { pt: 'Oficina Mecânica', en: 'Auto Repair Shop' },
    desc: { pt: 'Ordens de serviço, controle por mecânico, peças e comissão — backend Java + frontend React.', en: 'Work orders, per-mechanic tracking, parts and commission — Java backend + React frontend.' } },
  { id: 'hotel', screenshot: 'screenshots/https-hotel-vitrine-hotel-api-frontend-onrender-com.png', url: 'https://hotel-vitrine-hotel-api-frontend.vercel.app',
    nome: { pt: 'Rede de Hotéis', en: 'Hotel Chain' },
    desc: { pt: 'Multi-propriedade, mapa de quartos por unidade/andar, portal do hóspede e financeiro com ocupação.', en: 'Multi-property, room map by unit/floor, guest portal and occupancy-based finances.' } },
  { id: 'restaurante', screenshot: 'screenshots/https-restaurante-oficial-restaurante-api-frontend-onrender-com.png', url: 'https://restaurante-oficial-restaurante-api.vercel.app',
    nome: { pt: 'Restaurante', en: 'Restaurant' },
    desc: { pt: 'Mapa de mesas, pedidos por status até a cozinha, cardápio e comissão de garçom.', en: 'Table map, order status tracking to the kitchen, menu and waiter commission.' } },
  { id: 'banco', screenshot: 'screenshots/https-banco-vitrine-banco-api-frontend-onrender-com.png', url: 'https://banco-vitrine-banco-api-frontend.vercel.app',
    nome: { pt: 'Banco Digital', en: 'Digital Bank' },
    desc: { pt: 'Ledger de partida dobrada, PIX/TED, limite diário e bloqueio automático de fraude — nível fintech.', en: 'Double-entry ledger, PIX/wire transfer, daily limit and automatic fraud blocking — fintech-grade.' } },
  { id: 'ead', screenshot: 'screenshots/https-ead-cursos-api-frontend-vercel-app.png', url: 'https://ead-cursos-api-frontend.vercel.app',
    nome: { pt: 'EAD — Venda de Cursos', en: 'EAD — Online Courses' },
    desc: { pt: 'Portal do aluno self-service: catálogo, compra, matrícula travada por pagamento, aula/quiz e certificado automático ao concluir.', en: 'Self-service student portal: catalog, purchase, payment-gated enrollment, lesson/quiz and automatic certificate on completion.' } },
  { id: 'leilao', screenshot: 'screenshots/https-leilao-online-api-frontend-vercel-app.png', url: 'https://leilao-online-api-frontend.vercel.app',
    nome: { pt: 'Leilão Online', en: 'Online Auction' },
    desc: { pt: 'Lances em tempo real com anti-sniping (estende o prazo no último minuto), lance mínimo validado e encerramento automático que define o vencedor sozinho.', en: 'Real-time bidding with anti-sniping (auto-extends in the last minute), validated minimum bid and automatic closing that picks the winner on its own.' } },
];

// Os 4 mais fortes ganham vitrine própria em "Destaques", com uma descrição
// mais profunda (não é o mesmo texto do carrossel) — reaproveita screenshot/url.
const DESTAQUES_IDS = ['banco', 'hotel', 'restaurante', 'marketplace'];
const DESTAQUES_DESC = {
  banco: { pt: 'Ledger de partida dobrada de verdade — toda transferência debita e credita atomicamente, com limite diário e bloqueio automático de fraude.', en: 'A real double-entry ledger — every transfer debits and credits atomically, with daily limit and automatic fraud blocking.' },
  hotel: { pt: 'Multi-propriedade nível grande rede: mapa de quartos por unidade/andar, reserva sem sobreposição de datas e portal do hóspede.', en: 'Big-chain-level multi-property: room map by unit/floor, no-overlap date booking and guest portal.' },
  restaurante: { pt: 'Mesa ocupa/libera sozinha com o pedido, item bloqueado quando sai do cardápio, comissão de garçom calculada pelo servidor.', en: "Table occupies/frees itself with the order, item locked when it's off the menu, waiter commission calculated server-side." },
  marketplace: { pt: 'Multi-vendedor nível Amazon/Shopee: lojas, comissão, carrinho, variação de produto e gateway de pagamento.', en: 'Amazon/Shopee-level multi-vendor: stores, commission, cart, product variants and payment gateway.' },
};
const DESTAQUES = DESTAQUES_IDS.map(id => {
  const p = PROJETOS.find(x => x.id === id);
  return { ...p, desc: DESTAQUES_DESC[id] };
});

const T = {
  pt: {
    nav: { sobre: 'Sobre', projetos: 'Projetos', stack: 'Stack', contato: 'Contato' },
    heroTitulo: 'Full Stack Developer — Java/Spring Boot & React/Angular',
    heroSub: '13 anos gerindo operação real, quase 3 construindo sistemas completos em produção: back-end em Spring Boot com JWT, JPA/Hibernate e PostgreSQL, front-end em React e Angular.',
    aboutKicker: 'Minha trajetória',
    aboutTitulo: '13 anos de operação real. Quase 3 construindo o software que sustenta ela.',
    aboutParagrafos: [
      'Passei 13 anos dentro de um supermercado — os últimos 8 como gerente, respondendo por equipe, estoque, prazo e resultado todo santo dia. Aprendi na prática o que quebra uma operação: processo mal desenhado, informação que não chega a tempo, gente sem ferramenta pra trabalhar direito.',
      'Há quase 3 anos, resolvi construir essas ferramentas com as próprias mãos. Mergulhei em Java, Spring Boot, APIs REST, JWT, JPA/Hibernate, PostgreSQL e Docker no back-end, e React e Angular no front — não em curso avulso, mas construindo sistemas completos, do banco de dados até a tela, pensados pra rodar em produção de verdade.',
      'Isso muda o tipo de desenvolvedor que sou: não escrevo pensando só em passar no teste — penso em quem vai usar aquilo numa segunda-feira de manhã com a loja lotada. É a mesma exigência que 13 anos de gestão ensinam, agora aplicada à arquitetura de software.',
    ],
    stats: [
      { num: '13', label: 'anos de operação e gestão real' },
      { num: '8', label: 'anos liderando equipe e resultado' },
      { num: '~3', label: 'anos construindo software em produção' },
      { num: '10+', label: 'sistemas completos no ar' },
    ],
    projetosTitulo: 'Projetos entregues',
    destaquesTitulo: 'Destaques',
    destaquesSub: '4 sistemas completos: backend Java + Spring Boot, frontend React, autenticação e deploy real — clique e navegue ao vivo.',
    stackTitulo: 'Stack',
    stackSub: 'O que uso pra tirar um sistema do zero e colocar em produção — sozinho, do banco de dados até a interface.',
    stackGrupos: { backend: 'Back-end', dados: 'Dados & Infra', frontend: 'Front-end', arquitetura: 'Arquitetura' },
    footerTitulo: 'Vamos conversar',
    footerSub: 'Aberto a oportunidades de desenvolvimento full stack Java/React. Resposta rápida por WhatsApp.',
    footerCopy: 'desenvolvido com React',
    noAr: 'No ar',
    verSistema: 'Ver sistema no ar →',
    abrirMenu: 'Abrir menu',
  },
  en: {
    nav: { sobre: 'About', projetos: 'Projects', stack: 'Stack', contato: 'Contact' },
    heroTitulo: 'Full Stack Developer — Java/Spring Boot & React/Angular',
    heroSub: '13 years managing real-world operations, almost 3 building complete systems in production: back-end in Spring Boot with JWT, JPA/Hibernate and PostgreSQL, front-end in React and Angular.',
    aboutKicker: 'My journey',
    aboutTitulo: '13 years of real operations. Almost 3 building the software that runs it.',
    aboutParagrafos: [
      "I spent 13 years inside a supermarket — the last 8 as a manager, accountable for staff, inventory, deadlines and results every single day. I learned firsthand what breaks an operation: badly designed processes, information that doesn't arrive on time, people without the right tools to do their job.",
      'Almost 3 years ago, I decided to build those tools with my own hands. I dove into Java, Spring Boot, REST APIs, JWT, JPA/Hibernate, PostgreSQL and Docker on the back-end, and React and Angular on the front — not a quick course, but building complete systems, from the database to the screen, designed to run in real production.',
      "That changes the kind of developer I am: I don't write code just to pass a test — I think about who's going to use it on a Monday morning with the store packed. It's the same standard 13 years of management teaches, now applied to software architecture.",
    ],
    stats: [
      { num: '13', label: 'years of real operations & management' },
      { num: '8', label: 'years leading teams and results' },
      { num: '~3', label: 'years building production software' },
      { num: '10+', label: 'complete systems live' },
    ],
    projetosTitulo: 'Delivered projects',
    destaquesTitulo: 'Highlights',
    destaquesSub: '4 complete systems: Java + Spring Boot backend, React frontend, real auth and deploy — click and navigate live.',
    stackTitulo: 'Stack',
    stackSub: 'What I use to take a system from zero to production — solo, from the database to the interface.',
    stackGrupos: { backend: 'Back-end', dados: 'Data & Infra', frontend: 'Front-end', arquitetura: 'Architecture' },
    footerTitulo: "Let's talk",
    footerSub: 'Open to full stack Java/React development opportunities. Quick reply on WhatsApp.',
    footerCopy: 'built with React',
    noAr: 'Live',
    verSistema: 'View live system →',
    abrirMenu: 'Open menu',
  },
};

function ProjectCard({ p, t, lang }) {
  return (
    <TiltCard>
      <div className="browser-frame">
        <div className="bar"><span></span><span></span><span></span></div>
        <img src={`${import.meta.env.BASE_URL}${p.screenshot}`} alt={p.nome[lang]} loading="lazy" />
      </div>
      <span className="proj-badge"><span className="dot"></span>{t.noAr}</span>
      <h3>{p.nome[lang]}</h3>
      <p>{p.desc[lang]}</p>
      <a className="proj-link" href={p.url} target="_blank" rel="noreferrer">{t.verSistema}</a>
    </TiltCard>
  );
}

function Navbar({ lang, setLang, t }) {
  const [aberto, setAberto] = React.useState(false);
  const fechar = () => setAberto(false);
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#topo" className="navbar-logo" onClick={fechar}>Erivelton Arantes</a>
        <nav className={`navbar-links ${aberto ? 'is-open' : ''}`}>
          <a href="#sobre" onClick={fechar}>{t.nav.sobre}</a>
          <a href="#projetos" onClick={fechar}>{t.nav.projetos}</a>
          <a href="#stack" onClick={fechar}>{t.nav.stack}</a>
          <a href="#contato" onClick={fechar}>{t.nav.contato}</a>
          <button
            className="lang-toggle"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label="Switch language"
          >
            {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
          </button>
          <div className="navbar-icons">
            <a href={CONTATO.github} target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
            <a href={CONTATO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </nav>
        <button className="navbar-toggle" onClick={() => setAberto(a => !a)} aria-label={t.abrirMenu}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

function Footer({ t }) {
  return (
    <footer id="contato" className="footer">
      <div className="container footer-inner">
        <div>
          <h2>{t.footerTitulo}</h2>
          <p className="destaques-sub">{t.footerSub}</p>
        </div>
        <div className="footer-links">
          <a href={CONTATO.whatsapp} target="_blank" rel="noreferrer" className="footer-link">💬 WhatsApp — {CONTATO.telefone}</a>
          <a href={CONTATO.github} target="_blank" rel="noreferrer" className="footer-link">GitHub — EriveltonArantes</a>
          <a href={CONTATO.linkedin} target="_blank" rel="noreferrer" className="footer-link">LinkedIn — Erivelton Arantes de Souza</a>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Erivelton Arantes — {t.footerCopy}.</p>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = React.useState('pt');
  const t = T[lang];

  return (
    <div>
      <Navbar lang={lang} setLang={setLang} t={t} />
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
        <h1>{t.heroTitulo}</h1>
        <p>{t.heroSub}</p>
      </section>
      <div id="sobre" className="container about-container">
        <span className="about-kicker">{t.aboutKicker}</span>
        <h2 className="about-title">{t.aboutTitulo}</h2>
        <div className="about-grid">
          <div className="about-text">
            {t.aboutParagrafos.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="about-stats">
            {t.stats.map(s => (
              <div className="stat-card" key={s.label}><span className="stat-num">{s.num}</span><span className="stat-label">{s.label}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div id="projetos" className="container">
        <h2>{t.projetosTitulo}</h2>
        <Carousel slides={PROJETOS.length}>
          {PROJETOS.map(p => (
            <div className="carousel-slide" key={p.id}><ProjectCard p={p} t={t} lang={lang} /></div>
          ))}
        </Carousel>
      </div>
      <div className="container">
        <h2>{t.destaquesTitulo}</h2>
        <p className="destaques-sub">{t.destaquesSub}</p>
        <div className="grid destaques-grid">
          {DESTAQUES.map(p => <ProjectCard key={p.id} p={p} t={t} lang={lang} />)}
        </div>
      </div>
      <div id="stack" className="container">
        <h2>{t.stackTitulo}</h2>
        <p className="destaques-sub">{t.stackSub}</p>
        <div className="stack-groups">
          {STACK.map(({ id, itens }) => (
            <div className="stack-group" key={id}>
              <h3 className="stack-group-title">{t.stackGrupos[id]}</h3>
              <div className="stack-badges">
                {itens.map(item => <span className="stack-badge" key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer t={t} />
      <a className="whatsapp-fab" href={CONTATO.whatsapp} target="_blank" rel="noreferrer">💬</a>
    </div>
  );
}
