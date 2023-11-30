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

        <div className="col-start-2 col-span-5  p-4 ">
          <div className="flex gap-1 flex-wrap">
            <Card className="flex-1">
              <CardContent>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veniam, doloribus illo aspernatur asperiores nemo aut
                consequuntur inventore? Eius odit, eaque asperiores corporis eos
                tempora minima voluptates impedit quis! Dignissimos, sunt? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
                esse beatae repellat ea alias sint perferendis! Nesciunt
                blanditiis eveniet ipsam officiis? Aliquam, rerum placeat! Quam
                provident necessitatibus magnam debitis dicta.
              </CardContent>
            </Card>
            {children}
          </div>
        </div>
        <footer className="col-span-6">test</footer>
      </div>
    </NextThemesProvider>
  );
}
