import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro } from "lucide-react";
import ProgressBar from "./testProgress";

export default function HomePage() {
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
              <CardContent>teteteetetetetetetetetete</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="tracking-tight text-sm font-medium">
                    Nombre de jours travaillé
                  </h3>
                  <Euro className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>teteteetetetetetetetetete</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="tracking-tight text-sm font-medium">
                    Nombre de jours travaillé
                  </h3>
                  <Euro className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>teteteetetetetetetetetete</CardContent>
            </Card>
            <ProgressBar max={72500} atteint={56000} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
