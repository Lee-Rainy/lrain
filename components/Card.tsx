import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({ children, className = "", hoverEffect = true }: CardProps) {
  return (
    <div 
      className={`scribble-card ${hoverEffect ? '' : '!transform-none !shadow-none'} ${className}`}
    >
      {children}
    </div>
  );
}
