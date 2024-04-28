import {defineConfig} from "vite";
import {resolve} from 'path';

// Define the root directory for ease of reference
const rootDir = resolve(__dirname, "starter-code");

export default defineConfig({
    root: rootDir,  // This should be the directory, not the file
    server: {
        open: "/index.html"
    },

    build: {
        rollupOptions: {
            input: {
                main: resolve(rootDir, "index.html"),
                crew: resolve(rootDir, "crew.html"),
                destinations: resolve(rootDir, "destinations.html"),
                technologies: resolve(rootDir, "technologies.html")
            }
        }
    }

});