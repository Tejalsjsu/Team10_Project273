import {
          BILLS,
          BILL_DETAILS,
          REVENUE,
          PAGE_CLICKS,
          MOVIE_CLICKS,
          TOP10_HALLS_WITH_MAX_REVENUE,
          TOP10_MOVIE_REVENUES,
          CITYWISE_REVENUE_PERYEAR_FOR_MOVIE
      } from '../actions/adminTypes';

const initialState = {
    bills: [],
    billDetails: {},
    revenue: {},
    pageClicks: {},
    movieClicks: [],
    top10_halls_with_max_revenue: [],
    top10_movie_revenues: [],
    citywise_revenue_peryear_for_movie: []
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

    case TOP10_HALLS_WITH_MAX_REVENUE:
        state={
          ...state,
          top10_halls_with_max_revenue: action.payload
        };
    break;

    case TOP10_MOVIE_REVENUES:
        state={
          ...state,
          top10_movie_revenues: action.payload
        };
    break;

    case CITYWISE_REVENUE_PERYEAR_FOR_MOVIE:
        state={
          ...state,
          citywise_revenue_peryear_for_movie: action.payload
        };
    break;

    default:
      break;
  }
  return state;
};

export default adminReducer;
