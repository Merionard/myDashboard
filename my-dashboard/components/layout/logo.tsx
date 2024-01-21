import { Building } from "lucide-react";

export default function Logo() {
  return (
    <div className={` flex flex-row items-center  leading-none text-white`}>
      <Building className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[40px]">Mon A.E</p>
    </div>
  );
}
