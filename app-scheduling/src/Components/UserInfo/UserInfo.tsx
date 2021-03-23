import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signOutUser } from '../../stores/userSlice';
import { UserInfoWrapper } from './UserInfoStyles';

const UserInfo = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectUser);

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  if (!selectedUser.email) {
    return null;
  }

  return (
    <UserInfoWrapper>
      <span>{selectedUser.email}</span>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignOut}
        endIcon={<ExitToAppIcon />}
      >
        Sign Out
      </Button>
    </UserInfoWrapper>
  );
};

export default UserInfo;
