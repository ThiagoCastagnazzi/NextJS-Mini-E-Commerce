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
  .put(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const { name, description, price, category } = req.body;
    const { id } = req.query;

    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        price,
        image: req.file.location,
        category,
      },
    });
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
