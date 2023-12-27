import Link from "next/link";
import { useState } from "react";
import { Typography } from "../ui/Typography";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Navbar = () => {
  const [showList, setShowList] = useState(false);
  console.log(showList);
  return (
    <nav className="sm:w-2/12">
      <div className="flex flex-col gap-2 justify-start items-center p-4 h-full ms-5">
        <img
          src="https://img.freepik.com/premium-vector/statistics-icon-simple-element-illustration-statistics-concept-symbol-design-from-analytics-research-collection-can-be-used-web-mobile_159242-12227.jpg?size=626&ext=jpg&ga=GA1.1.378605246.1701363860&semt=ais"
          alt=""
          className="w-20"
        />
        <Typography
          variant={"link"}
          onClick={() => setShowList((prev) => !prev)}
        >
          <div className="flex">
            Clients {showList ? <ChevronUp /> : <ChevronDown />}
          </div>
        </Typography>
        {showList && (
          <ul className="flex flex-col items-end  ">
            <div className="border-l flex flex-col text-end">
              <div>
                <Link href={"/customers"} className="focus:text-blue-700">
                  Liste client
                </Link>
              </div>

              <div>
                <Link href={"/customers/new"} className="focus:text-blue-700">
                  Nouveau client
                </Link>
              </div>
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
};
