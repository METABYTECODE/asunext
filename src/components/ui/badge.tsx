import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "green"
    | "orange"
    | "red";
}

export function Badge({
  children,
  className = "",
  variant = "default",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variantStyles = {
    default:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    outline: "border border-gray-200 dark:border-gray-700",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    orange:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
