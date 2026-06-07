/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        surface:  'var(--surface)',
        surface2: 'var(--surface2)',
        border:   'var(--border)',
        accent:   'var(--accent)',
        accent2:  'var(--accent2)',
        ink:      'var(--ink)',
        text:     'var(--text)',
        'text-dim': 'var(--text-dim)',
        gold:     'var(--gold)',
        rust:     'var(--rust)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)',    'serif'],
      },
      transitionTimingFunction: {
        ink:    'cubic-bezier(.25,.46,.45,.94)',
        spring: 'cubic-bezier(.22,1,.36,1)',
        out:    'cubic-bezier(.16,1,.3,1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
