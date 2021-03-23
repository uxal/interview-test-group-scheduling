import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface IGroupState {
  groups: IGroupItem[];
  searchQuery: String;
}

interface IGroupAuthor {
  firstName: string;
  surname: string;
}

interface IGroupItem {
  title: string;
  author: IGroupAuthor;
}

const DATA_SOURCE = [
  {
    title: 'Learn Python programming',
    author: {
      firstName: 'Miguel',
      surname: 'De Cervantes',
    },
  },
  {
    title: 'Negotiations Study Group',
    author: {
      firstName: 'John',
      surname: 'Bunyan',
    },
  },
  {
    title: 'Jazz Improv Study Group',
    author: {
      firstName: 'Emily',
      surname: 'Brontë',
    },
  },
  {
    title: 'Business & Music Specialization',
    author: {
      firstName: 'Jonathan',
      surname: 'Swift',
    },
  },
  {
    title: 'Peer to Peer Songwriting',
    author: {
      firstName: 'Henry',
      surname: 'Fielding',
    },
  },
  {
    title: 'Writing your first novel',
    author: {
      firstName: 'Samuel',
      surname: 'Richardson',
    },
  },
  {
    title: 'Playing Guitar Peer Study Group',
    author: {
      firstName: 'Laurence',
      surname: 'Sterne',
    },
  },
  {
    title: 'Meditation Discussion Group',
    author: {
      firstName: 'Jane',
      surname: 'Austen',
    },
  },
];

const initialState: IGroupState = {
  searchQuery: '',
  groups: [],
};

export const autocompleteGroupsSlice = createSlice({
  name: 'autocompleteGroups',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.groups = payload.length
        ? DATA_SOURCE.filter((group) =>
            group.title.toLowerCase().includes(action.payload)
          )
        : [];
    },
  },
});

export const { search } = autocompleteGroupsSlice.actions;

export const selectFoundGroups = (state: RootState) =>
  state.autocomplete.groups;

export default autocompleteGroupsSlice.reducer;
