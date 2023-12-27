import { prisma } from "@/prisma/client";
import { DeleteConfirm } from "./deleteConfirm";

export default async function DeleteCustomers({
  params,
}: {
  params: { customerId: string };
}) {
  const customer = await prisma.customer.delete({
    where: { id: Number(params.customerId) },
  });

  return <DeleteConfirm businessName={customer.businessName} />;
}
