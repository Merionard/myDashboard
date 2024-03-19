import { prisma } from "@/prisma/client";
import { InvoiceForm } from "./invoiceForm";
import { Prisma } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export type CustomerWithAddressAndContact = Prisma.CustomerGetPayload<{
  include: { contact: true; address: true };
}>;

export default async function NewInvoice() {
  const session = await getAuthSession();

  if (session == null || !session.user.id) {
    return redirect("/");
  }
  const customers = await prisma.customer.findMany({
    where: { userId: session.user.id },
    include: { contact: true, address: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent>
          <InvoiceForm customers={customers} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
}
