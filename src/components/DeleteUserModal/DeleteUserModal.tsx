import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { deleteUser } from 'store/duck/usersSlice/slice';
import { useAppDispatch } from 'store/store';
import { modalStyle } from 'style';

type AddUserModalProps = {
  id: number;
  open: boolean;
  handleClose: (data: boolean) => void;
};

const DeleteUserModal: FC<AddUserModalProps> = ({ open, handleClose, id }) => {
  const dispatch = useAppDispatch();

  const deleteUserHandler = () => {
    dispatch(deleteUser({ id }));
    handleClose(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Do you want to delete this User?</Typography>
          <CloseIcon onClick={() => handleClose(false)} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Stack
          mt={2}
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            fullWidth
            size="large"
            color="success"
            variant="contained"
            onClick={deleteUserHandler}
          >
            Yes
          </Button>
          <Button
            fullWidth
            size="large"
            color="error"
            variant="contained"
            onClick={() => handleClose(false)}
          >
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
