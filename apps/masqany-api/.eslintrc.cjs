const path = require('path');

module.exports = {
  root: true,
  extends: [require.resolve('@masqany/eslint/node')],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};
