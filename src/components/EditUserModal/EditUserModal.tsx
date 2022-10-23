import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getUserById } from 'store/duck/usersSlice/selectors';
import { updateUser } from 'store/duck/usersSlice/slice';
import { useAppDispatch } from 'store/store';
import { modalStyle } from 'style';

type EditUserModalProps = {
  id: number;
  open: boolean;
  handleClose: (data: boolean) => void;
};

const EditUserModal: FC<EditUserModalProps> = ({ open, handleClose, id }) => {
  const [values] = useState({ name: '', email: '', username: '', city: '' });

  const dispatch = useAppDispatch();
  const user = useSelector(getUserById(id));

  const {
    reset,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: values.city,
      name: values.name,
      email: values.email,
      username: values.username,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormType) => {
    if (user) {
      dispatch(
        updateUser({
          id: user.id,
          name: data.name,
          email: data.email,
          city: data?.city || '',
          username: data?.username || '',
        })
      );
      handleClose(false);
    }
  };

  const defaultValues = {
    name: user?.name,
    email: user?.email,
    username: user?.username || '',
    city: user?.address?.city || '',
  };

  const resetHandler = () => {
    reset(defaultValues, { keepDirtyValues: true });
    console.log(getValues());
  };

  useEffect(() => {
    if (user) {
      reset(defaultValues);
    }
  }, [user, reset]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
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
                <Stack>
                  <Typography color="gray" variant="caption">
                    Name
                  </Typography>
                  <TextField
                    variant="standard"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                  {errors.name && (
                    <Typography color="error" variant="caption">
                      {errors.name.message}
                    </Typography>
                  )}
                </Stack>
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
              }}
              render={({ field }) => (
                <Stack>
                  <Typography color="gray" variant="caption">
                    Email
                  </Typography>
                  <TextField
                    type="email"
                    variant="standard"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                  {errors.email && (
                    <Typography color="error" variant="caption">
                      {errors.email.message}
                    </Typography>
                  )}
                </Stack>
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Stack>
                  <Typography color="gray" variant="caption">
                    Username
                  </Typography>
                  <TextField
                    variant="standard"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </Stack>
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Stack>
                  <Typography color="gray" variant="caption">
                    City
                  </Typography>
                  <TextField
                    variant="standard"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                </Stack>
              )}
            />
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Button type="submit" variant="contained" fullWidth>
                Edit
              </Button>
              <Button
                fullWidth
                type="reset"
                color="warning"
                variant="contained"
                onClick={resetHandler}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default EditUserModal;

type FormType = {
  name: string;
  email: string;
  username?: string;
  city?: string;
};
