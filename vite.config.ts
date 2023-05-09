import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
	base: command === 'serve' ? '' : '/build/',
	plugins: [react(), tsconfigPaths()],
	build: {
		manifest: true,
		emptyOutDir: true,
		copyPublicDir: false,
		outDir: 'public/build',
	},
	server: {
		port: 3000,
	},
}));
