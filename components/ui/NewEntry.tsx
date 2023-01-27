import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFielChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    console.log(inputValue);
  };

  const onCancel = () => {
    setIsAdding(false);
    setTouched(false);
    setInputValue('');
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAdding ? (
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
            helperText={inputValue.length <= 0 && touched && 'ingrese texto'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFielChanges}
            onBlur={() => setTouched(true)}
          />
          <Box display={'flex'} justifyContent='space-between'>
            <Button variant='outlined' onClick={onCancel}>
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
          onClick={() => setIsAdding(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
