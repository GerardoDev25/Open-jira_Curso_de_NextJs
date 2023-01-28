import { DragEvent, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesContext } from '@/context/entries';
import { EntryStatus } from '@/interfaces';
import { EntryCard } from './EntryCard';

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );

  const handleDropEntry = (e: DragEvent) => {
    const id = e.dataTransfer.getData('text');
    console.log(id);
  };

  const allowDropEnrty = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div onDrop={handleDropEntry} onDragOver={allowDropEnrty}>
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: '5px 5px',
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
