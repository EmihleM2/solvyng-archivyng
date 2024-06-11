
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    optimizeDeps: {
        exclude: ['chunk-XAW3BXJU.js']
    },
    server: {
        proxy: {
            '/api': 'http://localhost:5173'
        },
        open : true,
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
