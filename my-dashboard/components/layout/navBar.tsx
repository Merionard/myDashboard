import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Typography } from "../ui/Typography";

export const Navbar = () => {
  const [showList, setShowList] = useState(false);
  console.log(showList);
  return (
    <nav className="w-2/12">
      <div className="flex flex-col gap-2 justify-start  p-4 h-full ">
        <Typography
          variant={"link"}
          onClick={() => setShowList((prev) => !prev)}
        >
          <div className="relative flex w-full cursor-pointer items-center justify-between py-1 pl-2 text-left">
            Clients{" "}
            <div className="transition ease-in-out delay-150 hover:rotate-90">
              <ChevronRight />
            </div>
          </div>
        </Typography>

        {showList && (
          <ul
            className={`px-0.5 last-of-type:mb-0 mr-6 border-l border-gray-200 pl-3 dark:border-gray-300 ml-5 transform ${
              showList ? "translate-y-6" : ""
            } transition duration-300`}
          >
            <li className="mb-2">
              <Link href={"/customers"} className="focus:text-blue-700">
                Liste client
              </Link>
            </li>
            <li className="border-transparent hover:border-blue-500 focus:border-blue-500">
              <Link href={"/customers/new"} className="focus:text-blue-700">
                Nouveau client
              </Link>
            </li>
          </ul>
        )}
        <Typography variant={"link"}>
          <Link href={"/cra"} className="focus:text-blue-700">
            CRA
          </Link>
        </Typography>
      </div>
    </nav>
  );
};
