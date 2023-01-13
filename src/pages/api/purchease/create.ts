import { prisma } from "../../../lib/prisma";

import { getSession } from "next-auth/react";

const stripe = require("stripe")(process.env.MY_STRIPE_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userSession = await getSession({ req });

    const items = req.body.cart;

    const totalPrice = req.body.totalPrice;

    const userId = Number(userSession?.user?.id);
    const productsId = items.map((item) => item.id);
    const productsAmount = items.map((item) => item.amount);

    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.amount,
    }));

    try {
      // Create Checkout Sessions from body params.

      const order = await prisma.purchease.create({
        data: {
          userId,
          totalPrice: `${totalPrice}`,
        },
      });

      console.log(order);

      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        mode: "payment",
        success_url: `${req.headers.origin}/`,
        cancel_url: `${req.headers.origin}/cart`,
      });

      res.json({ sessionURL: session.url });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
