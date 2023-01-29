import { useEffect, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: React.ReactNode;
}

export const EntriesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const refresEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] - Refresh Data', payload: data });
  };

  useEffect(() => {
    refresEntries();
  }, []);

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description });

    dispatch({ type: '[Entry] - AddEntry', payload: data });
  };

  const updateEntry = async ({ description, status, _id }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({ type: '[Entry] - Update Entry', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
