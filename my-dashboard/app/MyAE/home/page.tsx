import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ui/testProgress";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/prisma/client";
import { AlertTriangle, Check, Euro } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TypeActiviteEnums } from "../myAccount/userSchema";
import CaInfo from "./caInfo";

export default async function HomePage() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear() + 1, 0, 0);
  const session = await getAuthSession();

  if (session == null) {
    return redirect("/");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

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

  const lateInvoices = await prisma.invoice.findMany({
    where: {
      dueDate: { lt: today },
      statut: "VALIDATED",
    },
  });

  const nbDaysWorkedOnCurrentMonth =
    currentWorkPeriod?.lines
      .map((l) => l.workDays)
      .flatMap((w) => w)
      .map((w) => w.duration)
      .reduce((nbday1, nbday2) => nbday1 + nbday2, 0) ?? 0;

  const maxCA = TypeActiviteEnums.find(
    (a) => a.type === user?.typeActivite
  )?.plafond;

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
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="tracking-tight text-sm font-medium">
                    Progression CA/plafond
                  </h3>
                  <CaInfo />
                </div>
              </CardHeader>
              <CardContent>
                {maxCA ? (
                  <ProgressBar
                    max={maxCA}
                    atteint={currentCA._sum.totalTTC ?? 0}
                  />
                ) : (
                  <Alert variant={"destructive"}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Plafond non défini!</AlertTitle>
                    <AlertDescription>
                      Pour avoir un plafond qui correspond à votre activité
                      veuillez saisir dans votre profil votre type
                      d&apos;activité
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="tracking-tight text-sm font-medium">
                    Factures en retard
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                {lateInvoices.length === 0 ? (
                  <p className="text-2xl font-bold flex justify-center items-center">
                    0 <Check color="green" />
                  </p>
                ) : (
                  <ul>
                    {lateInvoices.map((i) => (
                      <li key={i.id}>
                        <Link href={`/invoice/view/${i.id}`}>{i.number}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
