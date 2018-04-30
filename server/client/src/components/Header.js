import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, Link } from 'react-router-dom';
import Payments from './Payment/Payments';
import cookie from "react-cookies";
import {logout, verifyLogin} from '../actions/userActions';
let logo = require('../images/logo-1.png');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: cookie.load('userId'),
            isAdmin: cookie.load('isAdmin')
        }
    }

     componentWillMount(){
         this.setState = {
             userId: cookie.load('userId'),
             isAdmin: cookie.load('isAdmin')
         }
     }

    handleSignout(){
        let userId = cookie.load('userId');
        this.props.logout(userId)
            .then((res) => {
                console.log("status logout client" +JSON.stringify(res));
                if (res.data.status === '201') {
                    console.log("success full Log out");
                    cookie.remove('userId');
                    cookie.remove('isAdmin');
                    this.props.history.push('/Landing');
                } else {
                    cookie.remove('userId');
                    cookie.remove('isAdmin')
                    this.props.history.push('/Login');
                }
            });
    }

    renderLogin(){
        // console.log("is Signed in" +this.state.userId);
        if(this.state.userId == undefined || this.state.userId == '')
            return(
                <NavLink to="/User/Login" className="navLink"> Login </NavLink>
            )
        else
            return(
                <NavLink to="" className="navLink" onClick={this.handleSignout()}> Sign Out </NavLink>
            )
    }
  renderContent() {
    console.log(this.props.auth);
    console.log("isAdmin " +this.state.isAdmin);
    switch (this.state.isAdmin) {
      case null:
          return(
          <ul className="global-menu nav navbar-nav">
              <li className="global-menu-li">
                  <NavLink to="/addMovieHall" className="global-menu-li navLink">Book Movies</NavLink>
              </li>
              <li className="global-menu-li">
                  <NavLink to="/sudMovieHall" className="global-menu-li navLink">New Movies</NavLink>
              </li>
          </ul>
          );
      case false:
        return (

            <NavLink to="/User/Login" className="global-menu-li navLink">Login</NavLink>
          /*<li>
            <a href="/auth/google"> Login With Google</a>
          </li>*/
        );
        case 'true':
            return(
                <ul className="global-menu nav navbar-nav">
                    <li className="global-menu-li">
                        <NavLink to="/adminDasboard" className="global-menu-li navLink">Dashboard</NavLink>
                    </li>
                    <li className="global-menu-li">
                        <NavLink to="/addMovieHall" className="global-menu-li navLink">Add Movie Hall</NavLink>
                    </li>
                    <li className="global-menu-li">
                        <NavLink to="/sudMovieHall" className="global-menu-li navLink">Modify Movie Hall</NavLink>
                    </li>
                    <li className="global-menu-li">
                        <NavLink to="/ViewNewMovies" className="global-menu-li navLink">New Movies</NavLink>
                    </li>
                    <li className="global-menu-li">
                        <NavLink to="/secure/movieUpload" className="global-menu-li navLink">Book Movies</NavLink>
                    </li>
                    <li className="global-menu-li">
                        <NavLink to="/User/EditProfile" className="global-menu-li navLink">Purchase History</NavLink>
                    </li>
                    <li className="global-menu-li">
                        <NavLink to="/User/EditProfile" className="global-menu-li navLink">Delete User</NavLink>
                    </li>
                </ul>
            );
      default:
          return(
              <ul className="global-menu nav navbar-nav">
                  <li className="global-menu-li">
                      <NavLink to="/addMovieHall" className="global-menu-li navLink">Book Movies</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/sudMovieHall" className="global-menu-li navLink">New Movies</NavLink>
                  </li>
              </ul>
          );
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

              {/*<Link to={this.props.auth ? '/secure/dashboard' : '/'}*/}
                {/*className="navbar-brand" to="/">*/}
                {/*<span style={styles}>Movie</span>*/}
                {/*<span style={style1}>Time</span>*/}
              {/*</Link>*/}
            </div>
            <div>
                <div className="brand-bar">
                    <div className="row container">
                        <div className="width-75">
                            <div className="banner-bar bar">
                                THIS SUMMER SEE MORE, GET MORE ON FUNDANGO!!
                            </div>
                        </div>
                        <div className="width-25 right">
                            <NavLink to="" className="navLink"> Offers </NavLink> |
                            {this.renderLogin()}
                        </div>
                    </div>
                </div>
                </div>

                <div id="headerwrap">
                <div className="global-header">
                    <nav className="row">
                        <img src={logo} className="img-logo"></img>
                <div>
                    {this.renderContent()}
                </div>
                    </nav>
                </div>
            </div>

        </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps,{logout})(Header);
