const path = require('path');
console.log("PATH", path.resolve(__dirname, './tsconfig.json'))
module.exports = {
  root: true,
  extends: [require.resolve('@masqany/eslint/web', "@remix-run/eslint-config", "@remix-run/eslint-config/node")],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};
