import { NextApiRequest, NextApiResponse } from "next";

type CustomRequest = NextApiRequest & {
  id: string;
};

export default function handler(req: CustomRequest, res: NextApiResponse) {
  res.status(200).json({ ok: "ok" });
}
