import { Container, Typography } from '@mui/material';
import React from 'react';
import { TableHeader, MainTable } from 'components';

function App() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" mt={5} mb={2}>
        Dashboard
      </Typography>
      <TableHeader />
      <MainTable />
    </Container>
  );
}

export default App;
