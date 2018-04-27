import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchLocations } from '../../actions/moviesActions';

require('../../css/movie_detail.css');

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
      var counter = 0;
      return _.map(mtime, time => {
        return (
          <li className="theater-btn-list-item" key={++counter}>
            <Link
              to={
                '/public/checkout/' +
                this.props.match.params.movieId +
                '/' +
                hallId
              }
              className="btn btn-warning showtime-btn"
            >
              {time}
            </Link>
          </li>
        );
      });
    }
  }
  renderLocations() {
    const newArray = _.values(this.props.movies);
    var counter = 0;
    return _.map(newArray[0], location => {
      return (
        <div className="theatre-showtimes" key={++counter}>
          <section className="theaters">
            <div className="theater-wrap">
              <div className="theater-header">
                <div className="theatre-name-wrap">
                  <h3 className="theater-name font-sans-serif font-lg font-300 uppercase">
                    {location.hallName}
                  </h3>
                </div>
                <div className="theater-address-wrap">
                  {location.city}, {location.state},
                  {location.zipcode}
                </div>
              </div>

              <ul className="theater-showtimes font-sans-serif-alt">
                <li className="theater-showtimes-variant theater-showtimes-variant-last-li">
                  <span style={{ color: 'black' }}>
                    Select a movie time to buy the tickets in {location.seeItIn}{' '}
                    Showtimes
                  </span>

                  <ol className="threater-btn-list">
                    {this.renderTime(location.movieTimes, location.hallId)}
                  </ol>
                </li>
              </ul>
            </div>
          </section>
        </div>
      );
    });
  }
  render() {
    var movies = this.props.movies.data;
    return (
      <div
        className="container"
        style={{ background: 'black', color: 'white' }}
      >
        <div className="movie-checkout-container">
          {movies.length != undefined ? (
            <section className="movie-details">
              <a href="#" className="movie-detail-mop-link">
                <img
                  className="movie-details-img visual-thumb"
                  src={movies[0].photosUrl}
                />
              </a>
              <ul className="movie-detail-details">
                <li style={{ color: 'white' }}> {movies[0].title}</li>
                <li>{movies[0].genre}</li>
                <li>Age Limit: {movies[0].minimumAge}+</li>
                <li>{movies[0].movieLengthInMin}mins</li>
              </ul>
            </section>
          ) : (
            ''
          )}
        </div>

        <div className="float-right">{this.renderLocations()}</div>
      </div>
    );
  }
}

function mapStateToProps({ movies }) {
  return { movies };
}
export default connect(mapStateToProps, { fetchLocations })(MovieLocations);
