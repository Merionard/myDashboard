import { prisma } from "@/prisma/client";
import { WorkPeriodLine } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const workPeriodLine = req.body as WorkPeriodLine;
    const updatedWorkPeriodLine = await prisma.workPeriodLine.update({
      where: { id: workPeriodLine.id },
      data: { ...workPeriodLine },
    });
    res.status(200).json({ ...updatedWorkPeriodLine });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
