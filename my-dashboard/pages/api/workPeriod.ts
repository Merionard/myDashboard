import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const customer = await prisma.customer.findFirst();

    const { userId, month, year } = req.query;
    let workPeriod = await prisma.workPeriod.findFirst({
      where: {
        userId: String(userId),
        month: Number(month),
        year: Number(year),
      },
      include: {
        lines: {
          include: {
            workDays: true,
          },
        },
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
          lines: {
            include: {
              workDays: true,
            },
          },
        },
      });
    }
    res.status(200).json(JSON.stringify(workPeriod));
  }
}
