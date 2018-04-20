import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Secure from './Secure';
import MovieView from './MovieHall/MovieView';
import MovieDetails from './MovieDetails';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
          <div className="container">

            <Route exact path="/" component={Landing} />
            <Route exact path="/public/movies" component={MovieView} />
            <Route exact path="/movie-details/:movie_id" component={MovieDetails} />
            <Secure />
          </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
