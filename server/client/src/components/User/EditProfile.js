import React, {Component} from 'react';
import {Link, withRouter, Route, NavLink} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import cookie from 'react-cookies';
import {connect} from "react-redux";
import {fetchUserDetails, updateProfile} from "../../actions/userActions";

let logo = require('../../images/login-logo.png');
let google = require('../../images/google.png');
let img = require('../../images/profile2.jpg');


class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            userdata: {
                password: '',
                email: '',
                token:'',
                userId:cookie.load('userId'),
                firstName:'',
                lastName:'',
                address:'',
                zipcode:'',
                phonenumber:'',
                city:'',
                imgurl:'',
                state:''
            },
            // companies:[
            //     { name: 'company1',  jobs: ['job1-1', 'job1-2', 'job1-3']},
            //     { name: 'company2', jobs: ['job2-1', 'job2-2', 'job2-3']},
            //     { name: 'company3', jobs: ['job3-1', 'job3-2', 'job3-3']}
            // ],
            // selectedCompany: 'company1',
            isLoggedIn: false,
            status:'',
            validation_error: [],
            message: ''
        };
    }

    handleChange(e) {
        console.log(this.state)
        this.setState({selectedCompany: e.target.value})
    }

    componentWillMount(){
        console.log("Will mount");
        this.props.fetchUserDetails(this.state.userdata.userId).then((response) =>{
            console.log("Succ fetch" +JSON.stringify(response.data.imgurl));
            if(response.data.status == '201'){
                this.setState({
                    userdata: {
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        zipcode: response.data.zipcode,
                        address: response.data.address,
                        city: response.data.city,
                        state: response.data.state,
                        phonenumber: response.data.phoneNumber,
                        imgurl:response.data.imgurl
                    }
                });
            }
        })
    }


    deleteUser(){

        console.log("about to delete the user");
        this.props.deleteUser({email:this.state.email}).then((data)=>{

            if(data.status==201){
                this.props.isLoggedIn = false;
            }
        })
    }

    validateZipCode(elementValue){
        let zipCodePattern;
        console.log(elementValue);
        if (elementValue.indexOf('-') > -1)
        {
            zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
        } else {
            zipCodePattern = /^\d{5}$/;
        }

        //console.log("Zip Validation : ",zipCodePattern.test(elementValue))
        return zipCodePattern.test(elementValue);
    }

