import axios from 'axios';
import { BILLS, BILL_DETAILS, REVENUE, PAGE_CLICKS, MOVIE_CLICKS } from './adminTypes';

export const latest10Bills = () => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/latest10Bills');
  // console.log("response data: " + JSON.stringify(res));
  dispatch({ type: BILLS, payload: res.data.result });
};

export const searchByDate = (date) => async dispatch => {
  console.log("query data for date: " + date);
  const res = await axios.get('/adminSqlRoutes/billSearch',
                              { params: {date: date}});
  dispatch({ type: BILLS, payload: res.data.result });
};

export const searchByMonth = (month) => async dispatch => {
  console.log("query data for month: " + month);
  const res = await axios.get('/adminSqlRoutes/billSearch',
                              {params:
                                  {
                                    month: month
                                  }
                              }
                            );
  dispatch({ type: BILLS, payload: res.data.result });
};

export const getBill = (billingId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/getBill',
                              {params:
                                  {
                                    billingId: billingId
                                  }
                              }
                            );
  // console.log("Bill Details: " + JSON.stringify(res));
  dispatch({ type: BILL_DETAILS, payload: res.data.result });
};

export const getRevenueByMovie = (movieId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/getRevenueByMovie',
                              {params:
                                  {
                                    movieId: movieId
                                  }
                              });
  dispatch({ type: REVENUE, payload: res.data.result });
};

export const getRevenueByHall = (hallId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/getRevenueByHall',
                              {params:
                                  {
                                    hallId: hallId
                                  }
                              });
  dispatch({ type: REVENUE, payload: res.data.result });
};

export const updatePageClick = (pageName) => async dispatch => {
  const res = await axios.post('/graphs/updatePageClick', {'page': pageName});
};

export const getPageClicks = () => async dispatch => {
  const res = await axios.get('/graphs/getPageClicks');
  dispatch({ type: PAGE_CLICKS, payload: res.data.result });
};

export const updateMovieClick = (movieObject) => async dispatch => {
  const res = await axios.post('/graphs/updateMovieClick', movieObject);
};

export const getMovieClicks = () => async dispatch => {
  const res = await axios.get('/graphs/getMovieClicks');
  dispatch({ type: MOVIE_CLICKS, payload: res.data.results });
};
