module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6',
        },
        accent: {
          DEFAULT: '#10b981', // green-500
          dark: '#059669',
        },
        soft: {
          50: '#f8fafc',
          100: '#f1f5f9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 18px rgba(16,24,40,0.06)',
      }
    }
  },
  plugins: [],
}
