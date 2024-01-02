import { prisma } from "@/prisma/client";
import { customerSchema } from "../../new/customerSchemaAndTypes";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerForm } from "../../new/customerForm";

export default async function Page({
  params,
}: {
  params: { customerId: string };
}) {
  const customer = await prisma.customer.findUnique({
    where: { id: Number(params.customerId) },
    include: {
      address: true,
      contact: true,
    },
  });

  const zodCustomer = customerSchema.parse(customer);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent>
          <CustomerForm customer={zodCustomer} />
        </CardContent>
      </Card>
    </div>
  );
}
