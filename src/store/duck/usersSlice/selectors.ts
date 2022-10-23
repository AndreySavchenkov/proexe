import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export const getUsers = (state: RootState) => state.users.users;
export const loadingUsers = (state: RootState) => state.users.loading;
export const getUserById = (id: number) =>
  createSelector(getUsers, (state) => state.find((item) => item.id === id));
