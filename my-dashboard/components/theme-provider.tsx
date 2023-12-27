"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Navbar } from "./layout/navBar";
import { Card, CardContent } from "./ui/card";
import { Header } from "./layout/header";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col sm:flex-row">
          <Navbar />
          <main className="w-7/12 mx-auto">{children}</main>
        </div>
        <footer className="bg-gray-100">Footer</footer>
      </div>
    </NextThemesProvider>
  );
}
