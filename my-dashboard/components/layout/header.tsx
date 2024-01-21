import { Authentication } from "../auth/authentication";
import { ModeToggle } from "../theme-toogle";

export const Header = () => {
  return (
    <header className="border-b flex justify-end gap-2 p-2">
      <Authentication />
      <ModeToggle />
    </header>
  );
};
