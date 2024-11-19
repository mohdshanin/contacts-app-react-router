import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    base: env.VITE_BASE_PATH || "/contacts-app-react-router",
    plugins: [react()],
  };
});
