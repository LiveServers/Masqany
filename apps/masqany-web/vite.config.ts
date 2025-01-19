import { vitePlugin as remix } from "@remix-run/dev";
import { flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {installGlobals} from "@remix-run/node";

installGlobals();

export default defineConfig(() => {
    return {
        server: {
            host: true,
        },
        plugins: [
            remix({
                appDirectory: './app',
                ignoredRouteFiles: ['**/.*'],
                routes: async (defineRoutes) => {
                    return flatRoutes('routes', defineRoutes, {
                        appDir: './app',
                        ignoredRouteFiles: [
                            '.*', 
                            '**/*.css', 
                            '**/*.test.{js,jsx,ts,tsx}', 
                            '**/__*.*', '**/components/**/*', 
                            '**/helpers/**/*', 
                            '**/types/**/*', 
                            '**/hooks/**/*'
                        ],
                    });
                }
            }), 
            tsconfigPaths()
        ],
        build: {
            target: 'es2022',
        }
    }
  });
