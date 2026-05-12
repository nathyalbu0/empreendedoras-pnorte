/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FCE4EC',
          100: '#F8BBD0',
          200: '#F48FB1',
          300: '#F06292',
          400: '#EC407A',
          500: '#C2185B',
          600: '#AD1457',
          700: '#880E4F',
          800: '#6A1B4D',
          900: '#4A0030',
        },
        neon: {
          pink: '#FF4D9D',
        },
        dark: {
          base: '#0F0F14',
          deeper: '#07070A',
          elevated: '#1A1A24',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-deep': 'linear-gradient(135deg, #0F0F14 0%, #1A1A24 100%)',
        'gradient-pink-deep': 'linear-gradient(135deg, #AD1457 0%, #880E4F 100%)',
        'gradient-hero': 'radial-gradient(circle at 70% 20%, rgba(255,77,157,0.15) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(194,24,91,0.15) 0%, transparent 50%)',
        'gradient-tech': 'radial-gradient(circle at 30% 30%, rgba(194,24,91,0.15) 0%, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(194, 24, 91, 0.1)',
        'glass-hover': '0 8px 32px 0 rgba(194, 24, 91, 0.2)',
        'glow-pink': '0 0 30px rgba(194, 24, 91, 0.3)',
        'glow-neon': '0 0 40px rgba(255, 77, 157, 0.2)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}