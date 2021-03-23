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

import { AppWrapper, Wrapper } from './common-styles/CommonStyles';
import GroupSearch from './Components/GroupSearch/GroupSearch';

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

        <Wrapper>
          <GroupSearch />
        </Wrapper>
      </AppWrapper>
    </div>
  );
}

export default App;
