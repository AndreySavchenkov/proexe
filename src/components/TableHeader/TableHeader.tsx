import { Button, Stack, Typography } from '@mui/material';
import { AddUserModal } from 'components';
import React, { useState } from 'react';

const TableHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack
      p={2}
      direction="row"
      borderRadius={2}
      alignItems="center"
      bgcolor="text.secondary"
      justifyContent="space-between"
    >
      <Typography variant="h6" color="white">
        User list
      </Typography>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Add new
      </Button>
      <AddUserModal open={isOpen} handleClose={setIsOpen} />
    </Stack>
  );
};

export default TableHeader;
