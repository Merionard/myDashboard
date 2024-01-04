"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { client } from "@/src/fetchClient";
import { Customer, User } from "@prisma/client";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import CustomerComboBox from "./customerComboBox";
import { DateHeader } from "./dateHeader";
import CraTableRow from "./craTableRow";
import { getFirstLetterDayName } from "@/lib/utils";

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

  const onChangeMonth = (newMonth: number) => {
    setMonth(newMonth);
  };

  if (isLoading) {
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

  const currentDate = new Date(year, month + 1, 0);
  const daysInMonth = currentDate.getDate();

  const datesOfCurrentMonth: Array<Date> = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    datesOfCurrentMonth.push(date);
  }

  const columnDayNumber = [];
  const columnsDayName = [];
  for (let i = 1; i <= daysInMonth; i++) {
    columnsDayName.push(
      <TableHead key={i} className="border">
        {getFirstLetterDayName(new Date(year, month, i))}
      </TableHead>
    );
    columnDayNumber.push(
      <TableHead className="border" key={i}>
        {i}
      </TableHead>
    );
  }
  columnsDayName.unshift(<TableHead key={0} className="border"></TableHead>);
  columnDayNumber.unshift(<TableHead key={0} className="border"></TableHead>);

  return (
    <div className="flex flex-col gap-4">
      <DateHeader
        changeMonth={onChangeMonth}
        setYear={setYear}
        month={month}
        year={year}
      />
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
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
