import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const data = req.body;

  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
    },
  });

  return res.status(200).json({ message: "User updated" });
}
