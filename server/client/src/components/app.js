import React, { Component } from 'react';
import {NavLink, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Secure from './Secure';
import MovieView from './MovieHall/MovieView';
import '../app.css';

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
            <NavLink to="" className="navLink"> Offers </NavLink> |
              <NavLink to="" className="navLink"> Sign Out </NavLink>
            </div>
          </div>

        </div>
      
          <div >
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/public/movies" component={MovieView} />
            <Secure />
          </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
