import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './index';
import { redirectToPath } from './redirectSlice';
import config from '../config';
import { request } from '../utils';
import { fetchGroups } from './groupsSlice';

interface IUserState {
  email: string | undefined;
  selectedSlots: string[];
}

const initialState: IUserState = {
  email: undefined,
  selectedSlots: [],
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.email = action.payload.email;
    },
    signOut: (state) => {
      state.email = undefined;
      state.selectedSlots = [];
    },
  },
});

export const { setUser, signOut } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const register = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    const dataObject = { email, password };
    const { data } = (await axios.post(
      `${config.API_URL}/user/register`,
      dataObject
    )) as any;
    // save the token
    if (data.token) {
      localStorage.setItem('app-scheduling-token', data.token);
      await dispatch(getUserInfo());
      await dispatch(fetchGroups());
      dispatch(redirectToPath('/'));
    }
  } catch (error) {
    //TODO: SHOW THE ERROR ON SNACKBAR
    console.log(error);
  }
};

export const signin = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    const dataObject = { email, password };
    const { data } = (await axios.post(
      `${config.API_URL}/user/signin`,
      dataObject
    )) as any;
    // save the token
    if (data.token) {
      localStorage.setItem('app-scheduling-token', data.token);
      await dispatch(getUserInfo());
      await dispatch(fetchGroups());
      dispatch(redirectToPath('/'));
    }
  } catch (error) {
    //TODO: SHOW THE ERROR ON SNACKBAR
    console.log(error);
  }
};

export const signOutUser = (): AppThunk => (dispatch) => {
  localStorage.removeItem('app-scheduling-token');
  dispatch(redirectToPath('/signin'));
  dispatch(signOut());
};

export const getUserInfo = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await request({
      path: `/user/me`,
      method: 'GET',
      authenticate: true,
    });
    dispatch(setUser(data));
  } catch (error) {
    //TODO: SHOW THE ERROR ON SNACKBAR
    console.log(error);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default counterSlice.reducer;
