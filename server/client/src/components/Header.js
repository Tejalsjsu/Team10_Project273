import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payment/Payments';
class Header extends Component {
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google"> Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    var styles = {
      color: 'green'
    };
    var style1 = {
      color: 'lightblue'
    };
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div>
            <div className="navbar-header navbar-inverse">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link
                to={this.props.auth ? '/secure/dashboard' : '/'}
                className="navbar-brand"
                to="/"
              >
                <span style={styles}>Movie</span>
                <span style={style1}>Time</span>
              </Link>
            </div>
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/ViewNewMovies">New Movies</Link>
                </li>
                <li>
                  <Link to="/secure/movieUpload">Upload Movie</Link>
                </li>
				<li>
				{/*if user is admin then show this link*/}
                  <Link to="/addMovieHall">Add Movie Hall</Link>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <ul className="nav navbar-nav navbar-right">
                    {this.renderContent()}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
