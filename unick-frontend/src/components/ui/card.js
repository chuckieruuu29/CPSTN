// src/components/ui/card.js
import React from "react";

/**
 * Card wrapper with rounded corners, border, and shadow
 */
export function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-xl border bg-white shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Card content area with padding
 */
export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

/**
 * Optional: Card header (use for titles)
 */
export function CardHeader({ className = "", children }) {
  return (
    <div className={`p-4 border-b font-semibold text-lg ${className}`}>
      {children}
    </div>
  );
}

/**
 * Optional: Card footer (use for buttons or actions)
 */
export function CardFooter({ className = "", children }) {
  return (
    <div className={`p-4 border-t bg-gray-50 ${className}`}>
      {children}
    </div>
  );
}
