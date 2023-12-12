import { Button } from "../ui/button";
import { ModeToggle } from "../theme-toogle";
import { LogInBtn } from "../auth/logInBtn";

export const Header = () => {
  return (
    <header className=" col-start-2 col-span-5">
      <div className="flex items-center gap-2 justify-end p-4">
        <LogInBtn />
        <ModeToggle />
      </div>
    </header>
  );
};
