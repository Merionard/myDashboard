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
      <div className="grid grid-cols-6 gap-2 bg-background">
        <Header />
        <Navbar />

        <div className="col-start-2 col-span-5  p-4 ">{children}</div>
        <footer className="col-span-6">test</footer>
      </div>
    </NextThemesProvider>
  );
}
