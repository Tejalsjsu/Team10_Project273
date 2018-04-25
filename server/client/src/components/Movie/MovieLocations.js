import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchLocations } from '../../actions/movieAction';
class MovieLocations extends Component {
  componentDidMount() {
    var value = this.props.match.params.movieId;
    this.props.fetchLocations(value);
  }
  renderMovie() {
    return <div>Movie</div>;
  }
  renderTime(movieTimes, hallId) {
    if (movieTimes) {
      var mtime = movieTimes.split('|');
      return _.map(mtime, time => {
        return (
          <Link
            to={
              '/public/checkout/' +
              this.props.match.params.movieId +
              '/' +
              hallId
            }
            className="btn btn-info"
          >
            {time}
          </Link>
        );
      });
    }
  }
  renderLocations() {
    const newArray = _.values(this.props.movies);

    return _.map(newArray, location => {
      return (
        <div className="card">
          <div className="card-MovieView">{location.hallName}</div>
          <div className="card-body">
            <h5 className="card-title">
              {location.city}, {location.state},
              {location.zipcode}
            </h5>

            {this.renderTime(location.movieTimes, location.hallId)}
          </div>
          <br />
        </div>
      );
    });
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ background: 'black', color: 'white' }}
      >
        <div className="float-right">{this.renderLocations()}</div>
        <div
          className="card text-white bg-warning mb-3"
          style={{ maxWidth: '18rem' }}
        >
          <div className="card-header">Header</div>
          <div className="card-body">
            <h5 className="card-title">Warning card title</h5>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ movies }) {
  console.log('moive', movies);

  return { movies };
}
export default connect(mapStateToProps, { fetchLocations })(MovieLocations);
