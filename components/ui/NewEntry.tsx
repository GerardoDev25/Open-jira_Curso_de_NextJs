import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      <Button startIcon={<AddCircleOutlineOutlinedIcon />} fullWidth variant='outlined'>
        Agregar tarea
      </Button>
      <TextField
        fullWidth
        sx={{
          marginTop: 2,
          marginBottom: 1,
        }}
        autoFocus
        multiline
        label='Nueva entrada'
        helperText='ingrese texto'
      />
      <Box display={'flex'} justifyContent='space-between'>
        <Button variant='outlined'>Cancelar</Button>
        <Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />}>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};
