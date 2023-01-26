import { useReducer } from 'react';
import { v4 as UUID } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: UUID(),
      description: 'Consequat eiusmod aliqua magna nostrud reprehenderit.',
      status: 'pending',
      createAt: Date.now(),
    },
    {
      _id: UUID(),
      description: 'Consequat eiusmod aliqua magna nostrud reprehenderit.',
      status: 'in-progress',
      createAt: Date.now() -1_000_000,
    },
    {
      _id: UUID(),
      description: 'Consequat eiusmod aliqua magna nostrud reprehenderit.',
      status: 'finished',
      createAt: Date.now() - 100_000,
    },
  ],
};

interface Props {
  children: React.ReactNode;
}

export const EntriesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
