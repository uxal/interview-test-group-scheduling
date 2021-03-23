import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import findIndex from 'lodash/findIndex';
import { useDispatch, useSelector } from 'react-redux';

import { Wrapper, SectionTitle } from '../../common-styles/CommonStyles';
import {
  CalendarWrapper,
  CalendarHeader,
  CalendarBody,
  CalendarRow,
  DayName,
  RightColumnButtonContainer,
  TimeSlotWrapper,
} from './CalendarStyle';

import {
  selectDisplayedGroup,
  fetchCalendar,
  timeNavigation,
} from '../../stores/groupsSlice';

interface ITimeSlot {
  visible: boolean;
  time: string;
}

const Calendar = () => {
  const dispatch = useDispatch();

  const selectedGroup = useSelector(selectDisplayedGroup);

  const locationParams = useParams() as any;

  useEffect(() => {
    dispatch(fetchCalendar(locationParams.groupId));
  }, []);

  const navigateLeft = () => {
    dispatch(
      timeNavigation({ direction: 'left', groupId: locationParams.groupId })
    );
  };

  const navigateRight = () => {
    dispatch(
      timeNavigation({ direction: 'right', groupId: locationParams.groupId })
    );
  };

  return (
    <Wrapper align="flex-start" column>
      <SectionTitle>
        Group calendar poll - {selectedGroup && selectedGroup.name}
      </SectionTitle>
      {selectedGroup && selectedGroup.slotRows && (
        <CalendarWrapper>
          <CalendarHeader>
            <DayName>
              <button
                type="button"
                onClick={navigateLeft}
                disabled={selectedGroup.leftButtonDisabled}
              >
                <ChevronLeftIcon />
              </button>
            </DayName>
            {selectedGroup.slotRows[0].slots
              .filter((slot) => slot.visible)
              .map((slot) => (
                <TimeSlotWrapper key={slot.time}>{slot.time}</TimeSlotWrapper>
              ))}
            <RightColumnButtonContainer>
              <button
                type="button"
                onClick={navigateRight}
                disabled={selectedGroup.rightButtonDisabled}
              >
                <ChevronRightIcon />
              </button>
            </RightColumnButtonContainer>
          </CalendarHeader>
          <CalendarBody>
            {selectedGroup.slotRows.map((item) => (
              <CalendarRow key={item.dayName}>
                <DayName>{item.dayName}</DayName>
                {item.slots
                  .filter((slot) => slot.visible)
                  .map((slot) => (
                    <TimeSlotWrapper key={slot.id}>
                      {slot.count}
                    </TimeSlotWrapper>
                  ))}
                <RightColumnButtonContainer hasBorder />
              </CalendarRow>
            ))}
          </CalendarBody>
        </CalendarWrapper>
      )}
    </Wrapper>
  );
};

export default Calendar;
