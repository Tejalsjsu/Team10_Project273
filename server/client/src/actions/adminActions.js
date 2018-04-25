import axios from 'axios/index';

export function addMovieHall(hallData) {
  return dispatch => {
    console.log('inside add movie Hall data', hallData);
    return axios.post('/admin/addMovieHall', hallData).then(response => {
      console.log('inside add movie Hall', response.data);
      dispatch(addMvHall(response.data));
    });
  };
}

export function searchMovieHall(searchData) {
  return dispatch => {
    console.log('inside search movie Hall data', searchData);
    return axios
      .post('/admin/searchMovieHall', { searchStr: searchData })
      .then(response => {
        dispatch(searchMvHall(response.data));
      });
  };
}

export function updateMovieHall(hallData) {
  return dispatch => {
    return axios.post('admin/updateMovieHall', hallData).then(response => {
      dispatch(updateMvHall(response.data));
    });
  };
}

export function addMvHall(values) {
  return {
    type: 'ADD_HALL',
    payload: values
  };
}
export function searchMvHall(values) {
  return {
    type: 'SEARCH_HALL',
    payload: values
  };
}
export function updateMvHall(values) {
  return {
    type: 'UPDATE_HALL',
    payload: values
  };
}
