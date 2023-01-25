import { Layout } from '@/componenets/layout';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout >
      <Typography variant='h1' color={'primary'}>
        Hola mundo
      </Typography>
    </Layout>
  );
};
export default HomePage;
