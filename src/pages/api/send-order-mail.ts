import type { NextApiRequest, NextApiResponse } from "next";
import { sendOrderMail } from "@/lib/server/mail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await sendOrderMail(req.body);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).end();
  }
}
