import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  month: number;
  year: number;
  changeMonth: (month: number) => void;
  setYear: (year: number) => void;
};

export const DateHeader = ({ month, year, changeMonth, setYear }: Props) => {
  const handleChangeMonth = (month: string) => {
    changeMonth(parseInt(month, 10));
  };

  const handleChangeYear = (selectedYear: string) => {
    setYear(parseInt(selectedYear, 10));
  };

  const handlePrev = () => {
    if (month === 0) {
      changeMonth(11);
      setYear(year - 1);
    } else {
      changeMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      changeMonth(0);
      setYear(year + 1);
    } else {
      changeMonth(month + 1);
    }
  };

  const years = [];

  // Ajouter les 10 années précédentes et les 10 années suivantes à la liste des années
  for (let i = -10; i <= 10; i++) {
    years.push(year + i);
  }

  return (
    <div className="flex  justify-center mb-3">
      <div className="flex items-center p-1 gap-2">
        <button onClick={handlePrev}>
          <ChevronLeft />
        </button>
        <Select value={month.toString()} onValueChange={handleChangeMonth}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Durée</SelectLabel>
              <SelectItem value={"0"}>Janvier</SelectItem>
              <SelectItem value={"1"}>Février</SelectItem>
              <SelectItem value={"2"}>Mars</SelectItem>
              <SelectItem value={"3"}>Avril</SelectItem>
              <SelectItem value={"4"}>Mai</SelectItem>
              <SelectItem value={"5"}>Juin</SelectItem>
              <SelectItem value={"6"}>Juillet</SelectItem>
              <SelectItem value={"7"}>Août</SelectItem>
              <SelectItem value={"8"}>Septembre</SelectItem>
              <SelectItem value={"9"}>Octobre</SelectItem>
              <SelectItem value={"10"}>Novembre</SelectItem>
              <SelectItem value={"11"}>Décembre</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handleChangeYear} value={year.toString()}>
          <SelectTrigger style={{ width: "130px" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
