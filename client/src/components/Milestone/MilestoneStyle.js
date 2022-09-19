import styled from 'styled-components'
import theme from '../../styles/theme'

export const MilestoneContainer = styled.div`
  .inputs {
    padding: 10px 0;
    > input {
      width: 100%;
      height: 40px;
      padding: 10px 5px;
      border: 1px solid ${theme.border};
      border-radius: 10px;
    }
    > textarea {
      width: 100%;
      height: 100px;
      padding: 10px 5px;
      border: 1px solid ${theme.border};
      border-radius: 10px;
    }
    .p__guide {
      display: flex;
      > p:nth-child(2) {
        color: ${theme.secondary};
        margin-left: 10px;
      }
    }
  }
  .button__complete {
    display: flex;
    justify-content: end;
  }
`
export const CalendarContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: ${theme.violet_m};
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
    padding: 10px 0px;
    font-weight: 600;
  }
  /* ~~~ button styles ~~~ */
  button {
    margin: 2px;
    background-color: ${theme.violet_l};
    border: 0;
    border-radius: 3px;
    padding: 5px 0;
    cursor: pointer;

    &:active {
      background-color: ${theme.violet_d};
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.6;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }

  /* ~~~ active day styles ~~~ */
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background-color: yellow;
  }

  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`
