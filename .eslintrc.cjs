module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: { max: 1 }, multiline: { max: 1 } }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/attributes-order': 'error',
    'vue/singleline-html-element-content-newline': 'error',
    'vue/html-indent': ['error', 2],
    'vue/html-quotes': ['error', 'double']
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    }
  ]
};
