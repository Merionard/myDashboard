"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFirstLetterDayName, isDateEqual } from "@/lib/utils";
import { client } from "@/src/fetchClient";
import { Customer, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { addLine } from "./craAction";
import CraTableRow from "./craTableRow";
import { DateHeader } from "./dateHeader";

type Props = {
  users: User[];
  userId: string;
  customers: Customer[];
};

export type WorkPeriod = {
  lines: ({
    workDays: {
      id: number;
      date: Date;
      workPeriodLineId: number;
      duration: Decimal;
    }[];
  } & {
    id: number;
    customerId: number;
    workPeriodId: number;
    nbDaysWorked: number;
  })[];
} & {
  id: number;
  month: number;
  year: number;
  userId: string;
};

export const fetchHolidays = async (year: number) => {
  const url = `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("error when calling api-gouv for holidays!");
  }
  const json = await response.json();
  const arrayHolidays: Array<Date> = [];
  for (const [key, _] of Object.entries(json)) {
    arrayHolidays.push(new Date(key));
  }
  return arrayHolidays;
};

export default function CraTable({ users, userId, customers }: Props) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const {
    data: workPeriod,
    isError,
    isLoading,
  } = useQuery(["workPeriod", year, month], () =>
    client(
      `/api/workPeriod?userId=${userId}&month=${month}&year=${year}`,
      "GET",
      undefined,
      {} as WorkPeriod
    )
  );
  const {
    data: holidays,
    isError: isErrorOnHolidays,
    isLoading: isLoadingHolidays,
  } = useQuery(["holidays", year, month], () => fetchHolidays(year));
  console.log(holidays);
  const queryClient = useQueryClient();

  const onChangeMonth = (newMonth: number) => {
    setMonth(newMonth);
  };

  if (isLoading || isLoadingHolidays) {
    return (
      <>
        <DateHeader
          changeMonth={onChangeMonth}
          setYear={setYear}
          month={month}
          year={year}
        />
        <Loader2 className="animate-spin mx-auto" />
      </>
    );
  }

  if (isError || !workPeriod) {
    return "Une erreur est survenue";
  }
  if (isErrorOnHolidays || !holidays) {
    return "Une erreur est survenue lors de la récupération des jours fériés";
  }

  const currentDate = new Date(year, month + 1, 0);
  const daysInMonth = currentDate.getDate();
  let nbBusinessDays = 0;

  const datesOfCurrentMonth: Array<Date> = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    if (
      date.getDay() !== 6 &&
      date.getDay() !== 0 &&
      !holidays?.some((h) => isDateEqual(h, date))
    ) {
      nbBusinessDays++;
    }
    datesOfCurrentMonth.push(date);
  }

  const columnDayNumber = [];
  const columnsDayName = [];
  for (let i = 1; i <= daysInMonth; i++) {
    columnsDayName.push(
      <TableHead
        key={i}
        className="border text-center"
        style={{ minWidth: "60px" }}
      >
        {getFirstLetterDayName(new Date(year, month, i))}
      </TableHead>
    );
    columnDayNumber.push(
      <TableHead className="border text-center" key={i}>
        {i}
      </TableHead>
    );
  }
  columnsDayName.unshift(
    <TableHead key={0} className="border">
      TOTAL JOURS OUVRABLES: {nbBusinessDays}
    </TableHead>
  );
  columnDayNumber.unshift(<TableHead key={0} className="border"></TableHead>);

  const handleClickAddLine = async () => {
    await addLine(workPeriod.id, customers[0].id);
    queryClient.invalidateQueries(["workPeriod", year, month]);
  };

  return (
    <div className="flex flex-col gap-4">
      <DateHeader
        changeMonth={onChangeMonth}
        setYear={setYear}
        month={month}
        year={year}
      />
      <div className="flex justify-start">
        <Button
          className="flex justify-start gap-2"
          variant={"outline"}
          onClick={() => handleClickAddLine()}
        >
          <PlusCircle /> Ajouter une ligne
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>{columnsDayName}</TableRow>
          <TableRow>{columnDayNumber}</TableRow>
        </TableHeader>
        <TableBody>
          {workPeriod.lines.map((workLine) => (
            <CraTableRow
              key={workLine.id}
              customers={customers}
              datesOfCurrentMonth={datesOfCurrentMonth}
              workLine={workLine}
              month={month}
              year={year}
              holidays={holidays}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
