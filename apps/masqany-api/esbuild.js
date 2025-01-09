import { build } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { globby } from "globby";
import path from "node:path";

const basePath = import.meta.dirname;
const entryPoints = await globby([`${basePath}/src/**/*.ts`, `!${basePath}`]);

const buildOptions = {
    entryPoints,
    minify: true,
    outdir: 'dist',
    logLevel: "info",
    bundle: true,
    platform: "node",
    sourcemap: true,
    plugins: [esbuildPluginPino({transports: ["pino-pretty"]})],
    packages: 'external',
    alias: {
        // add schemas, config, cache, etc
    }
};

await build({
    ...buildOptions,
});