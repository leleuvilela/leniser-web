import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                linspin: {
                    "100%": { transform: "rotate(360deg)" },
                },
                easespin: {
                    "12.5%": { transform: "rotate(135deg)" },
                    "25%": { transform: "rotate(270deg)" },
                    "37.5%": { transform: "rotate(405deg)" },
                    "50%": { transform: "rotate(540deg)" },
                    "62.5%": { transform: "rotate(675deg)" },
                    "75%": { transform: "rotate(810deg)" },
                    "87.5%": { transform: "rotate(945deg)" },
                    "100%": { transform: "rotate(1080deg)" },
                },
                "left-spin": {
                    "0%": { transform: "rotate(130deg)" },
                    "50%": { transform: "rotate(-5deg)" },
                    "100%": { transform: "rotate(130deg)" },
                },
                "right-spin": {
                    "0%": { transform: "rotate(-130deg)" },
                    "50%": { transform: "rotate(5deg)" },
                    "100%": { transform: "rotate(-130deg)" },
                },
                rotating: {
                    "0%, 100%": { transform: "rotate(360deg)" },
                    "50%": { transform: "rotate(0deg)" },
                },
                topbottom: {
                    "0%, 100%": { transform: "translate3d(0, -100%, 0)" },
                    "50%": { transform: "translate3d(0, 0, 0)" },
                },
                bottomtop: {
                    "0%, 100%": { transform: "translate3d(0, 0, 0)" },
                    "50%": { transform: "translate3d(0, -100%, 0)" },
                },
                line: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(100%)" },
                },
                "line-revert": {
                    "0%, 100%": { transform: "translateY(100%)" },
                    "50%": { transform: "translateY(0)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                linspin: "linspin 1568.2353ms linear infinite",
                easespin: "easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both",
                "left-spin":
                    "left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both",
                "right-spin":
                    "right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both",
                "ping-once": "ping 5s cubic-bezier(0, 0, 0.2, 1)",
                rotating: "rotating 30s linear infinite",
                topbottom: "topbottom 60s infinite alternate linear",
                bottomtop: "bottomtop 60s infinite alternate linear",
                "spin-1.5": "spin 1.5s linear infinite",
                "spin-2": "spin 2s linear infinite",
                "spin-3": "spin 3s linear infinite",
                line1: "line 10s infinite linear",
                line2: "line-revert 8s infinite linear",
                line3: "line 7s infinite linear",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
