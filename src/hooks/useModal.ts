import { useState } from 'react';

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  return { isShow, setIsShow, currentId, setCurrentId };
};
