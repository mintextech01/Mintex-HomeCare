import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

/**
 * Animated sun/moon toggle button.
 * Works on all screen sizes — renders inline in the header.
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        background: isDark
          ? "rgba(255,255,255,0.08)"
          : "rgba(38,104,188,0.08)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(38,104,188,0.12)"}`,
      }}
    >
      {/* Sun icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[18px] h-[18px] absolute"
        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#f59e0b" }}
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </motion.svg>

      {/* Moon icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[18px] h-[18px] absolute"
        style={{ color: isDark ? "#60a5fa" : "rgba(0,0,0,0.3)" }}
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>
    </button>
  );
};

export default ThemeToggle;
