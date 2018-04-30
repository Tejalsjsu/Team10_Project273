import React, { Component } from 'react';
import { NavLink, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import MovieView from './MovieHall/MovieView';
import Login from './User/Login';
import Signup from './User/Signup';
import EditProfile from './User/EditProfile';
import AddMovie from './AddMovie';
import Revenue from './Revenue';
import Footer from './Footer';
import MovieDetails from './MovieDetails';
import MovieDetail from './Movie/MovieDetail';
import MovieLocation from './Movie/MovieLocations';
import MovieCheckout from './Movie/MovieCheckout';
import AddMovieToHall from './AddMovieTOHall';
import HallAndMovieRevenues from './admin/HallAndMovieRevenues';

import AddMovieHall from './admin/AddMovieHall';
import SUDMovieHall from './admin/SearchUpdateDeleteMovieHall';
import AdminDashboard from './admin/AdminDashboard';
import AdminBillsView from './admin/Bills';
import AdminBillInfoView from './admin/DisplayBill';

import '../app.css';
import '../adminDashboard.css';

let logo = require('../images/logo-1.png');

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div className="brand-bar">
              <div className="row container">
                <div className="width-75">
                  <div className="banner-bar bar">
                    THIS SUMMER SEE MORE, GET MORE ON FUNDANGO!!
                  </div>
                </div>
                <div className="width-25 right">
                  <NavLink to="" className="navLink">
                    {' '}
                    Offers{' '}
                  </NavLink>{' '}
                  |
                  <NavLink to="" className="navLink">
                    {' '}
                    Sign Out{' '}
                  </NavLink>
                </div>
              </div>
            </div>

            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/public/movies" component={MovieView} />
              <Route exact path="/addMovieHall" component={AddMovieHall} />
              <Route exact path="/adminDashboard" component={AdminDashboard} />
              <Route exact path="/AdminDashboard" component={AdminDashboard} />
              <Route exact path="/sudMovieHall" component={SUDMovieHall} />
              <Route exact path="/User/Login" component={Login} />
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/User/EditProfile" component={EditProfile} />
              <Route exact path="/hallAndMovieRevenue" component={HallAndMovieRevenues} />
              <Route
                exact
                path="/purchase-history/:userId"
                component={AdminBillsView}
              />
              <Route
                exact
                path="/purchase-details/:billingId"
                component={AdminBillInfoView}
              />
              <Route
                exact
                path="/movie-details/:movie_id"
                component={MovieDetails}
              />
              <Route exact path="/add-movie" component={AddMovie} />
              <Route exact path="/edit-movie/:movie_id" component={AddMovie} />
              <Route exact path="/revenue" component={Revenue} />
              <Route
                path="/public/moviedetail/:movieId"
                component={MovieDetail}
              />
              <Route
                exact
                path="/public/movieLocations/:movieId"
                component={MovieLocation}
              />
              <Route
                exact
                path="/public/checkout/:movieId/:locationId"
                component={MovieCheckout}
              />
              <Route exact path="/addMovieToHall" component={AddMovieToHall} />
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
