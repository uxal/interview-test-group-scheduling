import styled from 'styled-components';

import device from './device';

interface WrapperProps {
  readonly column?: boolean;
  readonly inner?: boolean;
  readonly align?: string;
  readonly justify?: string;
  readonly noPadding?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: ${(props) => props.align || 'center'};
  justify-content: ${(props) => props.justify || 'unset'};
  display: flex;
  margin: 0 auto;
  padding: ${(props) => (props.noPadding ? '0' : '0 30px')};
  min-height: ${(props) => (props.inner ? 'unset' : '100%')};
  width: ${(props) => (props.inner ? '100%' : '1128px')};
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};

  @media ${device.mobile} {
    width: 100%;
    padding: 0;
    align-items: ${(props) => props.align || 'flex-start'};
    ${({ column }) => column && `align-items:center;`}
  }
`;

interface CardProps {
  readonly fullWidth?: boolean;
  readonly flex?: number;
}

export const Card = styled.div<CardProps>`
  background: ${(props) => props.theme.cardBackground};
  padding: 15px;
  box-shadow: 0px 2px 8px 1px ${(props) => props.theme.shadow};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0 !important;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  flex: ${(props) => (props.flex ? props.flex : 'unset')};
  margin-right: 25px;

  @media ${device.mobile} {
    width: ${(props) => (props.fullWidth ? 'calc(100% - 60px)' : 'auto')};
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${(props) => props.theme.separator};
  margin: 10px 0;
`;

export const SectionTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 2px;
  padding-top: 10px;
  padding-bottom: 30px;
  color: ${(props) => props.theme.text.secondary};
`;
