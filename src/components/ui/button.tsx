import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variantStyles = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 py-2 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
