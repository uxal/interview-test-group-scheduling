import styled from 'styled-components';
import { Card } from '../../common-styles/CommonStyles';
import device from '../../common-styles/device';

export const AuthenticationCard = styled(Card)`
  min-width: 40%;
  align-items: flex-start;
  padding: 0 40px;

  @media ${device.mobile} {
    padding: 0 20px;
    width: calc(100% - 100px);
  }

  .MuiTextField-root {
    border-color: red;
    label {
      color: ${(props) => props.theme.text.secondary};
    }
    input {
      color: ${(props) => props.theme.text.primary};
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: ${(props) => props.theme.text.secondary};
    }

    .MuiOutlinedInput-root:hover {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${(props) => props.theme.text.secondaryHover};
      }
    }
  }

  .text-field {
    width: 100%;
    margin: 15px 0;
  }

  button {
    height: 40px;
    margin: 30px 0;

    @media ${device.mobile} {
      width: 100%;
      text-align: center;
    }

    div {
      margin-right: 10px;
    }
  }

  a {
    color: ${(props) => props.theme.activeNavigationButton};
  }
`;

export const Title = styled.div`
  color: ${(props) => props.theme.text.primary};
  font-weight: bold;
  padding: 30px 0;
  font-size: 28px;

  @media ${device.mobile} {
    text-align: center;
    font-size: 20px;
  }
`;

export const SubTitle = styled.div`
  color: ${(props) => props.theme.text.secondary};
  font-size: 18px;
`;
