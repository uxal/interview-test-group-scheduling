import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Wrapper } from '../../common-styles/CommonStyles';
import { AuthenticationCard, Title, SubTitle } from './AuthenticationStyles';
import { register, signin } from '../../stores/userSlice';

const Authentication = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };

  const handleSubmit = async () => {
    if (!email.length || !password.length) {
      return;
    }
    setLoading(true);
    let errorText = null;
    if (location.pathname.includes('signin')) {
      errorText = await dispatch(signin(email, password));
    } else {
      errorText = await dispatch(register(email, password));
    }
    setLoading(false);
    //setError(errorText);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  const isSignIn = location.pathname.includes('signin');

  return (
    <Wrapper justify="center">
      <AuthenticationCard>
        <Wrapper align="flex-start" inner column noPadding>
          <Title>Welcome to the scheduling example</Title>
          {isSignIn ? (
            <SubTitle>Please sign in</SubTitle>
          ) : (
            <SubTitle>Create a new account</SubTitle>
          )}
          <TextField
            label="Email"
            variant="outlined"
            onChange={handleEmailChange}
            value={email}
            className="text-field"
            type="email"
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={handlePasswordChange}
            value={password}
            className="text-field"
          />
          {!isSignIn && (
            <Link to="signin">I have an account, I want to sign in.</Link>
          )}
          {isSignIn && (
            <Link to="register">I want to create a new account.</Link>
          )}
          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={handleSubmit}
          >
            {loading && (
              <CircularProgress size={20} color="inherit" className="spinner" />
            )}
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Button>
        </Wrapper>
      </AuthenticationCard>
      <Snackbar
        open={error !== null}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default Authentication;
