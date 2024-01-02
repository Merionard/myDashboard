import { ChangeEvent } from "react";

function YearSelector(props: {
  year: number;
  changeYear: (e: ChangeEvent<HTMLSelectElement>) => void;
  className: string;
}) {
  const years = [];

  // Ajouter les 10 années précédentes et les 10 années suivantes à la liste des années
  for (let i = -10; i <= 10; i++) {
    years.push(props.year + i);
  }
  return (
    <select
      onChange={(e) => props.changeYear(e)}
      value={props.year}
      {...props}
      style={{ width: "130px" }}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export default YearSelector;
