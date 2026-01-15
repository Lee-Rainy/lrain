import { ReactNode } from "react";
import Link from "next/link";

interface MenuItemProps {
  children: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export function MenuItem({
  children,
  href,
  active = false,
  onClick,
}: MenuItemProps) {
  const className = `relative px-4 py-2 rounded-md text-sm transition-colors ${
    active
      ? "text-[var(--menu-active-text)]"
      : "text-[var(--menu-text)] hover:text-[var(--menu-hover-text)] hover:bg-[var(--menu-hover-bg)]"
  }`;

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={className}
      >
        {children}
        {active && (
          <span
            className="
            absolute left-4 right-4 bottom-1
            h-0.5 rounded
            bg-[var(--menu-indicator)]
          "
          />
        )}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
      {/* Active indicator logic for button if needed, usually links have active state */}
      {active && (
        <span
          className="
            absolute left-4 right-4 bottom-1
            h-0.5 rounded
            bg-[var(--menu-indicator)]
          "
        />
      )}
    </button>
  );
}
