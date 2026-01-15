import { ReactNode } from "react";

interface MenuProps {
  children: ReactNode;
  className?: string;
}

export function Menu({ children, className = "" }: MenuProps) {
  return (
    <nav className={`flex items-center gap-2 ${className}`}>{children}</nav>
  );
}
