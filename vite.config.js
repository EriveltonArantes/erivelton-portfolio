import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // nome do repo real no GitHub (erivelton-portfolio) é diferente do nome
  // da pasta local do projeto (erivelton-dev-portfolio) — legado; por isso
  // hardcoded aqui em vez de derivar do nome do projeto.
  base: process.env.GITHUB_ACTIONS ? '/erivelton-portfolio/' : '/',
  define: { __HERO_VARIANT_B__: JSON.stringify(!!process.env.GITHUB_ACTIONS) },
  plugins: [react()],
});
