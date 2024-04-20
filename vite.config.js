import {defineConfig} from "vite";
import {resolve} from 'path';

export default defineConfig({
    root: resolve(__dirname, "starter-code"),  // This should be the directory, not the file
    server: {
        open: "/technologies.html"
    }

})