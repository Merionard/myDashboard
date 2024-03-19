import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { isDateEqual } from "@/lib/utils";
import { client } from "@/src/fetchClient";
import { Customer, WorkPeriodLine } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import {
  createWorkDay,
  deleteLine,
  deleteWorkDay,
  updateWorkDay,
} from "./craAction";
import CustomerComboBox from "./customerComboBox";

type Props = {
  workLine: {
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
  };
  customers: Customer[];
  datesOfCurrentMonth: Array<Date>;
  year: number;
  month: number;
  holidays: Date[];
};

export default function CraTableRow({
  customers,
  datesOfCurrentMonth,
  workLine,
  year,
  month,
  holidays,
}: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState(() =>
    initSelectedCustomer()
  );

  function initSelectedCustomer() {
    const customer = customers.find((c) => c.id === workLine.customerId);
    return customer ? customer : customers.length > 0 ? customers[0] : null;
  }

  const isWeekEnd = (date: Date) => {
    return (
      date.getDay() === 6 ||
      date.getDay() === 0 ||
      holidays.some((h) => isDateEqual(h, date))
    );
  };

  const isDayWorked = (
    date: Date,
    workDays: {
      id: number;
      date: Date;
      workPeriodLineId: number;
    }[]
  ) => {
    return workDays.some(
      (w) =>
        w.date.getDate() === date.getDate() &&
        w.date.getMonth() === date.getMonth() &&
        w.date.getFullYear() === date.getFullYear()
    );
  };

  const queryClient = useQueryClient();
  const workPeriodLineMutation = useMutation({
    mutationFn: (workPeriodLine: WorkPeriodLine) =>
      client(
        "/api/workPeriodLine",
        "POST",
        workPeriodLine,
        {} as Omit<WorkPeriodLine, "">
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["workPeriod", year, month]);
    },
  });

  const updateSelectedCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    const lineToUpdate = {
      ...workLine,
      customerId: customer.id,
      workDays: undefined,
    };
    workPeriodLineMutation.mutate(lineToUpdate);
  };

  const handleSelectDuration = async (
    date: Date,
    workPeriodLineId: number,
    duration: string
  ) => {
    if (!isDayWorked(date, workLine.workDays) && Number(duration) > 0) {
      const workDay = await createWorkDay(
        date,
        workPeriodLineId,
        Number(duration)
      );
      if (workDay) {
        toast.success("Jour travaillé ajouté avec succès");
        queryClient.invalidateQueries(["workPeriod", year, month]);
      } else {
        toast.error("une erreur est survenue");
      }
    }

    if (isDayWorked(date, workLine.workDays)) {
      if (Number(duration) === 0) {
        const workDayToDelete = workLine.workDays.find((w) =>
          isDateEqual(w.date, date)
        );
        if (workDayToDelete) {
          // @ts-ignore
          const workDay = await deleteWorkDay(workDayToDelete);
          if (workDay) {
            toast.success("Suppression effectuée avec succès!");
            queryClient.invalidateQueries(["workPeriod", year, month]);
          } else {
            toast.error("une erreur est survenue");
          }
        }
      } else {
        const workDayToUpdate = workLine.workDays.find((w) =>
          isDateEqual(w.date, date)
        );
        if (workDayToUpdate) {
          const updatedWorkDay = await updateWorkDay(
            // @ts-ignore
            workDayToUpdate,
            Number(duration)
          );
          if (updatedWorkDay) {
            toast.success("Maj effectuée avec succès!");
            queryClient.invalidateQueries(["workPeriod", year, month]);
          } else {
            toast.error("une erreur est survenue");
          }
        }
      }
    } else {
    }
  };

  const getWorkDayDuration = (date: Date) => {
    const workDay = workLine.workDays.find((w) => isDateEqual(date, w.date));
    return workDay?.duration.toString() ?? "0";
  };

  const getTotalDuration = () => {
    return workLine.workDays
      .map((w) => w.duration)
      .reduce((a, b) => a + Number(b), 0);
  };

  const HandleClickDeleteLine = async () => {
    const deletedLine = await deleteLine(workLine.id);
    if (deletedLine) {
      toast.success("ligne supprimée avec succès!");
      queryClient.invalidateQueries(["workPeriod", year, month]);
    } else {
      toast.error("une erreur est survenue");
    }
  };

  return (
    <TableRow key={workLine.id}>
      <TableCell className="border p-3 min-w-[300px] h-12">
        <div className="flex flex-col gap-2">
          <CustomerComboBox
            customers={customers}
            customer={selectedCustomer}
            onSelectCustomer={updateSelectedCustomer}
          />
          <div className="flex justify-between items-baseline">
            <div className="flex gap-2 items-center">
              <Typography variant={"muted"}>Nb jour travaillés:</Typography>
              <span className="font-bold">{getTotalDuration()}</span>
            </div>
            <Button
              variant={"destructive"}
              onClick={HandleClickDeleteLine}
              size={"sm"}
            >
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
      </TableCell>
      {datesOfCurrentMonth.map((date) => (
        <TableCell
          key={date.toDateString()}
          className={clsx("border p-1", {
            "bg-gray-500": isWeekEnd(date),
            "cursor-pointer": !isWeekEnd(date),
            "bg-blue-500": Number(getWorkDayDuration(date)) > 0,
          })}
        >
          {!isWeekEnd(date) && (
            <Select
              onValueChange={(duration) =>
                handleSelectDuration(date, workLine.id, duration)
              }
              value={getWorkDayDuration(date)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Durée</SelectLabel>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="0.5">0.5</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
