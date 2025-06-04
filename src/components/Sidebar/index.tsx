"use client";
import {
  Home,
  BarChart2,
  FileText,
  Settings,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/providers/theme"; // Импортируем хук

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("Главная");
  const { theme, toggleTheme } = useTheme(); // Используем хук

  return (
    <div
      className={`
      hidden md:flex flex-col h-full 
      bg-white dark:bg-gray-800 
      border-r border-gray-200 dark:border-gray-700
      transition-all duration-300 ease-in-out overflow-hidden 
      ${expanded ? "w-64" : "w-20"}
    `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">N</span>
          </div>
          {expanded && (
            <span className="ml-3 text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
              Next.js
            </span>
          )}
        </div>
        {expanded && (
          <button
            onClick={toggleTheme} // Используем toggleTheme из контекста
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "dark" ? ( // Используем theme из контекста
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-1 px-2">
        <SidebarLink
          icon={<Home className="w-5 h-5" />}
          text="Главная"
          active={activeLink === "Главная"}
          onClick={() => setActiveLink("Главная")}
          expanded={expanded}
        />
        <SidebarLink
          icon={<BarChart2 className="w-5 h-5" />}
          text="Аналитика"
          active={activeLink === "Аналитика"}
          onClick={() => setActiveLink("Аналитика")}
          expanded={expanded}
        />
        <SidebarLink
          icon={<FileText className="w-5 h-5" />}
          text="Документы"
          active={activeLink === "Документы"}
          onClick={() => setActiveLink("Документы")}
          expanded={expanded}
        />
        <SidebarLink
          icon={<Settings className="w-5 h-5" />}
          text="Настройки"
          active={activeLink === "Настройки"}
          onClick={() => setActiveLink("Настройки")}
          expanded={expanded}
        />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-md">
            <span className="text-xs text-white font-medium">ИИ</span>
          </div>
          {expanded && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Иван Иванов
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Администратор
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// SidebarLink остаётся без изменений
function SidebarLink({
  icon,
  text,
  active = false,
  expanded,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200
        ${
          active
            ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
        }
      `}
    >
      <div className={`flex items-center justify-center w-6 h-6`}>{icon}</div>
      {expanded && (
        <span className="ml-3 whitespace-nowrap text-left text-sm">{text}</span>
      )}
    </button>
  );
}
