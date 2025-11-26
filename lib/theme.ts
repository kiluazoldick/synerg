export const colors = {
  light: {
    bg: {
      primary: "#fafbfc",
      secondary: "#ffffff",
      tertiary: "#f3f4f6",
      hover: "#f9fafb",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
      tertiary: "#999999",
      inverse: "#ffffff",
    },
    border: "#e5e7eb",
    accent: {
      blue: "#0369a1",
      teal: "#0d9488",
      red: "#dc2626",
      green: "#16a34a",
      amber: "#d97706",
    },
    shadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    shadowMd: "0 4px 6px rgba(0, 0, 0, 0.07)",
  },
  dark: {
    bg: {
      primary: "#0f172a",
      secondary: "#1e293b",
      tertiary: "#334155",
      hover: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      inverse: "#0f172a",
    },
    border: "#334155",
    accent: {
      blue: "#0ea5e9",
      teal: "#14b8a6",
      red: "#f87171",
      green: "#4ade80",
      amber: "#fbbf24",
    },
    shadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    shadowMd: "0 4px 6px rgba(0, 0, 0, 0.4)",
  },
}

export type Theme = "light" | "dark"
