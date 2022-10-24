import HeightIcon from '@mui/icons-material/Height';
import { TableCell } from '@mui/material';
import React, { FC } from 'react';
import { sort } from 'store/duck/usersSlice/slice';
import { useAppDispatch } from 'store/store';

type TitleRowProps = {
  index: number;
  title: string;
};

const TitleRow: FC<TitleRowProps> = ({ index, title }) => {
  const dispatch = useAppDispatch();

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
};

export default TitleRow;
