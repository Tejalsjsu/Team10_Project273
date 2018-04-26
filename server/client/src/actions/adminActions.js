import axios from 'axios';
import {
          BILLS,
          BILL_DETAILS,
          REVENUE,
          PAGE_CLICKS,
          MOVIE_CLICKS,
          TOP10_HALLS_WITH_MAX_REVENUE,
          TOP10_MOVIE_REVENUES,
          CITYWISE_REVENUE_PERYEAR_FOR_MOVIE,
          REVIEWS_ON_MOVIES
      } from './adminTypes';

export const latest10Bills = (userId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/latest10Bills',
                              { params: {userId: userId}});
  // console.log("response data: " + JSON.stringify(res));
  dispatch({ type: BILLS, payload: res.data.result });
};

export const searchByDate = (date, userId) => async dispatch => {
  console.log("query data for date: " + date);
  const res = await axios.get('/adminSqlRoutes/billSearch',
                              { params:
                                  {
                                    date: date,
                                    userId: userId
                                  }
                              });
  dispatch({ type: BILLS, payload: res.data.result });
};

export const searchByMonth = (month, userId) => async dispatch => {
  console.log("query data for month: " + month);
  const res = await axios.get('/adminSqlRoutes/billSearch',
                              { params:
                                  {
                                    month: month,
                                    userId: userId
                                  }
                              }
                            );
  dispatch({ type: BILLS, payload: res.data.result });
};

export const getBill = (billingId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/getBill',
                              { params: { billingId: billingId }});

  dispatch({ type: BILL_DETAILS, payload: res.data.result });
};

export const getRevenueByMovie = (movieId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/getRevenueByMovie',
                              { params: { movieId: movieId }});
  dispatch({ type: REVENUE, payload: res.data.result });
};

export const getRevenueByHall = (hallId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/getRevenueByHall',
                              { params: { hallId: hallId }});
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
  dispatch({ type: MOVIE_CLICKS, payload: res.data.result });
};

export const getTop10HallsWithMaxRevenue = () => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/top10HallsWithMaxRevenue');
  dispatch({ type: TOP10_HALLS_WITH_MAX_REVENUE, payload: res.data.result });
};

export const getTop10MovieRevenues = () => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/top10MovieRevenues');
  dispatch({ type: TOP10_MOVIE_REVENUES, payload: res.data.result });
};

export const getCityWiseRevenuePerYearForMovie = (movieId) => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/cityWiseRevenuePerYearForMovie',
                              { params: { movieId: movieId }});
  dispatch({ type: CITYWISE_REVENUE_PERYEAR_FOR_MOVIE, payload: res.data.result });
};

export const getReviewsOnMovies = () => async dispatch => {
  const res = await axios.get('/adminSqlRoutes/reviewsOnMovies');
  dispatch({ type: REVIEWS_ON_MOVIES, payload: res.data.result });
};
