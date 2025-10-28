import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = "border border-black rounded-md cursor-pointer px-2 disabled:cursor-auto disabled:text-gray-600 disabled:bg-gray-200 disabled:border-gray-600";

  return (
    <button
      {...props}
      className={clsx(baseClasses, className)}
    >
      {children}
    </button>
  );
}
