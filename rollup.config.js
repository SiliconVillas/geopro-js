import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const esModule = {
  file: pkg.module,
  format: 'es',
  sourcemap: true,
};
const esmModule = {
  file: pkg.esm,
  format: 'esm',
  sourcemap: true,
};
const cjModule = {
  file: pkg.main,
  format: 'cjs',
};

export default {
  input: 'src/index.ts',
  output: [esModule, cjModule],
  plugins: [typescript(), json(), terser()],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};
