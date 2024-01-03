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

type Props = {
  users: User[];
  userId: string;
  customers: Customer[];
};

export type WorkPeriod = {
  lines: {
    id: number;
    customerId: number;
    workPeriodId: number;
    nbDaysWorked: number;
  }[];
} & {
  id: number;
  month: number;
  year: number;
  userId: string;
};

export default function CraTable({ users, userId, customers }: Props) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);

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
  if (isError) {
    return "Une erreur est survenue";
  }

  const currentDate = new Date(year, month + 1, 0);
  const daysInMonth = currentDate.getDate();

  const datesOfCurrentMonth: Array<Date> = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    datesOfCurrentMonth.push(date);
  }

  const columns = [];
  for (let i = 1; i <= daysInMonth; i++) {
    columns.push(
      <TableHead className="border" key={i}>
        {i}
      </TableHead>
    );
  }
  columns.unshift(<th key={0}></th>);

  const handleClickOnCell = async (date: Date) => {
    setShowModal(true);
  };

  const isWeekEnd = (date: Date) => {
    return date.getDay() === 6 || date.getDay() === 0;
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      <DateHeader
        changeMonth={onChangeMonth}
        setYear={setYear}
        month={month}
        year={year}
      />
      <Table>
        <TableHeader>
          <TableRow>{columns}</TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="border p-2 min-w-[200px] h-12">
                <CustomerComboBox customers={customers} />
              </TableCell>
              {datesOfCurrentMonth.map((date) => (
                <TableCell
                  key={date.toDateString()}
                  onClick={() => handleClickOnCell(date)}
                  className={clsx("border p-1", {
                    "bg-gray-500": isWeekEnd(date),
                    "cursor-pointer": !isWeekEnd(date),
                  })}
                >
                  {}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
