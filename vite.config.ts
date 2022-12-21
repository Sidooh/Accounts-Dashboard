import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            components: '/src/components',
            config: '/src/config',
            pages: '/src/pages',
            routes: '/src/routes',
            stores: '/src/stores',
            utils: '/src/utils'
        }
    },
    server: {
        port: 3000
    },
    plugins: [
        vue(),
        // VitePWA({
        //     mode: "development",
        //     base: "/",
        //     srcDir: "src",
        //     filename: "sw.ts",
        //     includeAssets: ["/favicon.png"],
        //     strategies: "injectManifest",
        //     manifest: {
        //         name: "Sidooh Accounts Dashboard",
        //         short_name: "Sidooh Accounts",
        //         theme_color: "#ffffff",
        //         start_url: "/",
        //         display: "standalone",
        //         background_color: "#ffffff",
        //         icons: [
        //             {
        //                 src: "icon-192.png",
        //                 sizes: "192x192",
        //                 type: "image/png",
        //             },
        //             {
        //                 src: "/icon-512.png",
        //                 sizes: "512x512",
        //                 type: "image/png",
        //             },
        //             {
        //                 src: "icon-512.png",
        //                 sizes: "512x512",
        //                 type: "image/png",
        //                 purpose: "any maskable",
        //             },
        //         ],
        //     },
        // })
    ]
})
