import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role,
    },
  });

  return res.status(200).json({ message: "User created" });
}
