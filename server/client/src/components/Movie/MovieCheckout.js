import React, { Component } from 'react';
import { connect } from 'react-redux';
import Payments from '../Payment/Payments';
import { Link } from 'react-router-dom';
class MovieCheckout extends Component {
  render() {
    return (
      <div className="container">
        <Payments />
        <Link to="/" className="btn btn-warning">
          Cancel
        </Link>
      </div>
    );
  }
}
export default MovieCheckout;
