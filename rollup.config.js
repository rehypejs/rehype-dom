import fs from 'fs';
import path from 'path';
import babel from '@rollup/plugin-babel';

const PACKAGES_DIRECTORY = 'packages';
const PACKAGE_ENTRY = 'src/index.js';
const PACKAGES_PATH = path.join(__dirname, PACKAGES_DIRECTORY);

const external = (id) => (
  !id.startsWith('.')
  && !id.startsWith('/')
  && !id.startsWith('\0')
  && !id.endsWith(PACKAGE_ENTRY)
);

const configs = [];

// Building all packages in the monorepo
// Note: Build order is not important because interdependencies do not need to be resolved
const pkgNames = fs.readdirSync(path.join(__dirname, PACKAGES_DIRECTORY));
pkgNames.forEach((pkgName) => {
  const pkgPath = path.join(PACKAGES_DIRECTORY, pkgName);
  /* eslint-disable global-require, import/no-dynamic-require */
  const rollupConfigPath = path.join(PACKAGES_PATH, pkgName, 'rollup.config.js');
  const pkgJsonPath = path.join(PACKAGES_PATH, pkgName, 'package.json');
  if (!fs.existsSync(rollupConfigPath) && fs.existsSync(pkgJsonPath)) {
    const pkg = require(pkgJsonPath);
    configs.push({
      input: path.join(pkgPath, PACKAGE_ENTRY),
      output: [
        { file: path.join(pkgPath, pkg.main), format: 'cjs' },
        { file: path.join(pkgPath, pkg.module), format: 'es' },
      ],
      plugins: [
        babel({
          presets: [
            ['@babel/preset-env', { modules: false }],
          ],
          babelrc: false,
        }),
      ],
      external,
    });
  }
  /* eslint-enable global-require, import/no-dynamic-require */
}, []);

export default configs;
