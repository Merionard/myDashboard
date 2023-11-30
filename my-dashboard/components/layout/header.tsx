import { Button } from "../ui/button";
import { ModeToggle } from "../theme-toogle";

export const Header = () => {
  return (
    <header className=" col-start-2 col-span-5">
      <div className="flex items-center gap-2 justify-end p-4">
        <Button> Log in</Button>
        <ModeToggle />
      </div>
    </header>
  );
};
