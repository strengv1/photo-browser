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
  const baseClasses = "border border-black rounded-md cursor-pointer px-2 disabled:text-gray-700 disabled:bg-gray-100 disabled:border-gray-700";

  return (
    <button
      {...props}
      className={clsx(baseClasses, className)}
    >
      {children}
    </button>
  );
}
