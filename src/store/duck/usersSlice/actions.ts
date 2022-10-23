import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from 'api';

export const getUsersThunk = createAsyncThunk('users/getUsers', async () => {
  try {
    const { data } = await getUsers();
    return data;
  } catch (error) {
    return console.log(error);
  }
});
