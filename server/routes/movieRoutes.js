var mysql = require('./mysql');

module.exports = app => {
  app.get('/api/movie/locations/:id', async (req, res) => {
    var movieid = req.params.id;
    console.log(movieid);
    const sql =
      'SELECT * FROM fandango.HallMovieRelation ' +
      'LEFT JOIN fandango.MovieHall on ' +
      'fandango.HallMovieRelation.hallId = fandango.MovieHall.hallId' +
      ' LEFT join fandango.Movies on fandango.HallMovieRelation.movieId = fandango.Movies.movieId ' +
      'WHERE fandango.Movies.movieId=' +
      movieid;

    mysql.fetchData(function(error, results) {
      if (error) {
        console.log(error);
        res.status(401).send({ message: 'Error getting All Locations' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });

  //Return all Movies
  app.get('/api/getMovies', (req, res) => {
    console.log('Here for movies');
    const sql = 'SELECT * FROM Movies';
    mysql.fetchData(function(error, results) {
      if (error) {
        res.status(401).send({ message: 'Error getting All Movies' });
        return;
      } else {
        res.status(200).send(results);
      }
    }, sql);
  });
};
