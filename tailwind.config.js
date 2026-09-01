/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lab: {
          950: '#04070E',
          900: '#070C18',
          850: '#0B1324',
          800: '#0F1A30',
          700: '#16233F',
          600: '#1E3054',
          500: '#2A4374',
          border: '#1B2C4E',
          'border-bright': '#2A457A',
        },
        cyan: {
          glow: '#00F0FF',
          accent: '#00C8FF',
          deep: '#0088CC',
        },
        blue: {
          cad: '#2563EB',
          technical: '#1D4ED8',
          glow: '#3B82F6',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#06B6D4',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'blueprint-grid': 'linear-gradient(to right, rgba(0, 240, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.04) 1px, transparent 1px)',
        'blueprint-dense': 'linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px)',
        'radial-vignette': 'radial-gradient(circle at center, rgba(11, 19, 36, 0) 0%, rgba(4, 7, 14, 0.95) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
