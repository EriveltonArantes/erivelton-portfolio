import React from 'react';
import CursorPersonalizado from './componentes/CursorPersonalizado.jsx';
import HeroAnimado from './componentes/HeroAnimado.jsx';
import BotaoMagnetico from './componentes/BotaoMagnetico.jsx';
import Revelar, { Contador } from './componentes/Revelar.jsx';
import CartaoProjeto from './componentes/CartaoProjeto.jsx';
import GradeProjetos from './componentes/GradeProjetos.jsx';
import PaginaErro from './componentes/PaginaErro.jsx';
import SecaoLanterna from './componentes/SecaoLanterna.jsx';
import Rodape from './componentes/Rodape.jsx';
import useLenis from './componentes/useLenis.js';

const CONTATO = {
  whatsapp: 'https://wa.me/5534996915734',
  telefone: '+55 34 99691-5734',
  github: 'https://github.com/EriveltonArantes',
  linkedin: 'https://www.linkedin.com/in/erivelton-arantes-de-souza-46a4032b5/',
};

const STACK = [
  { id: 'backend', cor: 'azul', itens: ['Java', 'Spring Boot', 'FastAPI', 'REST APIs', 'JWT', 'JPA / Hibernate', 'PostgreSQL', 'Clean Architecture', 'RBAC'] },
  { id: 'deploy', cor: 'roxo', itens: ['Docker', 'GitHub Actions', 'CI/CD', 'Render', 'Vercel', 'Neon (Postgres serverless)', 'Git'] },
  { id: 'ia', cor: 'verde', itens: ['Agentes de IA', 'Pipelines com LLM', 'Python', 'Testes automatizados', 'Playwright', 'Pytest'] },
  { id: 'frontend', cor: 'rosa', itens: ['React', 'Angular', 'JavaScript', 'Vite', 'GSAP', 'Lenis'] },
];

