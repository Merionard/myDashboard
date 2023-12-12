import Image from "next/image";
import { useState } from "react";
import { ModeToggle } from "../theme-toogle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="row-start-1 row-span-3 h-screen border-r">
      <div className="flex flex-col gap-2 justify-start p-4 h-full">
        <img
          src="https://img.freepik.com/premium-vector/statistics-icon-simple-element-illustration-statistics-concept-symbol-design-from-analytics-research-collection-can-be-used-web-mobile_159242-12227.jpg?size=626&ext=jpg&ga=GA1.1.378605246.1701363860&semt=ais"
          alt=""
          className="w-20"
        />
        <Link href={"/customers"}>Clients</Link>
        <span>Dashboard</span>
        <span>Planificateur</span>
        <span>Planificateur</span>
      </div>
    </nav>
  );
};
