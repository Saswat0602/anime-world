import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  label?: string;
  className?: string;
  fullHeight?: boolean;
}

export function LoadingSpinner({
  size = "medium",
  variant = "primary",
  label = "Loading",
  className = "",
  fullHeight = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: {
      container: "h-10 w-10",
      border: "border-2",
      text: "text-[10px]",
    },
    medium: {
      container: "h-16 w-16",
      border: "border-4",
      text: "text-xs",
    },
    large: {
      container: "h-24 w-24",
      border: "border-4",
      text: "text-sm",
    },
  };

  const variantClasses = {
    primary: {
      border: "border-slate-200 dark:border-slate-700",
      spinner: "border-t-sky-500",
      text: "text-slate-500 dark:text-slate-400",
    },
    secondary: {
      border: "border-blue-300",
      spinner: "border-t-blue-600",
      text: "text-blue-800 dark:text-blue-200",
    },
  };

  return (
    <div className={`flex items-center justify-center ${fullHeight ? "min-h-[400px]" : "py-20"} ${className}`}>
      <div className={`relative ${sizeClasses[size].container}`}>
        <div className={`absolute inset-0 rounded-full ${sizeClasses[size].border} ${variantClasses[variant].border}`}></div>
        <div className={`absolute inset-0 rounded-full ${sizeClasses[size].border} border-transparent ${variantClasses[variant].spinner} animate-spin`}></div>
        {label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${sizeClasses[size].text} font-medium ${variantClasses[variant].text}`}>{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Predefined variants for backward compatibility
export function PrimaryLoadingSpinner(props: Omit<LoadingSpinnerProps, "variant">) {
  return <LoadingSpinner variant="primary" {...props} />;
}

export function SecondaryLoadingSpinner(props: Omit<LoadingSpinnerProps, "variant">) {
  return <LoadingSpinner variant="secondary" {...props} />;
}

export function AnimeDetailLoadingSpinner() {
  return <LoadingSpinner fullHeight={true} size="large" />;
}

export default LoadingSpinner; 