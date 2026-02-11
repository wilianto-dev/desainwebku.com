import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    
    darkMode: ['class', '[data-theme="dark-corporate"]'],
    
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', 'Inter', ...defaultTheme.fontFamily.sans],
                mono: ['JetBrains Mono', 'Fira Code', ...defaultTheme.fontFamily.mono],
            },
            fontSize: {
                'heading-1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                'heading-2': ['2.5rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
                'heading-3': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
                'heading-4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
                'body-lg': ['1.125rem', { lineHeight: '1.6' }],
                'body': ['1rem', { lineHeight: '1.6' }],
                'body-sm': ['0.875rem', { lineHeight: '1.5' }],
            },
            spacing: {
                'section': '5rem',
                'section-sm': '3rem',
                'section-lg': '6rem',
                'container': '2rem',
                'card': '1.5rem',
            },
            animation: {
                // cyber theme animations
                'typing': 'typing 3.5s steps(40, end)',
                'blink-caret': 'blink-caret 0.75s step-end infinite',
                'matrix-scan': 'matrix-scan 8s linear infinite',
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'flicker': 'flicker 3s infinite',
                'grid-move': 'grid-move 20s linear infinite',
                
                // startup theme animations
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'button-lift': 'buttonLift 0.3s ease-out',
                
                // Dark corporate theme animations  
                'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                'border-glow': 'borderGlow 2s infinite',
                'elevate': 'elevate 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                
                // Modal animations
                'modal-fade-in': 'modalFadeIn 0.3s ease-out',
                'modal-scale-in': 'modalScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
                typing: {
                    'from': { width: '0' },
                    'to': { width: '100%' },
                },
                'blink-caret': {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: 'var(--color-primary)' },
                },
                'matrix-scan': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        boxShadow: '0 0 0 0 var(--color-glow)',
                        opacity: '1'
                    },
                    '50%': { 
                        boxShadow: '0 0 20px 0 var(--color-glow)',
                        opacity: '0.8'
                    },
                },
                'flicker': {
                    '0%, 100%': { opacity: '1' },
                    '41.99%': { opacity: '1' },
                    '42%': { opacity: '0.8' },
                    '42.99%': { opacity: '0.8' },
                    '43%': { opacity: '1' },
                    '45.99%': { opacity: '1' },
                    '46%': { opacity: '0.9' },
                    '46.99%': { opacity: '0.9' },
                    '47%': { opacity: '1' },
                },
                'grid-move': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(50px)' },
                },
                fadeInUp: {
                    '0%': { 
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                scaleIn: {
                    '0%': { 
                        opacity: '0',
                        transform: 'scale(0.95)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'scale(1)'
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                buttonLift: {
                    '0%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-2px)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { 
                        opacity: '0',
                        transform: 'translateY(30px)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                borderGlow: {
                    '0%, 100%': { 
                        borderColor: 'rgba(59, 130, 246, 0.3)',
                    },
                    '50%': { 
                        borderColor: 'rgba(34, 211, 238, 0.5)',
                    },
                },
                elevate: {
                    '0%': { 
                        transform: 'translateY(0)',
                        boxShadow: 'var(--shadow-sm)'
                    },
                    '100%': { 
                        transform: 'translateY(-4px)',
                        boxShadow: 'var(--shadow-lg)'
                    },
                },
                modalFadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                modalScaleIn: {
                    '0%': { 
                        opacity: '0',
                        transform: 'scale(0.95) translateY(10px)'
                    },
                    '100%': { 
                        opacity: '1',
                        transform: 'scale(1) translateY(0)'
                    },
                },
            },
            transitionTimingFunction: {
                'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            transitionDuration: {
                'theme': '350ms',
                'smooth': '400ms',
            },
        },
    },

    plugins: [forms],
};