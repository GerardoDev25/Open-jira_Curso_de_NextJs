import { db } from '@/database';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  
   {
      message: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: `don't have acsset to thos resource` });
  }

  await db.conecct()
  await db.disconnect()

  
  res.status(200).json({ message: 'process made successfuly' });
}
