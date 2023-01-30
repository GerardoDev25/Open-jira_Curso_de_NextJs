import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { Layout } from '@/components/layout';
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
    </Layout>
  );
};
export default EntryPage;
