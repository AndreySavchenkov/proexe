import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUsersThunk } from 'store/duck/usersSlice/actions';
import { getUsers, loadingUsers } from 'store/duck/usersSlice/selectors';
import { sort } from 'store/duck/usersSlice/slice';
import { useAppDispatch } from 'store/store';
import HeightIcon from '@mui/icons-material/Height';
import { DeleteUserModal, EditUserModal } from 'components';

const MainTable = () => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useAppDispatch();
  const users = useSelector(getUsers);
  const loading = useSelector(loadingUsers);

  const editUserHandler = (id: number) => {
    setIsShowModal(true);
    setCurrentId(id);
  };

  const deleteUserHandler = (id: number) => {
    setIsShowDeleteModal(true);
    setCurrentDeleteId(id);
  };

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
                {titles.map((title, index) => {
                  if (index === 1) {
                    return (
                      <TableCell
                        key={index}
                        align={'right'}
                        onClick={() => dispatch(sort())}
                        sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <HeightIcon fontSize="small" />
                        {title}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell align={index === 0 ? 'left' : 'right'} key={index}>
                        {title}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
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
                      onClick={() => editUserHandler(user.id)}
                    >
                      edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => deleteUserHandler(user.id)}
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <EditUserModal open={isShowModal} handleClose={setIsShowModal} id={currentId} />
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
