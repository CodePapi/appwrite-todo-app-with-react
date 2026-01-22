import path from 'path'; // You might need to install @types/node if 'path' shows an error
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
		react(),
		checker({
			typescript: true,
		}),
	],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
});
