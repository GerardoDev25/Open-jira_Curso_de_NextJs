import { DragEvent, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntriesContext } from '@/context/entries';
import { EntryStatus } from '@/interfaces';
import { EntryCard } from './EntryCard';
import { UIContext } from '@/context/ui';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {
  const { isDraging, endtDraging } = useContext(UIContext);
  const { entries, updateEntry } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );

  const handleDropEntry = (e: DragEvent) => {
    const id = e.dataTransfer.getData('text');

    const entry = entries.find((en) => en._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endtDraging()
  };

  const allowDropEnrty = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDropEntry}
      onDragOver={allowDropEnrty}
      className={isDraging ? styles.draging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: '5px 5px',
        }}
      >
        <List sx={{ opacity: isDraging ? 0.2 : 1, transition: 'opacity .2s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
