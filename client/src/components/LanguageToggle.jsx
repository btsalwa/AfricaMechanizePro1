import { useApp } from "../contexts/AppContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useApp();

  return (
    <div className="hidden md:flex items-center space-x-2">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
          language === "en"
            ? "text-primary bg-primary/10"
            : "text-gray-600 dark:text-gray-400 hover:text-primary"
        }`}
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => setLanguage("fr")}
        className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
          language === "fr"
            ? "text-primary bg-primary/10"
            : "text-gray-600 dark:text-gray-400 hover:text-primary"
        }`}
      >
        FR
      </button>
    </div>
  );
};
