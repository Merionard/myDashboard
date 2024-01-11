export default function Total(props: {
  totalHT: number;
  totalTTC: number;
  totalVAT: number;
}) {
  return (
    <div className="w-1/5">
      <div className="flex justify-between ">
        <p>TOTAL HT</p>
        <p>{props.totalHT.toFixed(2)} €</p>
      </div>
      <div className="flex justify-between">
        <p>TVA</p>
        <p>{props.totalVAT.toFixed(2)} €</p>
      </div>
      <div className="flex justify-between bg-indigo-400 ">
        <p className="font-bold">TOTAL TTC</p>
        <p className="font-bold">{props.totalTTC.toFixed(2)} €</p>
      </div>
    </div>
  );
}
