import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import { db } from '@/database';
import { EntryModel, IEntry } from '@/models';

type Data = { message: string } | IEntry;

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `id: ${id} invalid` });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);

    case 'GET':
      return getByIdEntry(req, res);

    default:
      return res.status(400).json({ message: `method not exits` });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.conecct();

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `entry not exits` });
  }

  const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    await db.disconnect();

    return res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    console.log({ error });
    return res.status(400).json({ message: error.errors.status.message });
  }
};

const getByIdEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.conecct();
  const entry = await EntryModel.findById(id);
  await db.disconnect();

  if (!entry) {
    await db.disconnect();
    return res.status(400).json({ message: `entry not exits` });
  }
  return res.status(200).json(entry!);
};
