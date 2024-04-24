// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react";
// import svgrPlugin from "vite-plugin-svgr";

// // https://vitejs.dev/config/
// export default defineConfig({
//     build: {
//         outDir: "build",
//     },
//     plugins: [
//         reactRefresh(),
//         svgrPlugin({
//             svgrOptions: {
//                 icon: true,
//             },
//         }),
//     ],
// });


import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
