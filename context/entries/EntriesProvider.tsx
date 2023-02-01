import { useEffect, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

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

  const updateEntry = async ({ description, status, _id }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });

      dispatch({ type: '[Entry] - Update Entry', payload: data });

      if (showSnackbar) {
        enqueueSnackbar('entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
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
