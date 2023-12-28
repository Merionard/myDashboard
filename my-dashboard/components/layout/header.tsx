import { LogInBtn } from "../auth/logInBtn";
import { ModeToggle } from "../theme-toogle";

export const Header = () => {
  return (
    <header className="border-b flex justify-end gap-2 p-2">
      <LogInBtn />
      <ModeToggle />
    </header>
  );
};