//****************************************

    validateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail))
        {
            console.log("true");
            return (true)
        }
        console.log("false");
        return (false)
    }

    //*****************************************
    telephoneCheck(str) {
        let isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str);
        return isphone;
    }


    updateUserData() {
        //validation for the zip code will come here.
        let flag = 0;
        let errors = [];
        console.log(this.state.userdata)


        if (this.state.userdata.email != "") {
            if (!this.validateEmail(this.state.userdata.email)) {
                flag = flag + 1;
                errors.push(" Email not valid ");
            }

        }
        if (this.state.userdata.zipcode != "") {
            if (!this.validateZipCode(this.state.userdata.zipcode)) {
                flag = flag + 3;
                console.log("inside zip code validation");
                errors.push("zipcode not valid");
            }
        }
        if (this.state.userdata.phonenumber != "") {
            if (!this.telephoneCheck(this.state.userdata.phonenumber)) {
                flag = flag + 5;
                errors.push("Phone number not valid");
            }
        }

        if (flag == 0) {
            console.log("About to push the data");
            console.log(this.state.userdata.imgpath);
            this.props.updateProfile(this.state.userdata).then((data) => {
                if (data.data.status == 201) {
                    console.log("Successful push");
                    this.setState({
                        message: data.data.message
                    });
                }
                else {
                    this.setState({
                        message: data.data.message
                    });
                }
            })
        }
        else{
            this.setState({
                validation_error : errors
            })
        }
    }


    //*****************************************

    handleFileUpload = (event) => {

        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        console.log("inside the upload call");
        console.log(event.target.files[0]);
        this.props.upload(payload).then((data)=>{
            if(data.status==201){
                this.setState({imgpath:data.filename})
            }
        })
    };


    //*****************************************
    render(){
        // let company = this.state.companies.filter(company => {
        //     return company.name === this.state.selectedCompany
        // })

        return(

          <div>

          {/*<div className="page-header-container">*/}
            {/*<div className="row">*/}
            {/*<h1 className="page-header">*/}
              {/*<span>FUNDANGO</span>*/}
              {/*<span className="page-header-emphasis">VIP</span>*/}
            {/*</h1>*/}
            {/*<nav className="page-navigation">*/}
              {/*<ul className="page-navigation-list">*/}
                {/*<li><NavLink className="page-navigation-link" to="/User/EditProfile"> PROFILE </NavLink> </li>*/}
              {/*</ul>*/}
              {/*<ul className="page-navigation-list">*/}
                {/*<li><NavLink className="page-navigation-link" to="">  PURCHASE HISTORY </NavLink> </li>*/}
              {/*</ul>*/}
            {/*</nav>*/}
            {/*</div>*/}
          {/*</div>*/}
            <div className="normal">
            <div className="normal container">
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
                <div className="tab-pane fade in show active" id="profile" role="tabpanel">
                <div className="row">
                    <div className="panel-profile">
                        <div className="panel-group-profile">
                                <div className="panel-group-head-profile">BASIC Information
                                </div>
                                <hr/>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="md-form">

                                    </div></div></div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="md-form">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                        <input type="text" id="firstname" placeholder="Firstname" value={this.state.userdata.firstName}
                                               className="input-lg"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           firstName: event.target.value
                                                       }
                                                   });
                                               }}/> <br/></div>

                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <div className="md-form">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                        <input type="text" id="lastname" placeholder="Lastname" value={this.state.userdata.lastName} className="input-lg"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           lastName: event.target.value
                                                       }
                                                   });
                                               }}/> <br/> </div>
                                    </div>

                                </div>
                            </div> <br/> <br/>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="md-form">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon glyphicon-envelope"></i></span>
                                            <input type="text"  value={this.state.userdata.email} placeholder="Email" id="email" className="input-lg"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           userdata: {
                                                               ...this.state.userdata,
                                                               email: event.target.value
                                                           }
                                                       });
                                                   }}/> <br/></div>


                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <div className="md-form">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="glyphicon glyphicon-phone"></i></span>

                                        <input type="text" id="phone" placeholder="PhoneNumber" value={this.state.userdata.phonenumber}
                                               className="input-lg"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           phonenumber: event.target.value
                                                       }
                                                   });
                                               }}
                                        /></div>
                                    </div>
                                </div>
                            </div><br/> <br/>

                            <div className="row">
                                <div className="col-sm-10">
                                    <div className="md-form">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-map-marker"></i></span>
                                        <input type="text" id="address" placeholder="Street Name" value={this.state.userdata.address} className="input-lg"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           address: event.target.value
                                                       }
                                                   });
                                               }}/>
                                        </div>
                                    </div>
                                </div>
                            </div> <br/>

                            <br/>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="md-form">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-map-marker"></i></span>
                                        <input type="text" id="city" value={this.state.userdata.city} placeholder="City" className="input-lg"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           city: event.target.value
                                                       }
                                                   });
                                               }}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="md-form">
                                        <div className="input-group"> <span className="font-large font-grey">Select State: </span>
                                            {/*<span className="input-group-addon"><i className="glyphicon glyphicon-map-marker"></i></span>*/}
                                            {/*<input type="text" id="city" value={this.state.userdata.state} placeholder="State" className="input-lg"*/}
                                                   {/*onChange={(event) => {*/}
                                                       {/*this.setState({*/}
                                                           {/*userdata: {*/}
                                                               {/*...this.state.userdata,*/}
                                                               {/*state: event.target.value*/}
                                                           {/*}*/}
                                                       {/*});*/}
                                                   {/*}}/>*/}

                                            <select id="ddlState" className="input-lg"
                                                    onChange={(event) => {
                                                        this.setState({
                                                            project: {
                                                                ...this.state.userdata,
                                                                state: event.target.value
                                                            }
                                                        });
                                                    }} >
                                                <option value="AL" >AL</option>
                                                <option value="AK" >AK</option>
                                                <option value="AZ" >AZ</option>
                                                <option value="CA" >CA</option>
                                                <option value="CO" >CO</option>
                                                <option value="CT" >CT</option>
                                                <option value="DE" >DE</option>
                                                <option value="FL" >FL</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="md-form">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-map-marker"></i></span>
                                        <input type="text" id="zipcode" value={this.state.userdata.zipcode} placeholder="zipcode" className="input-lg"
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           zipcode: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>
                                </div>
                                </div>


                            </div>
                            </div> <br/>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="md-form">
                                        <div className="input-group">

                                        <div className="media-left padding-img">
                                    <img src={img} className="media-object img-square"/>
                                </div>
                                        </div></div></div>


                                <div className="col-sm-6">
                                <div className="md-form">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-camera"></i></span>
                                    <input type="file" id="uploadpic"  name="mypic" className="input-lg"
                                           onChange={(event) => {
                                               this.setState({
                                                   userdata: {
                                                       ...this.state.userdata,
                                                       imgurl: event.target.files[0].name
                                                   }
                                               });
                                           }}/>
                                    </div> </div></div> <br/>
                            </div><br/> <br/>
                        {/*<div className="row">*/}
                            {/*<div className="col-sm-10">*/}
                                {/*<div className="md-form">*/}
                                    {/*<div className="input-group">*/}
                        {/*jobs*/}
                        {/*<select className='input-form'>*/}
                            {/*{*/}

                                {/*company[0].jobs.map((job, i) => {*/}
                                    {/*return <option>{job}</option>*/}
                                {/*})*/}
                            {/*}*/}
                        {/*</select>*/}

                        {/*companies*/}
                        {/*<select value={this.state.selectedCompany} onChange={this.handleChange.bind(this)}>*/}
                            {/*{*/}
                                {/*this.state.companies.map((company, i) => {*/}
                                    {/*return <option>{company.name}</option>*/}
                                {/*})*/}
                            {/*}*/}
                        {/*</select>*/}
                                    {/*</div></div></div></div>*/}

                        <div className="row">
                                <div className="center">
                                    <button type="button" className="btn btn-light-blue" onClick={()=>this.updateUserData()}>Update Profile</button> &nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-red" onClick={()=>this.deleteUser()}>Delete Account</button>
                                </div>
                        </div> <br/> <br/>

                            </div>
                        </div>
                    </div>
                <br/> <br/><br/>
                </div>
                </div>
            )
          }
        }

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { fetchUserDetails, updateProfile })(withRouter(EditProfile));