// Cada projeto — nome/descrição em pt/en, screenshot e URL.
const PROJETOS = [
  { id: 'sorveteria', novo: true, categoria: 'comercio', tema: ['🍦', '🍨', '🛎️'], screenshot: 'screenshots/sorveteria.png', url: 'https://sorveteria-completa.vercel.app',
    nome: { pt: 'Sorveteria', en: 'Ice Cream Shop' },
    desc: { pt: 'Cardápio, balcão, mesas, pedidos com acompanhamento ao vivo, Pix e WhatsApp.', en: 'Menu, counter, tables, orders with live tracking, Pix and WhatsApp.' } },
  { id: 'assistencia', novo: true, categoria: 'servicos', tema: ['🔧', '📱', '🖨️'], screenshot: 'screenshots/assistencia.png', url: 'https://assistencia-pro-six.vercel.app',
    nome: { pt: 'Assistência Técnica Pro', en: 'Pro Repair Shop' },
    desc: { pt: 'Ordens de serviço com foto, estoque de peças sem furo, impressão da OS, Pix e aviso no WhatsApp.', en: 'Work orders with photo, stock without leaks, OS printing, Pix and WhatsApp notification.' } },
  { id: 'clinica-vida', novo: true, categoria: 'saude', tema: ['🩺', '💊', '❤️'], screenshot: 'screenshots/clinica-vida.png', url: 'https://clinica-vida-mu.vercel.app',
    nome: { pt: 'Clínica Vida', en: 'Clinic Vida' },
    desc: { pt: 'Agenda por profissional sem conflito de horário, prontuário, convênios, Pix e agendamento online.', en: 'Per-professional schedule without conflicts, medical records, insurance, Pix and online booking.' } },
  { id: 'academia-forca', novo: true, categoria: 'saude', tema: ['🏋️', '💪', '🔥'], screenshot: 'screenshots/academia-forca.png', url: 'https://academia-forca.vercel.app',
    nome: { pt: 'Academia Força Total', en: 'Gym Força Total' },
    desc: { pt: 'Alunos, planos, grade de aulas, mensalidades com Pix, avaliação física e aula experimental online.', en: 'Students, plans, class schedule, Pix payments, fitness assessment and online trial class.' } },
  { id: 'petshop-amigo', novo: true, categoria: 'servicos', tema: ['🐶', '🐱', '🐾'], screenshot: 'screenshots/petshop-amigo.png', url: 'https://petshop-amigo-six.vercel.app',
    nome: { pt: 'Petshop Amigo Fiel', en: 'Pet Shop Amigo Fiel' },
    desc: { pt: 'Banho e tosa com agenda, prontuário veterinário, aviso de pet pronto no WhatsApp e agendamento online.', en: 'Grooming schedule, veterinary records, pet-ready WhatsApp alert and online booking.' } },
  { id: 'escola', categoria: 'gestao', tema: ['📚', '✏️', '🎒'], screenshot: 'screenshots/https-escola-vitrine-escola-api-frontend-onrender-com.png', url: 'https://escola-vitrine-escola-api-frontend.vercel.app',
    nome: { pt: 'Escola', en: 'School' },
    desc: { pt: 'Matrícula, notas, boletim automático, financeiro com cobrança e portal da família — nível empresarial.', en: 'Enrollment, grades, automatic report cards, billing and a family portal — enterprise-grade.' } },
  { id: 'marketplace', categoria: 'comercio', tema: ['🥕', '🧺', '🍅'], screenshot: 'screenshots/https-feira-livre-marketplace-api-frontend-onrender-com.png', url: 'https://feira-livre-marketplace-api-fronten.vercel.app',
    nome: { pt: 'Marketplace', en: 'Marketplace' },
    desc: { pt: 'Multi-vendedor nível Amazon/Shopee: lojas, comissão, carrinho, variação de produto e gateway de pagamento.', en: 'Amazon/Shopee-level multi-vendor: stores, commission, cart, product variants and payment gateway.' } },
  { id: 'barbearia', categoria: 'servicos', tema: ['✂️', '💈', '🪒'], screenshot: 'screenshots/https-rede-barbearias-api-frontend-onrender-com.png', url: 'https://rede-barbearias-api-frontend.vercel.app',
    nome: { pt: 'Barbearia', en: 'Barbershop' },
    desc: { pt: 'Multi-unidade: agenda visual por barbeiro, comissão automática e dashboard de faturamento.', en: 'Multi-location: visual schedule per barber, automatic commission and revenue dashboard.' } },
  { id: 'oficina', categoria: 'servicos', tema: ['🚗', '🔧', '🔩'], screenshot: 'screenshots/https-oficina-mecanica-api-frontend-onrender-com.png', url: 'https://oficina-mecanica-api-frontend.vercel.app',
    nome: { pt: 'Oficina Mecânica', en: 'Auto Repair Shop' },
    desc: { pt: 'Ordens de serviço, controle por mecânico, peças e comissão — backend Java + frontend React.', en: 'Work orders, per-mechanic tracking, parts and commission — Java backend + React frontend.' } },
  { id: 'hotel', categoria: 'servicos', tema: ['🏨', '🧳', '🌴'], screenshot: 'screenshots/https-hotel-vitrine-hotel-api-frontend-onrender-com.png', url: 'https://hotel-vitrine-hotel-api-frontend.vercel.app',
    nome: { pt: 'Rede de Hotéis', en: 'Hotel Chain' },
    desc: { pt: 'Multi-propriedade, mapa de quartos por unidade/andar, portal do hóspede e financeiro com ocupação.', en: 'Multi-property, room map by unit/floor, guest portal and occupancy-based finances.' } },
  { id: 'restaurante', categoria: 'comercio', tema: ['🍽️', '🍷', '👨‍🍳'], screenshot: 'screenshots/https-restaurante-oficial-restaurante-api-frontend-onrender-com.png', url: 'https://restaurante-oficial-restaurante-api.vercel.app',
    nome: { pt: 'Restaurante', en: 'Restaurant' },
    desc: { pt: 'Mapa de mesas, pedidos por status até a cozinha, cardápio e comissão de garçom.', en: 'Table map, order status tracking to the kitchen, menu and waiter commission.' } },
  { id: 'banco', categoria: 'financas', tema: ['💳', '💰', '🏦'], screenshot: 'screenshots/https-banco-vitrine-banco-api-frontend-onrender-com.png', url: 'https://banco-vitrine-banco-api-frontend.vercel.app',
    nome: { pt: 'Banco Digital', en: 'Digital Bank' },
    desc: { pt: 'Ledger de partida dobrada, PIX/TED, limite diário e bloqueio automático de fraude — nível fintech.', en: 'Double-entry ledger, PIX/wire transfer, daily limit and automatic fraud blocking — fintech-grade.' } },
  { id: 'ead', categoria: 'gestao', tema: ['🎓', '💻', '🏆'], screenshot: 'screenshots/https-ead-cursos-api-frontend-vercel-app.png', url: 'https://ead-cursos-api-frontend.vercel.app',
    nome: { pt: 'EAD — Venda de Cursos', en: 'EAD — Online Courses' },
    desc: { pt: 'Portal do aluno self-service: catálogo, compra, matrícula travada por pagamento, aula/quiz e certificado automático ao concluir.', en: 'Self-service student portal: catalog, purchase, payment-gated enrollment, lesson/quiz and automatic certificate on completion.' } },
  { id: 'leilao', categoria: 'comercio', tema: ['🔨', '🏷️', '💎'], screenshot: 'screenshots/https-leilao-online-api-frontend-vercel-app.png', url: 'https://leilao-online-api-frontend.vercel.app',
    nome: { pt: 'Leilão Online', en: 'Online Auction' },
    desc: { pt: 'Lances em tempo real com anti-sniping (estende o prazo no último minuto), lance mínimo validado e encerramento automático que define o vencedor sozinho.', en: 'Real-time bidding with anti-sniping (auto-extends in the last minute), validated minimum bid and automatic closing that picks the winner on its own.' } },
];

