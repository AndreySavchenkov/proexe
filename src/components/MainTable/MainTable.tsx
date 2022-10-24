import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TitleRow, UserRow } from 'components/MainTable/components';
import { useModal } from 'hooks/useModal';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUsersThunk } from 'store/duck/usersSlice/actions';
import { getUsers, loadingUsers } from 'store/duck/usersSlice/selectors';
import { useAppDispatch } from 'store/store';
import { DeleteUserModal, EditUserModal } from 'components';

const MainTable = () => {
  const {
    isShow: isShowEditModal,
    setIsShow: setIsShowEditModal,
    currentId: currentEditId,
    setCurrentId: setCurrentEditId,
  } = useModal();
  const {
    isShow: isShowDeleteModal,
    setIsShow: setIsShowDeleteModal,
    currentId: currentDeleteId,
    setCurrentId: setCurrentDeleteId,
  } = useModal();

  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const loading = useSelector(loadingUsers);

  const editUserHandler = useCallback(
    (id: number) => {
      setIsShowEditModal(true);
      setCurrentEditId(id);
    },
    [setCurrentEditId, setIsShowEditModal]
  );

  const deleteUserHandler = useCallback(
    (id: number) => {
      setIsShowDeleteModal(true);
      setCurrentDeleteId(id);
    },
    [setCurrentDeleteId, setIsShowDeleteModal]
  );

  const titles = ['Id', 'Name', 'Username', 'Email', 'City', 'Edit', 'Delete'];

  const isUsers = users.length > 0;
  const isShowProgress = loading;
  const isShowText = !loading && !isUsers;
  const isShowContent = !loading && isUsers;

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  return (
    <>
      {isShowProgress && (
        <Stack alignItems="center" justifyContent="center" mt={4}>
          <CircularProgress />
        </Stack>
      )}
      {isShowText && (
        <Typography textAlign="center" mt={4} color="error" variant="h6">
          no items
        </Typography>
      )}
      {isShowContent && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {titles.map((title, index) => (
                  <TitleRow key={index} index={index} title={title} />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  editHandler={editUserHandler}
                  deleteHandler={deleteUserHandler}
                />
              ))}
            </TableBody>
          </Table>
          <EditUserModal
            open={isShowEditModal}
            handleClose={setIsShowEditModal}
            id={currentEditId}
          />
          <DeleteUserModal
            id={currentDeleteId}
            open={isShowDeleteModal}
            handleClose={setIsShowDeleteModal}
          />
        </TableContainer>
      )}
    </>
  );
};

export default MainTable;
