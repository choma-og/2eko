import { resolve } from 'node:path';
import { defineConfig } from 'vite';
// import imagemin from 'unplugin-imagemin/vite';
import squooshPlugin from 'vite-plugin-squoosh';
import autoprefixer from 'autoprefixer';
import browserslist from 'browserslist';
import handlebars from 'vite-plugin-handlebars';
import zipPack from "vite-plugin-zip-pack";
import HandlebarUpdate from "./src/js/handlebarUpdate";


const pageData = {
  "/index.html": {
    isHome: true,
  },
};

// @see https://github.com/vitejs/vite/issues/5815
global.navigator = undefined

export default defineConfig({
  
  resolve: {
    alias: {
      '@' : resolve(__dirname, 'src'),
    },
  },
  server: {
    hmr: true,
    open: true,
    host: true,
    port: 8888,
  },
    base: '/2eko/',
  // root: "src",
  // publicDir: "public",
  build: {
    // outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: false,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(
          {
            overrideBrowserslist: browserslist(),
          }
        )
        // Другие плагины postcss
      ],
    },
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules']
      }
    }
  },
  // input: {
  //   index: resolve(__dirname, "index.html"),
  // },
  plugins: [
    HandlebarUpdate(),
    squooshPlugin({
      // Specify codec options.
      codecs: {
          // mozjpeg: { quality: 30, smoothing: 1 },
          // webp: { quality: 25 },
          // avif: { cqLevel: 20, sharpness: 1 },
          // jxl: { quality: 30 },
          // wp2: { quality: 40 },
          // oxipng: { level: 3 }
          jpg: {
            quality: 85,
          },
          gif: {
            quality: 90,
          },
      },
      // Do not encode .wp2 and .webp files.
      exclude: /.(wp2|webp)$/,
      // Encode png to webp.
      // encodeTo: [{ from: /.png$/, to: "webp" }]
      encodeTo: [
        { from: /.png$/, to: 'webp' },
        { from: /.jpeg$/, to: 'webp' },
        { from: /.jpg$/, to: 'webp' },
        { from: /.gif$/, to: 'webp' },
      ],
  }),
    // imagemin({
    //   mode: 'sharp',
    //   compress: {
    //     jpg: {
    //       quality: 70,
    //     },
    //     jpeg: {
    //       quality: 70,
    //     },
    //     png: {
    //       quality: 70,
    //     },
    //     webp: {
    //       quality: 70,
    //     },
    //     gif: {
    //       quality: 90,
    //     }
    //   },
    //   conversion: [
    //     { from: 'png', to: 'webp' },
    //     { from: 'jpeg', to: 'webp' },
    //     { from: 'jpg', to: 'webp' },
    //   ]
    // }),
    handlebars({
      partialDirectory: resolve(__dirname, "src", "partials"),
      context(pagePath) {
        return pageData[pagePath];
      },
      reloadOnPartialChange: true,
    }),
    zipPack({
      outFileName: `choma__project.zip`
    }),
  ],
})