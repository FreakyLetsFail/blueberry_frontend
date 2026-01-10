export function Footer() {
  return (
    <footer className="w-full snap-start border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">
            All systems operational
          </span>
        </div>
        
        <div className="text-sm font-semibold">
          Blueberry
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 Blueberry. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
