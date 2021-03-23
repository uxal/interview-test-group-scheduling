import styled from 'styled-components';
import device from '../../common-styles/device';

export const HeaderWrapper = styled.header`
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: ${(props) => props.theme.headerBackground};
  padding: 10px 0;
  box-shadow: 0px 2px 8px 1px ${(props) => props.theme.shadow};
  border-bottom: 1px solid ${(props) => props.theme.headerBorder};
  z-index: 1;
  height: 60px;

  @media ${device.mobile} {
    padding: 10px 20px;
    width: calc(100% - 30px);
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  color: ${(props) => props.theme.text.secondary};
  letter-spacing: 1.2px;
  font-weight: bold;
`;
