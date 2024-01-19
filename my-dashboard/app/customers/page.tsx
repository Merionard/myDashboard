import { prisma } from "@/prisma/client";
import { DataTable } from "../../components/dataTable";
import { columns } from "./columnsDatatable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function CustomersList() {
  const customers = await prisma.customer.findMany();

  return (
    <div className="container mx-auto mt-5">
      <Card>
        <CardHeader>
          <Link href="/customers/new" className="flex justify-end">
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
