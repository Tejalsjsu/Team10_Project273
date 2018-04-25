import axios from 'axios';
import { FETCH_MOVIE_LOCATIONS } from './types';

export const fetchLocations = value => async dispatch => {
  const res = await axios.get(`/api/movie/locations/${value}`);
  console.log(res);
  dispatch({ type: FETCH_MOVIE_LOCATIONS, payload: res.data });
};
