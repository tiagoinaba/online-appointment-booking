import { NextApiRequest, NextApiResponse } from "next";

type CustomRequest = NextApiRequest & {
    id: string
}

export default function handler(req: CustomRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log(req.method);
        res.status(200).json({ ok: 'ok' });
    }
}