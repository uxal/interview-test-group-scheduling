import React, { useContext } from 'react';

import { Wrapper } from '../../common-styles/CommonStyles';
import UserInfo from '../UserInfo/UserInfo';
import { HeaderWrapper, LogoWrapper } from './HeaderStyles';

const Header = () => {
  return (
    <HeaderWrapper>
      <Wrapper justify="space-between" align="center">
        <LogoWrapper>Scheduling example</LogoWrapper>
        <UserInfo />
      </Wrapper>
    </HeaderWrapper>
  );
};

export default Header;
