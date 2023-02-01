import { EntryModel, IEntry } from '@/models';
import { isValidObjectId } from 'mongoose';
import { db } from '.';

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;
  await db.conecct();
  const entry = await EntryModel.findById(id).lean();
  await db.disconnect();
  return entry;
};
