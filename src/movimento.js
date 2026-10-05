// Decisão de produto: os efeitos ficam sempre ligados. Muitos Windows vêm com "Efeitos de animação"
// desligados e o navegador repassa isso como prefers-reduced-motion — o visitante (recrutador/cliente)
// nem sabe e veria o site sem a apresentação. Para voltar a respeitar a preferência, devolva
// window.matchMedia('(prefers-reduced-motion: reduce)').matches.
export const reduzirMovimento = () => false;
