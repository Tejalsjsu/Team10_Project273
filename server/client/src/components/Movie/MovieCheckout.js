import React, { Component } from 'react';
import { connect } from 'react-redux';
import Payments from '../Payment/Payments';
import { Link } from 'react-router-dom';

require('../../css/movie_checkout.css');

class MovieCheckout extends Component {
  render() {
    return (
      <div className="container" style={{ background: 'black' }}>
        <div className="row">
          <div className="main">
            <div className="module-standard">
              <h3>HOW MANY TICKETS?</h3>
              <h6>You can request up to 5 reserved seats per transaction.</h6>
              General <input type="number" name="quantity" min="1" max="5" />
            </div>
          </div>
        </div>
        <Payments />
        <Link to="/" className="btn btn-warning">
          Cancel
        </Link>
      </div>
    );
  }
}
export default MovieCheckout;
