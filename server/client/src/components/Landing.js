import React from 'react';

class Landing extends React.Component {
  renderAdvertisement() {
    const styles = {
      height: '170px'
    }

    return (


      <div className="container">
        <h1 className="my-4 text-center text-lg-left">Offers</h1>

        <div className="row text-center text-lg-left">
          <div className="col-lg-3 col-md-4 col-xs-6">
            <img
              style={styles}
              className="img-fluid img-thumbnail"
              src="http://hunt4freebies.com/wp-content/uploads/2011/03/Hollywood-Insider.png"
              alt="Popcorn add"
            />
          </div>
          <div className="col-lg-3 col-md-4 col-xs-6">
            <img
              style={styles}
              className="img-fluid img-thumbnail"
              src="http://www.documatics.com/wp-content/uploads/2017/06/hiring.jpeg"
              alt=""
            />
          </div>
          <div className="col-lg-3 col-md-4 col-xs-6">
            <img
              style={styles}
              className="img-fluid img-thumbnail"
              src="https://www.solocamion.es/wp-content/uploads/2017/12/coca-cola-truck.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }

  renderMoviesComingSoon() {
    return (
      <div className="container">
        <h1 className="my-4 text-center text-lg-left">Movies Coming Soon</h1>

        <div className="row text-center text-lg-left">
          <div className="col-lg-3 col-md-4 col-xs-6">
            <a href="#" className="d-block mb-4 h-100">
              <img
                className="img-fluid img-thumbnail"
                src="http://placehold.it/400x300"
                alt="Image"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
  renderMoviesNowPlaying() {
    return (
      <div className="container">
        <h1 className="my-4 text-center text-lg-left">Movies Now Playing</h1>

        <div className="row text-center text-lg-left">
          <div className="col-lg-3 col-md-4 col-xs-6">
            <a href="#" className="d-block mb-4 h-100">
              <img
                className="img-fluid img-thumbnail"
                src="http://placehold.it/400x300"
                alt="Image"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const styles = {
      width: '100%',
      height: '500px'
    };
    return (
        <div className="row">

      <div className="container-fluid">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            />
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

        {this.renderMoviesNowPlaying()}
        {this.renderMoviesComingSoon()}
        {this.renderAdvertisement()}
        <br />
      </div>
      </div>
    );
  }
}
export default Landing;
