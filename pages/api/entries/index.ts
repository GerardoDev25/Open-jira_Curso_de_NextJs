import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { EntryModel, IEntry } from '@/models';

type Data = { message: string } | IEntry[];

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);

    default:
      return res.status(400).json({ message: 'endpoint not exist' });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.conecct();
  const entries = await EntryModel.find().sort({ createAt: 'ascending' });
  await db.disconnect();

  return res.status(200).json(entries);
};
