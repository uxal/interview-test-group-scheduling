import axios from 'axios';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { AppThunk, RootState } from './index';
import { redirectToPath } from './redirectSlice';
import config from '../config';
import { request } from '../utils';
import findIndex from 'lodash/findIndex';

interface IGroup {
  id: string;
  name: string;
  selected: boolean;
  slotRows: ISlotRow[];
  leftButtonDisabled: boolean;
  rightButtonDisabled: boolean;
}

interface IApiSlot {
  dateTime: string;
  count: number;
  users: string[];
}

interface ISlotRow {
  dayName: string;
  slots: ISlot[];
}

interface ISlot {
  id: string;
  visible: boolean;
  time: string;
  count: number;
}

interface ISetSlotsAction {
  groupId: string;
  slotRows: ISlotRow[];
}

interface IGroupsState {
  loading: boolean;
  groups: IGroup[];
}

interface ITimeNavigationAction {
  direction: string;
  groupId: string;
}

const initialState: IGroupsState = {
  loading: true,
  groups: [],
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<IGroup[]>) => {
      state.groups = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<String>) => {
      state.groups = state.groups.map((group) => ({
        ...group,
        selected: group.id === action.payload,
      }));
    },
    setGroupCalendarSlots: (state, action: PayloadAction<ISetSlotsAction>) => {
      const groupToUpdate = state.groups.find(
        (group) => group.id === action.payload.groupId
      );
      if (groupToUpdate) {
        groupToUpdate.slotRows = action.payload.slotRows;
      }
    },
    timeNavigation: (state, action: PayloadAction<ITimeNavigationAction>) => {
      const groupToUpdate = state.groups.find(
        (group) => group.id === action.payload.groupId
      );
      if (groupToUpdate) {
        const currentFirstVisibleTimeIndex = findIndex(
          groupToUpdate.slotRows[0].slots,
          (item) => item.visible
        );

        let newStartVisibleIndex = currentFirstVisibleTimeIndex;
        let newEndVisibleIndex = currentFirstVisibleTimeIndex + 7;

        let disabledLeftButton = false;
        let disabledRightButton = false;

        if (action.payload.direction === 'left') {
          newStartVisibleIndex = currentFirstVisibleTimeIndex - 8;
          newEndVisibleIndex = currentFirstVisibleTimeIndex;
          if (newStartVisibleIndex <= 0) {
            newStartVisibleIndex = 0;
            disabledLeftButton = true;
          }
        } else {
          newStartVisibleIndex = currentFirstVisibleTimeIndex + 8;
          newEndVisibleIndex = newStartVisibleIndex + 8;
          if (newEndVisibleIndex >= groupToUpdate.slotRows[0].slots.length) {
            disabledRightButton = true;
          }
        }

        groupToUpdate.slotRows.forEach((slotRow) => {
          slotRow.slots.forEach((slot, index) => {
            slot.visible =
              index >= newStartVisibleIndex && index < newEndVisibleIndex;
          });
        });
        groupToUpdate.leftButtonDisabled = disabledLeftButton;
        groupToUpdate.rightButtonDisabled = disabledRightButton;
      }
    },
  },
});

export const {
  setGroups,
  setLoading,
  setSelectedGroup,
  setGroupCalendarSlots,
  timeNavigation,
} = groupsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchGroups = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await request({
      path: '/group',
      method: 'GET',
      authenticate: true,
    });
    dispatch(
      setGroups(data.map((item: any) => ({ id: item._id, name: item.name })))
    );
    dispatch(setLoading(false));
  } catch (error) {
    //TODO: SHOW THE ERROR ON SNACKBAR
    console.log(error);
  }
};

export const fetchCalendar = (groupId: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setSelectedGroup(groupId));
    const { data } = await request({
      path: `/group/${groupId}/calendarSlot`,
      method: 'GET',
      authenticate: true,
    });

    // generate the list of calendar options
    const slots = [];
    const firstDay = moment.utc('2021-03-01').startOf('week');
    const currentTime = firstDay.startOf('day');
    const nextDay = firstDay.clone().add(1, 'day').startOf('day');

    while (currentTime.isBefore(nextDay)) {
      const hours = currentTime.hours();
      slots.push({
        visible: hours >= 12 && hours < 16,
        time: currentTime.format('HH:mm'),
      });
      currentTime.add('30', 'minute');
    }

    const groupCalendarSlots = [];
    for (let i = 0; i < 7; i++) {
      const currentDateString = firstDay.utc().format('YYYY-MM-DD');

      groupCalendarSlots.push({
        dayName: firstDay.format('dddd'),
        slots: slots.map((slot) => {
          const slotId = `${currentDateString}@${slot.time}`;
          const existingApiRecord = data.find(
            (item: IApiSlot) => item.dateTime === slotId
          );

          return {
            ...slot,
            id: slotId,
            count: existingApiRecord ? existingApiRecord.count : 0,
          };
        }),
      });
      firstDay.add(1, 'day');
    }

    dispatch(setGroupCalendarSlots({ groupId, slotRows: groupCalendarSlots }));
    dispatch(setLoading(false));
  } catch (error) {
    //TODO: SHOW THE ERROR ON SNACKBAR
    console.log(error);
  }
};

export const recordOption = (groupId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setSelectedGroup(groupId));
    const { data } = await request({
      path: `/group/${groupId}/calendarSlot`,
      method: 'GET',
      authenticate: true,
    });

    // dispatch(
    //   setGroups(data.map((item: any) => ({ id: item._id, name: item.name })))
    // );
    // dispatch(setLoading(false));
  } catch (error) {
    //TODO: SHOW THE ERROR ON SNACKBAR
    console.log(error);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGroups = (state: RootState) => state.groups.groups;

export const selectDisplayedGroup = (state: RootState) =>
  state.groups.groups.find((group) => group.selected);

export default groupsSlice.reducer;
