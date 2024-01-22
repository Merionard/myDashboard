import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro } from "lucide-react";
import ProgressBar from "./testProgress";
import { prisma } from "@/prisma/client";
import { getRequiredAuthSession } from "@/lib/auth";

export default async function HomePage() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear() + 1, 0, 0);
  const session = await getRequiredAuthSession();

  const currentCA = await prisma.invoice.aggregate({
    where: {
      statut: "PAYED",
      validateAt: { gte: startOfYear, lt: endOfYear },
    },
    _sum: {
      totalTTC: true,
    },
  });

  const currentWorkPeriod = await prisma.workPeriod.findFirst({
    where: {
      userId: session.user.id,
      year: today.getFullYear(),
      month: today.getMonth(),
    },
    include: { lines: { include: { workDays: true } } },
  });

  const nbDaysWorkedOnCurrentMonth =
    currentWorkPeriod?.lines
      .map((l) => l.workDays)
      .flatMap((w) => w)
      .map((w) => w.duration)
      .reduce((nbday1, nbday2) => nbday1 + nbday2, 0) ?? 0;

  return (
    <div className="container mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Dashobard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 md:flex-row">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="tracking-tight text-sm font-medium">
                    Chiffre affaire en cours
                  </h3>
                  <Euro className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {currentCA._sum.totalTTC != null
                    ? currentCA._sum.totalTTC.toFixed(2)
                    : "0.00"}
                  €
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="tracking-tight text-sm font-medium">
                    Nombre de jours travaillé ce mois
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-center">
                  {nbDaysWorkedOnCurrentMonth}
                </p>
              </CardContent>
            </Card>

            <ProgressBar max={72500} atteint={currentCA._sum.totalTTC ?? 0} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
