import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface IUserState {
  path: string;
}

const initialState: IUserState = {
  path: '/',
};

export const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    redirectToPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload
    }
  },
});

export const { redirectToPath } = redirectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPath = (state: RootState) => state.redirect.path;

export default redirectSlice.reducer;
