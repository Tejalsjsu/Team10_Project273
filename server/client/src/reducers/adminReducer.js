import {BILLS, BILL_DETAILS, REVENUE, PAGE_CLICKS, MOVIE_CLICKS} from '../actions/adminTypes';

const initialState = {
    bills: [],
    billDetails: {},
    revenue: {},
    pageClicks: {},
    movieClicks: []
}

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    case BILLS:
        state={
          ...state,
          bills: action.payload
        };
    break;

    case BILL_DETAILS:
        state={
          ...state,
          billDetails: action.payload
        };
    break;

    case REVENUE:
        state={
          ...state,
          revenue: action.payload
        };
    break;

    case PAGE_CLICKS:
        state={
          ...state,
          pageClicks: action.payload
        };
    break;

    case MOVIE_CLICKS:
        state={
          ...state,
          movieClicks: action.payload
        };
    break;

    default:
      break;
  }
  return state;
};

export default adminReducer;
