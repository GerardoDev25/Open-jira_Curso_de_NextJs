import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { EntryModel, IEntry } from '@/models';

type Data = { message: string } | IEntry[] | IEntry;

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);

    case 'POST':
      return postEntries(req, res);

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

const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body;

  const newEntry = new EntryModel({ description, createAt: Date.now() });

  try {
    await db.conecct();
    await newEntry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: 'something was wrong check server log' });
  }
};
