import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  children: React.ReactNode;
};

const ThemeWrapper = ({ children }: Props) => {
  const { theme } = useContext(ThemeContext);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
