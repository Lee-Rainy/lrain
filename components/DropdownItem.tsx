import { ReactNode } from "react";
import Link from "next/link";

interface DropdownItemProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  prefix?: ReactNode;
}

export function DropdownItem({ children, href, onClick, prefix }: DropdownItemProps) {
  const className = `
    flex items-center gap-3
    px-3 py-2 rounded-lg text-sm w-full text-left
    text-[var(--dropdown-text)]
    hover:bg-[var(--dropdown-hover-bg)]
    hover:text-[var(--dropdown-hover-text)]
    transition-colors
  `;

  const content = (
    <>
      {prefix && (
        <span className="flex-shrink-0 flex items-center justify-center opacity-70 w-5 text-center">
          {prefix}
        </span>
      )}
      <div className="flex-1">{children}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}
