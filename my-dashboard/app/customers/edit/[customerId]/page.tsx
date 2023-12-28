import { prisma } from "@/prisma/client";

export default async function Page({
  params,
}: {
  params: { customerId: number };
}) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.customerId },
  });

  return <div>page</div>;
}
