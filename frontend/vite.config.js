import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
	server: {
		allowedHosts:["ad53-2a02-c7c-5181-e300-1cfa-971e-484f-9ca.ngrok-free.app"]
	},
})
