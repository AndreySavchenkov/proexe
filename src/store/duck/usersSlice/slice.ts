import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'store/duck/usersSlice/type';
import { getUsersThunk } from './actions';

type InitialStateType = {
  users: User[];
  loading: boolean;
  sort: boolean;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: true, sort: true } as InitialStateType,
  reducers: {
    addUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.users.push({ id: state.users.length + 1, ...action.payload });
    },
    deleteUser: (state, action: PayloadAction<{ id: number }>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    updateUser: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        email: string;
        username: string;
        city: string;
      }>
    ) => {
      const users = state.users.filter((item) => item.id !== action.payload.id);
      const newUsers = [...users, { address: { city: action.payload.city }, ...action.payload }];
      state.users = newUsers.sort((a, b) => a.id - b.id);
    },
    sort: (state) => {
      if (state.sort) {
        state.users.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      if (!state.sort) {
        state.users.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      state.sort = !state.sort;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const userReducer = usersSlice.reducer;
export const { addUser, deleteUser, updateUser, sort } = usersSlice.actions;
