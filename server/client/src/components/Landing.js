import React from 'react';
import { fetchMovies } from '../actions';
import { connect } from 'react-redux';

import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';

class Landing extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }
  renderMoviesComingSoon() {
    const newArray = _.values(this.props.movies);
    return _.filter(newArray, movie => {
      return movie.playing_type === 0;
    }).map(movie => {
      return (
        <div className="col-sm-3" key={movie.movieId}>
          <div className="card">
            <div className="card-body">
              <h5 align="center" className="card-title">
                {movie.title}
              </h5>
              <Link to={'/public/moviedetail/' + movie.movieId}>
                <img
                  className="img-fluid img-thumbnail"
                  src={movie.photosUrl}
                  alt="http://placehold.it/400x300"
                  style={{
                    width: '210px',
                    height: '250px'
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  renderMoviesNowPlaying() {
    const newArray = _.values(this.props.movies);
    return _.filter(newArray, movie => {
      return movie.playing_type === 1;
    }).map(movie => {
      return (
        <div className="col-sm-3" key={movie.movieId}>
          <div className="card">
            <div className="card-body">
              <h5 align="center" className="card-title">
                {movie.title}
              </h5>
              <Link to={'/public/moviedetail/' + movie.movieId}>
                <img
                  className="img-fluid img-thumbnail"
                  src={movie.photosUrl}
                  alt="http://placehold.it/400x300"
                  style={{
                    width: '210px',
                    height: '250px'
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  renderCouresel() {
    const styles = {
      width: '100%',
      height: '500px'
    };
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active" />
          <li data-target="#myCarousel" data-slide-to="1" />
          <li data-target="#myCarousel" data-slide-to="2" />
        </ol>

        <div className="carousel-inner">
          <div className="item active">
            <img
              src="http://www.etimesnow.com/wp-content/uploads/2016/04/deadpool-2.jpg"
              alt="Dead Pool"
              style={styles}
            />
          </div>

          <div className="item">
            <img
              src="https://boygeniusreport.files.wordpress.com/2017/12/guardians-of-the-galaxy-vol-2.jpg?quality=98&strip=all&w=1564"
              alt="Black Panther"
              style={styles}
            />
          </div>

          <div className="item">
            <img
              src="https://revengeofthefans.com/wp-content/uploads/2018/03/Avengers-Infinity-War-poster.jpg"
              alt="Avengers"
              style={styles}
            />
          </div>
        </div>

        <a
          className="left carousel-control"
          href="#myCarousel"
          data-slide="prev"
        >
          <span className="glyphicon glyphicon-chevron-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control"
          href="#myCarousel"
          data-slide="next"
        >
          <span className="glyphicon glyphicon-chevron-right" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ background: 'black', color: 'white' }}
      >
        <br />
        {this.renderCouresel()}
        <br />
        <div className="container">
          <h1 className="my-4 text-center text-lg-left">Movies Now Playing</h1>
          <br />
          {this.renderMoviesNowPlaying()}
        </div>
        <br />
        <br />
        <div className="container">
          <h1 className="my-4 text-center text-lg-left">Movies Coming Soon</h1>
          <div className="row">
            <br />
            {this.renderMoviesComingSoon()}
          </div>
        </div>
        <br />
      </div>
    );
  }
}
function mapStateToProps({ movies }) {
  return { movies };
}
export default connect(mapStateToProps, { fetchMovies })(withRouter(Landing));
