import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/erivelton-portfolio/' só quando builda dentro do GitHub Actions
// (GITHUB_ACTIONS=true é setado automaticamente pelo runner) — o GitHub
// Pages serve esse projeto num subcaminho, então os assets com base '/'
// (padrão) davam 404 e a página ficava em branco. O Render (que serve na
// raiz do próprio domínio) continua com base '/' normalmente.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/erivelton-portfolio/' : '/',
  plugins: [react()],
});
