import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        description: '',
        photoUrl: '',
        trailer: '',
        title: '',
        genre: '',
        movieLengthInMin: ''
      }
    };
  }
  componentDidMount() {
    const newArray = _.values(this.props.movies);
    return _.filter(newArray, movie => {
      console.log(movie.movieId, this.props.match.params.movieId);
      return movie.movieId == this.props.match.params.movieId;
    }).map(movie => {
      console.log(movie);

      this.setState({
        movie: {
          title: movie.title,
          photoUrl: movie.photosUrl,
          description: movie.description,
          trailer: movie.trailerLink,
          genre: movie.genre,
          movieLengthInMin: movie.movieLengthInMin
        }
      });
    });
    console.log('here', this.state.movie);
  }
  render() {
    return (
      <div className="container " style={{ background: 'black' }}>
        <main className="content">
          <div className="single">
            <section className="trailer">
              <h3>Trailer</h3>
              <div className="trailer_frame">
                <iframe
                  width="560"
                  height="315"
                  src={this.state.movie.trailer}
                  frameborder="0"
                  allowfullscreen
                />
              </div>
            </section>

            <section className="movie">
              <img
                src={this.state.movie.photoUrl}
                style={{ height: '170px' }}
              />

              <ul>
                <li>{this.state.movie.title}</li>
                <li>{this.state.movie.description}</li>
                <li>Genre: {this.state.movie.genre}</li>
                <li>Length: {this.state.movie.movieLengthInMin}mins</li>
              </ul>
            </section>
            <section className="links">
              <h3>Get the tickets</h3>
              <ul className="dlinks">
                <li>
                  <Link
                    to={
                      '/public/movieLocations/' +
                      this.props.match.params.movieId
                    }
                  >
                    Tickets and locations
                  </Link>
                </li>
              </ul>
            </section>

            <section className="comments">
              <h3>Comments</h3>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
function mapStateToProps({ movies }) {
  console.log('Here in movie Detail', movies);
  return { movies };
}
export default connect(mapStateToProps)(MovieDetail);
