import { FETCH_MOVIES, FETCH_MOVIE_LOCATIONS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIES:
    case FETCH_MOVIE_LOCATIONS:
      return action.payload || false;
    default:
      return state;
  }
}
