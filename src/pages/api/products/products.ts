import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

import nc from "next-connect";
import upload from "../../../utils/upload";

interface ExtendedNextApiRequest extends NextApiRequest {
  file: {
    location: string;
  };
}

const handler = nc()
  .use(upload.single("image"))
  .post(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const { name, description, price, category } = req.body;

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        image: req.file.location,
        category,
      },
    });

    return res.status(200).json({ message: "Product created" });
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    throw new Error("Not implemented");
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
