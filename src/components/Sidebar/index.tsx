"use client";
import {
  Home,
  HardDrive,
  Package,
  Clock,
  RefreshCw,
  FileCheck,
  BookOpen,
  Cpu,
  Target,
  CalendarCheck,
  Settings,
  ChevronDown,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/providers/theme";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [openGroups, setOpenGroups] = useState({
    equipment: true,
    process: true,
  });
  const router = useRouter();
  const pathname = usePathname();

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  // Определяем активную ссылку по текущему пути
  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`
      hidden md:flex flex-col h-full
      bg-white dark:bg-gray-900
      border-r border-gray-100 dark:border-gray-800
      transition-all duration-300 ease-in-out
      ${expanded ? "w-72" : "w-20"}
    `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">N</span>
          </div>
        </button>

        {expanded && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {/* Главная */}
        <SidebarLink
          icon={<Home className="w-5 h-5" />}
          text="Главная"
          active={isActive("/")}
          onClick={() => router.push("/")}
          expanded={expanded}
        />

        {/* Группа Аппаратура */}
        <div className="mt-4">
          {expanded ? (
            <button
              onClick={() => toggleGroup("equipment")}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <motion.div
                animate={{ rotate: openGroups.equipment ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 mr-2" />
              </motion.div>
              <span>Аппаратура</span>
            </button>
          ) : (
            <div
              className="w-8 h-8 mx-auto flex items-center justify-center text-gray-500 dark:text-gray-400"
              onClick={() => router.push("/equipment/installed")}
            >
              <HardDrive className="w-5 h-5" />
            </div>
          )}

          <AnimatePresence>
            {expanded && openGroups.equipment && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 overflow-hidden"
              >
                <SidebarLink
                  icon={<HardDrive className="w-5 h-5" />}
                  text="Установленная"
                  active={isActive("/equipment/installed")}
                  onClick={() => router.push("/equipment/installed")}
                  expanded={expanded}
                  subItem
                />
                <SidebarLink
                  icon={<Package className="w-5 h-5" />}
                  text="Не установленная"
                  active={isActive("/equipment/uninstalled")}
                  onClick={() => router.push("/equipment/uninstalled")}
                  expanded={expanded}
                  subItem
                />
                <SidebarLink
                  icon={<Clock className="w-5 h-5" />}
                  text="Перестоявшая"
                  active={isActive("/equipment/overdue")}
                  onClick={() => router.push("/equipment/overdue")}
                  expanded={expanded}
                  subItem
                />
                <SidebarLink
                  icon={<RefreshCw className="w-5 h-5" />}
                  text="Заменить"
                  active={isActive("/equipment/replace")}
                  onClick={() => router.push("/equipment/replace")}
                  expanded={expanded}
                  subItem
                />
                <SidebarLink
                  icon={<FileCheck className="w-5 h-5" />}
                  text="Акты замены"
                  active={isActive("/equipment/replacement-acts")}
                  onClick={() => router.push("/equipment/replacement-acts")}
                  expanded={expanded}
                  subItem
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Группа Техпроцесс */}
        <div className="mt-2">
          {expanded ? (
            <button
              onClick={() => toggleGroup("process")}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <motion.div
                animate={{ rotate: openGroups.process ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 mr-2" />
              </motion.div>
              <span>Техпроцесс</span>
            </button>
          ) : (
            <div
              className="w-8 h-8 mx-auto flex items-center justify-center text-gray-500 dark:text-gray-400"
              onClick={() => router.push("/tech-process/paragraphs")}
            >
              <Cpu className="w-5 h-5" />
            </div>
          )}

          <AnimatePresence>
            {expanded && openGroups.process && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1 overflow-hidden"
              >
                <SidebarLink
                  icon={<BookOpen className="w-5 h-5" />}
                  text="Параграфы"
                  active={isActive("/tech-process/paragraphs")}
                  onClick={() => router.push("/tech-process/paragraphs")}
                  expanded={expanded}
                  subItem
                />
                <SidebarLink
                  icon={<Cpu className="w-5 h-5" />}
                  text="Устройства"
                  active={isActive("/tech-process/devices")}
                  onClick={() => router.push("/tech-process/devices")}
                  expanded={expanded}
                  subItem
                />
                <SidebarLink
                  icon={<Target className="w-5 h-5" />}
                  text="Назначения"
                  active={isActive("/tech-process/assignments")}
                  onClick={() => router.push("/tech-process/assignments")}
                  expanded={expanded}
                  subItem
                />
                <SidebarLink
                  icon={<CalendarCheck className="w-5 h-5" />}
                  text="Дата выполнения"
                  active={isActive("/tech-process/last-execution")}
                  onClick={() => router.push("/tech-process/last-execution")}
                  expanded={expanded}
                  subItem
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Настройки */}
        <div className="mt-4">
          <SidebarLink
            icon={<Settings className="w-5 h-5" />}
            text="Настройки"
            active={isActive("/settings")}
            onClick={() => router.push("/settings")}
            expanded={expanded}
          />
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-white" />
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

interface SidebarLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  expanded: boolean;
  subItem?: boolean;
  onClick: () => void;
}

function SidebarLink({
  icon,
  text,
  active,
  expanded,
  subItem,
  onClick,
}: SidebarLinkProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: expanded ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center w-full rounded-lg transition-all duration-200
        ${subItem ? "pl-9" : "px-3"}
        ${expanded ? "py-2.5" : "py-3 justify-center"}
        ${
          active
            ? "bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 dark:from-indigo-500/20 dark:to-indigo-600/20 text-indigo-600 dark:text-indigo-300 shadow-sm"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
        }
      `}
    >
      <div
        className={`flex items-center justify-center ${
          expanded ? "w-6 h-6" : "w-5 h-5"
        }`}
      >
        {icon}
      </div>

      {expanded && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-3 whitespace-nowrap text-left text-sm font-medium"
        >
          {text}
        </motion.span>
      )}
    </motion.button>
  );
}
