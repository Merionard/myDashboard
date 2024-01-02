import { prisma } from "@/prisma/client";
import { WorkPeriod } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const customer = await prisma.customer.findFirst();

  const { userId, month, year } = req.query;
  let workPeriod = await prisma.workPeriod.findFirst({
    where: {
      userId: String(userId),
      AND: {
        month: Number(month),
        AND: { year: Number(year) },
      },
    },
    include: {
      lines: true,
    },
  });
  if (!workPeriod) {
    workPeriod = await prisma.workPeriod.create({
      data: {
        userId: String(userId),
        month: Number(month),
        year: Number(year),
        lines: {
          create: {
            customerId: customer ? customer.id : 0,
            nbDaysWorked: 0,
          },
        },
      },
      include: {
        lines: true,
      },
    });
  }

  res.status(200).json({ workPeriod });
}
