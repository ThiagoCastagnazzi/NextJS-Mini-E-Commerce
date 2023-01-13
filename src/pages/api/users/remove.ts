import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.user.delete({
    where: {
      id: req.body.id,
    },
  });

  return res.status(200).json(data);
}
