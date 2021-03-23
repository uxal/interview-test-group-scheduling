import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';

import { selectPath, redirectToPath } from './stores/redirectSlice';
import { fetchGroups } from './stores/groupsSlice';
import { getUserInfo } from './stores/userSlice';

import Register from './Views/Register/Register';
import SignIn from './Views/SignIn/SignIn';
import Calendar from './Views/Calendar/Calendar';
import Groups from './Views/Groups/Groups';
import Header from './Components/Header/Header';

import { AppWrapper } from './common-styles/CommonStyles';

function App() {
  const dispatch = useDispatch();
  const path = useSelector(selectPath);

  useEffect(() => {
    const token = localStorage.getItem('app-scheduling-token');
    if (token) {
      dispatch(getUserInfo());
      dispatch(redirectToPath('/'));
      dispatch(fetchGroups());
      return;
    }
    dispatch(redirectToPath('/signin'));
  }, []);

  return (
    <div className="App">
      <Header />
      <AppWrapper>
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/group/:groupId">
              <Calendar />
            </Route>
            <Route path="/">
              <Groups />
            </Route>
          </Switch>
          <Redirect to={path} />
        </Router>
      </AppWrapper>

      {/* <header className="App-header">
       
        <hr/>
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  );
}

export default App;
