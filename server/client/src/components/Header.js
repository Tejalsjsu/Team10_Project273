import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fandango from '../fandango-LOGO3.svg';
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
        <div>

            <div className="App-header header-border">
                <Link
                    to={this.props.auth ? '/secure/dashboard' : '/'}
                    to="/"
                ><img src={fandango} className="App-logo" alt="logo" /></Link>


            <ul className="nav navbar-nav">
                <li>
                    <Link to="/ViewNewMovies">New Movies</Link>
                </li>
                <li>
                    <Link to="/secure/movieUpload">Upload Movie</Link>
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
          );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
