import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
	server: {
		allowedHosts:["f61f-176-253-68-62.ngrok-free.app"]
	},
})