const T = {
  pt: {
    nav: { sobre: 'Sobre', projetos: 'Projetos', stack: 'Stack', contato: 'Contato' },
    heroTitulo: 'Full Stack Developer — Java/Spring Boot & React/Angular',
    heroSub: '13 anos gerindo operação real, quase 3 construindo sistemas completos em produção: back-end em Spring Boot com JWT, JPA/Hibernate e PostgreSQL, front-end em React e Angular.',
    heroCtaProjetos: 'Ver projetos',
    heroCtaContato: '💬 Falar no WhatsApp',
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
    fabrica: {
      kicker: 'Como eu construo',
      titulo: 'Uma fábrica de software com IA — e testes que não deixam nada passar',
      dica: 'mova o mouse para iluminar',
      passos: [
        { titulo: 'Contrato', texto: 'Cada sistema começa como uma especificação: entidades, regras de negócio, perfis de acesso e exemplos do que tem que acontecer.' },
        { titulo: 'Agentes de IA codam', texto: 'Um pipeline com LLM escreve back-end e front-end em fatias pequenas, seguindo convenções fixas — dentro de um ambiente isolado.' },
        { titulo: 'A fábrica testa tudo', texto: 'Mais de 100 testes por sistema: API, regras, segurança e navegador real campo a campo. Os testes nunca são escritos por quem coda.' },
        { titulo: 'Publica com 1 comando', texto: 'Docker, banco Postgres, API e site no ar automaticamente — GitHub, Render, Vercel e Neon. As demos desta página nasceram assim.' },
      ],
    },
    stackGrupos: { backend: 'Back-end & dados', deploy: 'Container & deploy', ia: 'Automação & IA', frontend: 'Front-end & UX' },
    footerTitulo: 'Vamos conversar',
    footerSub: 'Aberto a oportunidades de desenvolvimento full stack Java/React. Resposta rápida por WhatsApp.',
    footerCopy: 'desenvolvido com React',
    noAr: 'No ar',
    verSistema: 'Ver sistema no ar →',
    abrirMenu: 'Abrir menu',
    filtroTodos: 'Todos',
    cat_gestao: 'Gestão',
    cat_saude: 'Saúde',
    cat_comercio: 'Comércio',
    cat_financas: 'Finanças',
    cat_servicos: 'Serviços',
  },
  en: {
    nav: { sobre: 'About', projetos: 'Projects', stack: 'Stack', contato: 'Contact' },
    heroTitulo: 'Full Stack Developer — Java/Spring Boot & React/Angular',
    heroSub: '13 years managing real-world operations, almost 3 building complete systems in production: back-end in Spring Boot with JWT, JPA/Hibernate and PostgreSQL, front-end in React and Angular.',
    heroCtaProjetos: 'View projects',
    heroCtaContato: '💬 Chat on WhatsApp',
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
    fabrica: {
      kicker: 'How I build',
      titulo: 'An AI software factory — with tests that let nothing slip',
      dica: 'move your mouse to light it up',
      passos: [
        { titulo: 'Contract', texto: 'Every system starts as a spec: entities, business rules, access roles and examples of what must happen.' },
        { titulo: 'AI agents code', texto: 'An LLM pipeline writes back-end and front-end in small slices, following fixed conventions — inside a sandbox.' },
        { titulo: 'The factory tests everything', texto: '100+ tests per system: API, rules, security and a real browser field by field. Tests are never written by whoever codes.' },
        { titulo: 'Ships with 1 command', texto: 'Docker, Postgres, API and site live automatically — GitHub, Render, Vercel and Neon. The demos on this page were born this way.' },
      ],
    },
    stackGrupos: { backend: 'Back-end & data', deploy: 'Container & deploy', ia: 'Automation & AI', frontend: 'Front-end & UX' },
    footerTitulo: "Let's talk",
    footerSub: 'Open to full stack Java/React development opportunities. Quick reply on WhatsApp.',
    footerCopy: 'built with React',
    noAr: 'Live',
    verSistema: 'View live system →',
    abrirMenu: 'Open menu',
    filtroTodos: 'All',
    cat_gestao: 'Management',
    cat_saude: 'Health',
    cat_comercio: 'Commerce',
    cat_financas: 'Finance',
    cat_servicos: 'Services',
  },
};

