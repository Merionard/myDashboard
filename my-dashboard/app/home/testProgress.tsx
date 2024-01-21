import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useState, useEffect } from "react";

type Props = {
  atteint: number;
  max: number;
};
export const ProgressBar = ({ atteint, max }: Props) => {
  const pourcentage = Math.min((atteint / max) * 100, 100);

  return (
    <>
      <div className="w-56">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <div className=" rounded-md bg-primary-foreground border ">
                <div
                  className={
                    "h-7 bg-blue-500 flex flex-col justify-center items-center rounded-l-md"
                  }
                  style={{ width: `${pourcentage}%` }}
                >
                  <span className="">{pourcentage.toFixed(2)}%</span>
                </div>
              </div>
            </TooltipTrigger>

            <TooltipContent>
              <p>
                {atteint} / {max}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="inline pt-1">{max}€</span>
    </>
  );
};

export default ProgressBar;
