import { prisma } from "@/prisma/client";
import { columns } from "./columnsDatatable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/dataTable";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CustomersList() {
  const session = await getAuthSession();

  if (session == null) {
    return redirect("/");
  }
  const customers = await prisma.customer.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className="container mx-auto mt-5">
      <Card>
        <CardHeader>
          <Link href="/MyAE/customers/new" className="flex justify-end">
            <Button>
              <PlusCircle size={"sm"} className="mr-2" />
              Nouveau client
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={customers}
            filter="businessName"
            filterName="Nom"
          />
        </CardContent>
      </Card>
    </div>
  );
}
