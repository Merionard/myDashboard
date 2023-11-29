"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Navbar } from "./layout/navBar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <Navbar />

      <div className="flex">
        <aside className="w-1/6 bg-background text-secondary-foreground p-4">
          {/* Your sidebar content goes here */}
          <ul>
            <li className="mb-2">
              <a href="#">Link 1</a>
            </li>
            <li className="mb-2">
              <a href="#">Link 2</a>
            </li>
            <li className="mb-2">
              <a href="#">Link 3</a>
            </li>
          </ul>
        </aside>

        <main className="max-w-5xl w-full mx-auto p-4">
          <Card>
            <CardHeader>test</CardHeader>
          </Card>
        </main>
        {children}
      </div>
    </NextThemesProvider>
  );
}
