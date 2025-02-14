import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import dotenv from 'dotenv';
import fs from 'fs'; // Add this to read/write files

// Load environment variables from .env file
dotenv.config();

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    // Add the replace plugin to inject the BASE_PATH environment variable
    replace({
      preventAssignment: true,
      values: {
        '%BASE_PATH%': JSON.stringify(process.env.BASE_PATH || '/'),
      },
    }),

    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte'],
    }),
    commonjs(),

    // Generate index.html from the template
    {
      name: 'generate-index-html',
      writeBundle() {
        const templatePath = 'public/index.template.html';
        const outputPath = 'public/index.html';

        // Read the template file
        const template = fs.readFileSync(templatePath, 'utf8');

        // Replace placeholders with environment variables
        const finalHtml = template.replace(
          /%BASE_PATH%/g,
          process.env.BASE_PATH || '/'
        );

        // Write the final index.html file
        fs.writeFileSync(outputPath, finalHtml, 'utf8');
      },
    },

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
