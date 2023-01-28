import { Entry } from '@/interfaces';
import { createContext } from 'react';

export interface ContextProps {
  entries: Entry[];
  addEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({} as ContextProps);
