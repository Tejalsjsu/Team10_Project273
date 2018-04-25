import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Secure from './Secure';
import MovieView from './MovieHall/MovieView';
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
			<Route exact path="/addMovieHall" component={Admin} />
              <Route exact path="/adminDasboard" component={AdminDashboard} />
            <Secure />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
