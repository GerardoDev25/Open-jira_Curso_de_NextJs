import { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { addEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onTextFielChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addEntry(inputValue);

    onReset();
  };

  const onReset = () => {
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={inputValue.length <= 0 && touched ? 'Texto es requerido' : 'Ingrese texto'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFielChanges}
            onBlur={() => setTouched(true)}
          />
          <Box display={'flex'} justifyContent='space-between'>
            <Button variant='outlined' onClick={onReset}>
              Cancelar
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant='outlined'
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
