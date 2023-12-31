"use client";

import { User } from "@prisma/client";
import { useState } from "react";

type Props = {
  users: User[];
};
const currentDate = new Date();
const daysInMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
).getDate();
const datesOfCurrentMonth: Array<Date> = [];
for (let i = 1; i <= daysInMonth; i++) {
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
  datesOfCurrentMonth.push(date);
}

export default function CraTable({ users }: Props) {
  const [showModal, setShowModal] = useState(false);

  const columns = [];
  for (let i = 1; i <= daysInMonth; i++) {
    columns.push(
      <th className="border p-2" key={i}>
        {i}
      </th>
    );
  }
  columns.unshift(<th key={0}></th>);

  const handleClickOnCell = (date: Date) => {
    setShowModal(true);
    console.log(date);
  };

  const closeModal = () => setShowModal(false);
  return (
    <>
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr>{columns}</tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="even:bg-gray-50">
              <td className="border p-2">{user.name}</td>
              {datesOfCurrentMonth.map((date) => (
                <td
                  key={date.toDateString()}
                  onClick={() => handleClickOnCell(date)}
                  className="border p-2"
                >
                  {}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
