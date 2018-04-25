import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Secure from './Secure';
import MovieView from './MovieHall/MovieView';
import MovieDetail from './Movie/MovieDetail';
import MovieLocation from './Movie/MovieLocations';
import MovieCheckout from './Movie/MovieCheckout';
import Footer from './Footer';
import Admin from '../components/admin/Admin';
import AdminDashboard from '../components/admin/AdminDashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/public/movies" component={MovieView} />
            <Route
              path="/public/moviedetail/:movieId"
              component={MovieDetail}
            />
            <Route exact path="/addMovieHall" component={Admin} />
            <Route exact path="/adminDasboard" component={AdminDashboard} />
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
            <Secure />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
