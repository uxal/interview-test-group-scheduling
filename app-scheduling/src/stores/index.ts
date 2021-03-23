import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from './userSlice';
import redirectReducer from './redirectSlice';
import groupsReducer from './groupsSlice';
import autocompleteReducer from './autocompleteSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    redirect: redirectReducer,
    groups: groupsReducer,
    autocomplete: autocompleteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
