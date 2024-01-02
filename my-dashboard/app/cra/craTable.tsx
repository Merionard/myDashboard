"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import { DateHeader } from "./dateHeader";
import clsx from "clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  users: User[];
};

export default function CraTable({ users }: Props) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);

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

  const handleClickOnCell = (date: Date) => {
    setShowModal(true);
    console.log(date);
  };

  const isWeekEnd = (date: Date) => {
    return date.getDay() === 6 || date.getDay() === 0;
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      <DateHeader
        changeMonth={setMonth}
        changeYear={setYear}
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
                {user.name}
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
