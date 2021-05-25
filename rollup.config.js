
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'

import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

import packageJson from './package.json'

export default {
  input: 'src/index.ts',
  // All of your library files will be named exports from here.
  output: [
    // Common JS Support.
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },

    // ESM Support.
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    del({ targets: 'dist' }),
    // This prevents needing an additional `external` prop in this config file by automaticall excluding peer dependencies.
    peerDepsExternal(),

    // Convert CommonJS modules to ES6.
    commonjs({
      include: 'node_modules/**',
    }),

    // Locates modules using the Node resolution algorithm.
    resolve(),

    // TypeScript File Parsing.
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        exclude: [
          'node_modules',
          'dist',
          'scripts',
          'jest',
          '**/*.test.ts',
          '**/*.test.tsx'],
      },
    }),

    // Do Babel transpilation.
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),

    // Parsing & Minfying for ES6.
    terser(),
    // Visualizing Bundle Size and Composition.
    visualizer({
      json: true,
      filename: 'bundle-analysis.json',
      gzipSize: true,
    }),
  ],
}
