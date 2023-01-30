import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';

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
import { isValidObjectId } from 'mongoose';

interface Props {
  age: number;
}

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage: FC<Props> = (props) => {
  console.log(props);

  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
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
    <Layout title='.....'>
      <Grid sx={{ marginTop: 2 }} container justifyContent={'center'}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entrada: ${inputValue}`} subheader={`Creada hace: ...`} />
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

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { id },
  };
};

export default EntryPage;
