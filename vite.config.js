import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
	server: {
		proxy: {
			"/api": {
				target: "http://192.168.1.100:4000",
				changeOrigin: true,
				rewrite: (path) => {
					return path.replace(/^\/api/, "")
				}
			}
		}
	}
});
