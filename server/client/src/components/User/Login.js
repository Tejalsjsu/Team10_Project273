import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import cookie from 'react-cookies';
import {connect} from "react-redux";
import {userDetails} from "../../reducers/userReducer";
import {verifyLogin} from "../../actions/userActions";
import {bindActionCreators} from "redux";
let logo = require('../../images/login-logo.png');
let google = require('../../images/google.png');


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userdata: {
                password: '',
                email: '',
                token:'',
                userId:''
            },
            isLoggedIn: false,
            validation_error: [],
            message: ''
        };
    }

    handleLogin(){
      let errors = [];
      let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(this.state.userdata.email.length === 0){
           errors.push("Kindly enter email");
       } else if (!email_regex.test(this.state.userdata.email)){
           errors.push("Invalid Email");
       }
       if(this.state.userdata.password.length === 0){
             errors.push("Kindly enter a password");
       }


        if(errors.length === 0) {
          //Check in database
          this.props.verifyLogin(this.state.userdata).then(
              (response) => {
               //   let strResponse = JSON.stringify(response);
                  //console.log("In success login out " +strResponse);
              if(response.data.status === '201'){
                  console.log(response.data.userId);
                  this.setState({
                      message: response.data.message

                  });

                  cookie.save('userId', response.data.userId, { path: '/' });
                  if(response.data.isAdmin == 1){
                    cookie.save('isAdmin', 'true', { path: '/' });}
                  else{
                      cookie.save('isAdmin', 'false', { path: '/' });
                  }
                  console.log("isAdmin " +cookie.load('isAdmin'));
                  this.props.history.push("/User/EditProfile");
              }
          },
         (err) => {
           console.log(err);
           this.setState({
             message: "Could not Login. Please try again"
           })
         });
        }else{
          this.setState ({
                validation_error: errors
            })
        }

    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.userDetails){
            this.setState({
                message : nextProps.userDetails
            });
        }
    }

    render(){
        return(

            <div className="errors">
            <div className="errors container">
                {/*<div className="col-md-3">*/}
                {this.state.validation_error && (
                    <div>
                        {this.state.validation_error.map((item,index)=><div key={index} className="alert alert-danger" role="alert">{item}</div>)}
                    </div>
                )}

                <div >
                    {/*<div className="col-md-3">*/}
                    {this.state.message && (
                        <div className="alert alert-warning" role="alert">
                            {this.state.message}
                        </div>
                    )}
                    {/*</div>*/}
                </div>
                {/*</div>*/}
            </div>
            <div className="login-div">
              <div className="registration">
                <div className="row comnntainer">


                  <div className="login-col panel">
                    <div className="sub-panel ">
                    <div className="p-buttom">
                      <img src={logo} alt="logo" className="login-img"></img>
                    </div>
                    <div className="p-buttom"> Email Address </div>
                    <input type="email" className="form-control p-top" placeholder="Enter email" value={this.state.userdata.email}

                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               email: event.target.value
                                           }
                                       });
                                   }}/> <br/>
                            <div className="p-buttom"> Password </div>
                            <input type="password" className="form-control p-top" placeholder="Enter Password" value={this.state.userdata.password}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               password: event.target.value
                                           }
                                       });
                                   }}/><br/>
                                   <div className="p-buttom p-top">
                            <Button bsStyle="success" bsSize="sm" block onClick={()=>this.handleLogin()}> Login </Button>
                            </div>
                            <hr/>
                            <div className="p-buttom">
                               <a href="/auth/google"> <img src={google} alt="logo" className="google-img"></img></a>
                              <br/>


                            </div>
                            Not a member yet?? <a href="/Signup"> Signup Now!! </a><br/><br/><br/><br/><br/>

                    </div>

                  </div>
                </div>
              </div>
            </div>
            </div>
            )
          }
        }

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps, {verifyLogin})(withRouter(Login));
