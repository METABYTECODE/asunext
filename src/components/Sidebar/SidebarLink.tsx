import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  icon: LucideIcon;
  text: string;
  active?: boolean;
  expanded: boolean;
  subItem?: boolean;
  onClick: () => void;
}

export default function SidebarLink({
  icon: Icon,
  text,
  active = false,
  expanded,
  subItem = false,
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
        <Icon
          className={`w-5 h-5 ${
            active ? "text-indigo-600 dark:text-indigo-400" : "text-current"
          }`}
        />
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
