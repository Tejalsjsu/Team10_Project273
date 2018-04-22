import {BILLS, BILL_DETAILS, REVENUE} from '../actions/adminTypes';

const initialState = {
    bills: [],
    billDetails: {},
    revenue: {}
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

    default:
      break;
  }
  return state;
};

export default adminReducer;
