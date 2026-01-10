"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark-white" themes={['light', 'dark', 'dark-white']}>
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
