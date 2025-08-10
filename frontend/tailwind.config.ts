import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'emerald-custom': '#008056',
        'light-gray-custom': '#f0f0f0',
        'accent-yellow-custom': '#FFD700',
      },
    },
  },
  plugins: [],
};
export default config;
