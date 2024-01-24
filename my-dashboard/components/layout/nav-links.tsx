"use client";

import clsx from "clsx";
import {
  CalendarDays,
  Home,
  ListTodo,
  Receipt,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/MyAE/home", icon: Home },
  {
    name: "Invoices",
    href: "/MyAE/invoice",
    icon: Receipt,
  },
  { name: "Customers", href: "/MyAE/customers", icon: UsersRound },
  {
    name: "CRA",
    href: "/MyAE/cra",
    icon: CalendarDays,
  },
  {
    name: "Todo",
    href: "/MyAE/todo",
    icon: ListTodo,
  },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-primary-foreground p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathName === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
