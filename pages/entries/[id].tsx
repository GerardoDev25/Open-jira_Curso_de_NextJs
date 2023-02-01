import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from '@/components/layout';
import { Entry, EntryStatus } from '@/interfaces';
import { getEntryById } from '@/database';

interface Props {
  entry: Entry;
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputValuechange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value as EntryStatus;
    setStatus(newStatus);
  };

  const onSave = () => {
    console.log({ inputValue, status });
  };

  return (
    <Layout title={inputValue.substring(0, 15) + '...'}>
      <Grid sx={{ marginTop: 2 }} container justifyContent={'center'}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entrada: `} subheader={`Creada hace: ${entry.createAt}`} />
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                label='Nueva entrada'
                multiline
                placeholder='Nueva entrada'
                sx={{ marginTop: 2, marginBottom: 1 }}
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValuechange}
                helperText={isNotValid && 'Ingrese Valor'}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado...</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
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
                onClick={onSave}
                disabled={inputValue.length <= 0}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    // props: { entry: { ...entry, _id: entry._id.toString() } },
    props: { entry },
  };
};

export default EntryPage;
