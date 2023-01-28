import { DragEvent, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { Entry } from '@/interfaces';
import { UIContext } from '@/context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard: React.FC<Props> = ({ entry }) => {
  const { startDraging, endtDraging } = useContext(UIContext);

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text', entry._id);
    startDraging();
  };

  const handleDragEnd = () => {
    // todo cancel drag
    endtDraging();
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>Hace 30 minitos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
