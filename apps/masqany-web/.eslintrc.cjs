const path = require('path');

module.exports = {
  root: true,
  extends: [require.resolve('@masqany/eslint/web', "@remix-run/eslint-config", "@remix-run/eslint-config/node")],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};
