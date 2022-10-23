import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { addUser } from 'store/duck/usersSlice/slice';
import { useAppDispatch } from 'store/store';
import { modalStyle } from 'style';

type AddUserModalProps = {
  open: boolean;
  handleClose: (data: boolean) => void;
};

const AddUserModal: FC<AddUserModalProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormType) => {
    dispatch(addUser(data));
    handleClose(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add New User</Typography>
          <CloseIcon onClick={() => handleClose(false)} sx={{ cursor: 'pointer' }} />
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Name is required',
              }}
              render={({ field }) => (
                <>
                  <TextField onChange={field.onChange} label="Name" variant="standard" />
                  {errors.name && <Typography color="error">{errors.name.message}</Typography>}
                </>
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
              }}
              render={({ field }) => (
                <>
                  <TextField
                    type="email"
                    label="Email"
                    variant="standard"
                    onChange={field.onChange}
                  />
                  {errors.email && <Typography color="error">{errors.email.message}</Typography>}
                </>
              )}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

type FormType = {
  name: string;
  email: string;
};

export default AddUserModal;
