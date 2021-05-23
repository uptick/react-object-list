
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

export default {
  input: 'src/index.ts',
  // All of your library files will be named exports from here
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    // This prevents needing an additional `external` prop in this config file by automaticall excluding peer dependencies
    peerDepsExternal(),
    // Convert CommonJS modules to ES6
    commonjs({
      include: 'node_modules/**',
    }),
    // "...locates modules using the Node resolution algorithm"
    resolve(),
    typescript({ useTsconfigDeclarationDir: true }),
    // Do Babel transpilation
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    terser(),
    visualizer({
      json: true,
      filename: 'bundle-analysis.json',
      gzipSize: true,
    }),
  ],
}
