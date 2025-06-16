/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode based on a class applied to the root element
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: "#9d62f5", // Main purple
        "primary-50": "#f5f0ff", // Lightest purple
        "primary-100": "#e9dfff", // Very light purple
        "primary-500": "#9d62f5", // Main purple
        "primary-600": "#8a4ed9", // Slightly darker purple
        "primary-700": "#7a3dc2", // Dark purple

        // Secondary Colors
        secondary: "#64748b", // Sophisticated slate - slate-500
        "secondary-50": "#f8fafc", // Light slate (50-level shade) - slate-50
        "secondary-100": "#f1f5f9", // Light slate (100-level shade) - slate-100
        "secondary-200": "#e2e8f0", // Light slate (200-level shade) - slate-200
        "secondary-300": "#cbd5e1", // Light-medium slate (300-level shade) - slate-300
        "secondary-400": "#94a3b8", // Medium slate (400-level shade) - slate-400
        "secondary-600": "#475569", // Medium-dark slate (600-level shade) - slate-600
        "secondary-700": "#334155", // Dark slate (700-level shade) - slate-700
        "secondary-800": "#1e293b", // Very dark slate (800-level shade) - slate-800
        "secondary-900": "#0f172a", // Near-black slate (900-level shade) - slate-900

        // Accent Colors
        accent: "#f59e0b", // Warm amber - amber-500
        "accent-50": "#fffbeb", // Light amber (50-level shade) - amber-50
        "accent-100": "#fef3c7", // Light amber (100-level shade) - amber-100
        "accent-200": "#fde68a", // Light amber (200-level shade) - amber-200
        "accent-300": "#fcd34d", // Light-medium amber (300-level shade) - amber-300
        "accent-400": "#fbbf24", // Medium amber (400-level shade) - amber-400
        "accent-600": "#d97706", // Medium-dark amber (600-level shade) - amber-600
        "accent-700": "#b45309", // Dark amber (700-level shade) - amber-700

        // Light Mode Default Colors
        background: "#ffffff", // Pure white - white
        surface: "#f8fafc", // Subtle off-white - slate-50
        "text-primary": "#0f172a", // Near-black - slate-900
        "text-secondary": "#64748b", // Medium gray - slate-500
        border: "#e2e8f0", // Minimal border - slate-200
        "border-light": "#f1f5f9", // Light border - slate-100

        // Dark Mode Overrides (prefixed with 'dark:')
        // These colors will apply when the 'dark' class is present on the html tag
        dark: {
          background: "#1a202c", // Dark charcoal
          surface: "#2d3748", // Dark slate gray
          "text-primary": "#ffffff", // White text
          "text-secondary": "#a0aec0", // Light gray text
          border: "#4a5568", // Darker border
          "border-light": "#2d3748", // Dark border light
        },

        // Status Colors
        success: "#059669", // Forest green - emerald-600
        "success-50": "#ecfdf5", // Light green (50-level shade) - emerald-50
        "success-100": "#d1fae5", // Light green (100-level shade) - emerald-100
        "success-500": "#10b981", // Medium green (500-level shade) - emerald-500
        "success-700": "#047857", // Dark green (700-level shade) - emerald-700

        warning: "#d97706", // Balanced orange - amber-600
        "warning-50": "#fffbeb", // Light orange (50-level shade) - amber-50
        "warning-100": "#fef3c7", // Light orange (100-level shade) - amber-100
        "warning-500": "#f59e0b", // Medium orange (500-level shade) - amber-500
        "warning-700": "#b45309", // Dark orange (700-level shade) - amber-700

        error: "#dc2626", // Clear red - red-600
        "error-50": "#fef2f2", // Light red (50-level shade) - red-50
        "error-100": "#fee2e2", // Light red (100-level shade) - red-100
        "error-500": "#ef4444", // Medium red (500-level shade) - red-500
        "error-700": "#b91c1c", // Dark red (700-level shade) - red-700
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.1)",
        modal: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      transitionDuration: {
        150: "150ms",
        300: "300ms",
      },
      transitionTimingFunction: {
        micro: "ease",
        layout: "ease-out",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      zIndex: {
        header: "100",
        dropdown: "200",
        "mobile-menu": "300",
        modal: "400",
      },
    },
  },
  plugins: [],
};
