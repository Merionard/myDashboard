"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Header } from "./layout/header";
import SideNav from "./layout/sidenav";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col sm:flex-row ">
          <SideNav />
          <main className="w-full mx-auto bg-primary-foreground">
            {children}
          </main>
        </div>
        <footer className="bg-gray-100">Footer</footer>
      </div>
    </NextThemesProvider>
  );
}
