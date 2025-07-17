import { useApp } from "../contexts/AppContext";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useApp();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
};
