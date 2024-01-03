import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  month: number;
  year: number;
  changeMonth: (month: number) => void;
  setYear: (year: number) => void;
};

export const DateHeader = ({ month, year, changeMonth, setYear }: Props) => {
  const handleChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeMonth(parseInt(event.target.value, 10));
  };

  const handleChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value, 10));
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
        <select
          className="form-select"
          style={{ width: "130px" }}
          value={month}
          onChange={handleChangeMonth}
        >
          <option value={0}>Janvier</option>
          <option value={1}>Février</option>
          <option value={2}>Mars</option>
          <option value={3}>Avril</option>
          <option value={4}>Mai</option>
          <option value={5}>Juin</option>
          <option value={6}>Juillet</option>
          <option value={7}>Août</option>
          <option value={8}>Septembre</option>
          <option value={9}>Octobre</option>
          <option value={10}>Novembre</option>
          <option value={11}>Décembre</option>
        </select>
        <select
          onChange={handleChangeYear}
          value={year}
          style={{ width: "130px" }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
