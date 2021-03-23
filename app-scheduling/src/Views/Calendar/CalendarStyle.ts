import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  background: #e67471;
  color: #fff;

  div {
    padding: 5px 10px;
    cursor: default;
    display: flex;
    justify-content: center;
    border-left: 1px solid transparent;

    &:first-of-type {
      border-left: 0;
    }
  }

  button {
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;
    color: #fff;
    cursor: pointer;
    outline: none;

    &[disabled] {
      opacity: 0.3;
    }
  }
`;

interface RightColumnButtonContainerProps {
  readonly hasBorder?: boolean;
}

export const RightColumnButtonContainer = styled.div<RightColumnButtonContainerProps>`
  width: 10px;
  display: flex;
  ${({ hasBorder }) => {
    if (hasBorder) {
      return `
        border-left: 0 !important;
        height: 18px;
        padding: 5px 0;
      `;
    }
  }}
`;

export const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CalendarRow = styled.div`
  display: flex;
  align-items: center;

  div {
    padding: 5px 10px;
    cursor: default;
    display: flex;
    justify-content: center;
    border-top: 1px solid;
    border-left: 1px solid;

    &:first-of-type {
      border-left: 0;
    }
  }

  &:last-of-type {
    div {
      border-bottom: 0;
    }
  }
`;

export const DayName = styled.div`
  padding: 5px 10px;
  width: 100px;
  display: flex;
  justify-content: flex-start !important;
`;

export const TimeSlotWrapper = styled.div`
  width: 50px;
`;
