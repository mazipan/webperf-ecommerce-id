module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
