import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return res.status(200).json({ message: "Product deleted" });
}
