"use client";
import { Breadcrumbs } from "@heroui/react";

// Shared top bar to keep height/spacing consistent across pages
export function PageTopBar({ left, breadcrumbs, children, className = "" }) {
  return (
    <header
      className={`h-14 min-h-[56px] border-b border-zinc-900 flex items-center px-4 gap-4 bg-zinc-950/70 backdrop-blur-sm sticky top-0 z-50 ${className}`}
    >
      {left}
      <div className="h-4 w-[1px] bg-zinc-800" />
      {breadcrumbs ? (
        <Breadcrumbs
          variant="light"
          classNames={{ list: "gap-2" }}
          itemClasses={{
            item: "text-zinc-500 data-[current=true]:text-white text-sm transition-colors",
            separator: "text-zinc-700",
          }}
        >
          {breadcrumbs}
        </Breadcrumbs>
      ) : null}
      {children}
    </header>
  );
}