// Destaques
const DESTAQUES_IDS = ['banco', 'hotel', 'restaurante', 'marketplace'];
const DESTAQUES_DESC = {
  banco: { pt: 'Ledger de partida dobrada de verdade — toda transferência debita e credita atomicamente, com limite diário e bloqueio automático de fraude.', en: 'A real double-entry ledger — every transfer debits and credits atomically, with daily limit and automatic fraud blocking.' },
  hotel: { pt: 'Multi-propriedade nível grande rede: mapa de quartos por unidade/andar, reserva sem sobreposição de datas e portal do hóspede.', en: 'Big-chain-level multi-property: room map by unit/floor, no-overlap date booking and guest portal.' },
  restaurante: { pt: 'Mesa ocupa/libera sozinha com o pedido, item bloqueado quando sai do cardápio, comissão de garçom calculada pelo servidor.', en: "Table occupies/frees itself with the order, item locked when it's off the menu, waiter commission calculated server-side." },
  marketplace: { pt: 'Multi-vendedor nível Amazon/Shopee: lojas, comissão, carrinho, variação de produto e gateway de pagamento.', en: 'Amazon/Shopee-level multi-vendor: stores, commission, cart, product variants and payment gateway.' },
};
const DESTAQUES = DESTAQUES_IDS.map(id => {
  const p = PROJETOS.find(x => x.id === id);
  if (!p) return null;
  return { ...p, desc: DESTAQUES_DESC[id] };
}).filter(Boolean);

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

export default function App() {
  const [lang, setLang] = React.useState('pt');
  const t = T[lang];
  const [hash, setHash] = React.useState(window.location.hash);

  useLenis();

  React.useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Página de erro para /#/erro ou qualquer hash não vazio
  const paginaAtual = hash.replace('#', '');
  if (paginaAtual && paginaAtual !== 'topo' && paginaAtual !== 'sobre' && paginaAtual !== 'projetos' && paginaAtual !== 'stack' && paginaAtual !== 'contato') {
    return (
      <div>
        <CursorPersonalizado />
        <PaginaErro lang={lang} />
      </div>
    );
  }

  return (
    <div>
      <CursorPersonalizado />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <HeroAnimado titulo={t.heroTitulo} sub={t.heroSub}>
        <div className="hero-cta-row">
          <BotaoMagnetico className="hero-cta hero-cta-primary" href="#projetos">{t.heroCtaProjetos}</BotaoMagnetico>
          <BotaoMagnetico className="hero-cta hero-cta-ghost" href={CONTATO.whatsapp}>{t.heroCtaContato}</BotaoMagnetico>
        </div>
      </HeroAnimado>
      <div id="sobre" className="container about-container">
        <Revelar as="span" className="about-kicker">{t.aboutKicker}</Revelar>
        <Revelar as="h2" className="about-title">{t.aboutTitulo}</Revelar>
        <div className="about-grid">
          <div className="about-text">
            {t.aboutParagrafos.map((p, i) => <Revelar as="p" delay={i * 80} key={i}>{p}</Revelar>)}
          </div>
          <div className="about-stats">
            {t.stats.map((s, i) => (
              <Revelar as="div" className="stat-card" delay={i * 90} key={s.label}>
                <span className="stat-num"><Contador value={s.num} /></span>
                <span className="stat-label">{s.label}</span>
              </Revelar>
            ))}
          </div>
        </div>
      </div>
      <div id="projetos" className="container">
        <Revelar as="h2">{t.projetosTitulo}</Revelar>
        <GradeProjetos projetos={PROJETOS} t={t} lang={lang} />
      </div>
      <div className="container">
        <Revelar as="h2">{t.destaquesTitulo}</Revelar>
        <Revelar as="p" className="destaques-sub">{t.destaquesSub}</Revelar>
        <div className="grid destaques-grid">
          {DESTAQUES.map((p, i) => (
            <Revelar delay={i * 90} key={p.id}>
              <CartaoProjeto p={p} t={t} lang={lang} />
            </Revelar>
          ))}
        </div>
      </div>
      <SecaoLanterna {...t.fabrica} />
      <div id="stack" className="container">
        <Revelar as="h2">{t.stackTitulo}</Revelar>
        <Revelar as="p" className="destaques-sub">{t.stackSub}</Revelar>
        <div className="stack-groups">
          {STACK.map(({ id, cor, itens }, i) => (
            <Revelar as="div" className={`stack-group stack-${cor}`} delay={i * 90} key={id}>
              <h3 className="stack-group-title">{t.stackGrupos[id]}</h3>
              <div className="stack-badges">
                {itens.map(item => <span className="stack-badge" key={item}>{item}</span>)}
              </div>
            </Revelar>
          ))}
        </div>
      </div>
      <Rodape t={t} contato={CONTATO} />
      <a className="whatsapp-fab" href={CONTATO.whatsapp} target="_blank" rel="noreferrer">💬</a>
    </div>
  );
}
