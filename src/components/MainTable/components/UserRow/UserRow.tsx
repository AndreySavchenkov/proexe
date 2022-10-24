import { Button, TableCell, TableRow } from '@mui/material';
import React, { FC, memo } from 'react';
import { User } from 'store/duck/usersSlice/type';

type UserProps = {
  user: User;
  editHandler: (data: number) => void;
  deleteHandler: (data: number) => void;
};

const UserRow: FC<UserProps> = ({ user, editHandler, deleteHandler }) => {
  return (
    <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {user.id}
      </TableCell>
      <TableCell align="right">{user.name}</TableCell>
      <TableCell align="right">{user?.username || '-'}</TableCell>
      <TableCell align="right">{user.email}</TableCell>
      <TableCell align="right">{user?.address?.city || '-'}</TableCell>
      <TableCell align="right">
        <Button
          size="small"
          color="warning"
          variant="contained"
          onClick={() => editHandler(user.id)}
        >
          edit
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={() => deleteHandler(user.id)}
        >
          delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default memo(UserRow);
