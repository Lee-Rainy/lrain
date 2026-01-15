"use client";
import { ReactNode, useState, useRef } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

export function Dropdown({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // Small delay to improve UX and prevent accidental closing
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className="
          px-4 py-2 rounded-md text-sm
          text-[var(--menu-text)]
          hover:text-[var(--menu-hover-text)]
          hover:bg-[var(--menu-hover-bg)]
          transition-colors
        "
      >
        {trigger}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="
            absolute left-0 top-full pt-2 min-w-[160px] z-50
          "
        >
          <div
            className="
              rounded-xl p-1
              bg-[var(--dropdown-bg)]
              border border-[var(--dropdown-border)]
              shadow-[var(--dropdown-shadow)]
              backdrop-blur-[16px]
            "
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
