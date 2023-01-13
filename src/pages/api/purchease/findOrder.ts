import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const id = session?.user?.id;

  const data = await prisma.purchease.findMany({
    where: {
      userId: Number(id),
    },
  });

  return res.status(200).json(data);
}
