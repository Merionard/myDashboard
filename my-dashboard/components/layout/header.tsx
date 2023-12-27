import { LogInBtn } from "../auth/logInBtn";
import { ModeToggle } from "../theme-toogle";

export const Header = () => {
  return (
    <header className="border-b flex justify-center">
      <div className="w-9/12 flex  justify-end items-center gap-2 p-4">
        <LogInBtn />
        <ModeToggle />
      </div>
    </header>
  );
};
