import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from '@/components/layout';
import { EntryStatus } from '@/interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage = () => {
  return (
    <Layout title='.....'>
      <Grid sx={{ marginTop: 2 }} container justifyContent={'center'}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entrada:' subheader={`Creada hace: ...`} />
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                label='Nueva entrada'
                multiline
                placeholder='Nueva entrada'
                sx={{ marginTop: 2, marginBottom: 1 }}
              />

              <FormControl>
                <FormLabel>Estado...</FormLabel>
                <RadioGroup row>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                color='secondary'
                fullWidth
                startIcon={<SaveOutlinedIcon />}
                variant='contained'
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};
export default EntryPage;
