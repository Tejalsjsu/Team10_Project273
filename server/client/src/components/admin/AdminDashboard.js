import React from "react";
import {bindActionCreators} from 'redux'
import { NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as getData from '../../actions/adminActions';
import * as getMoviesData from '../../actions/moviesActions';
import {adminData} from "../../reducers/adminReducer";
import {moviesData} from "../../reducers/moviesReducer";
import {AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Legend} from 'recharts';

class AdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dMessage: "",
            uMessage: "",
            defaultMovie: "A quite place"
        };
    };

    componentDidMount(){
        let initialMovies = [];

        this.props.getMovies().then(
            (data) => {

                console.log("after getMovies props",this.props.moviesData.data.moviesList);
                console.log("after getMovies moviesdata",this.props.moviesData);

                initialMovies = this.props.moviesData.data.moviesList.map((movie) => {
                    return movie
                });
                this.setState({
                    fms: initialMovies
                });
            },
            (err) => {
                console.log("inside err");
            });
    }

    componentWillMount(){
        this.props.getTop10MovieRevenues().then(
            (data) => {
                console.log("after getTop10MovieRevenues",this.props.adminData.data.top10_movie_revenues);
                this.setState({
                    top10_movie_revenues: this.props.adminData.data.top10_movie_revenues
                });
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getCityWiseRevenuePerYearForMovie('1').then(
            (data) => {
                console.log("after getCityWiseRevenuePerYearForMovie",this.props.adminData.data.citywise_revenue_peryear_for_movie);
                this.setState({
                    citywise_revenue_peryear_for_movie: this.props.adminData.data.citywise_revenue_peryear_for_movie
                });
            },
            (err) => {
                console.log("inside err here");
            });

        this.props.getTop10HallsWithMaxRevenue().then(
            (data) => {
                console.log("after getTop10HallsWithMaxRevenue",this.props.adminData.data.top10_halls_with_max_revenue);
                this.setState({
                    top10_halls_with_max_revenue: this.props.adminData.data.top10_halls_with_max_revenue
                });
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getPageClicks().then(
            (data) => {
                console.log("after getPageClicks",this.props.adminData.data.pageClicks);
                var pageClicksArray = [];
                var obj = {name : "Login", value : this.props.adminData.data.pageClicks.Login}
                pageClicksArray[0] = obj;
                obj = {name : "Signup", value : this.props.adminData.data.pageClicks.Signup}
                pageClicksArray[1] = obj;
                obj = {name : "Home", value : this.props.adminData.data.pageClicks.Home}
                pageClicksArray[2] = obj;
                obj = {name : "Landing", value : this.props.adminData.data.pageClicks.Landing}
                pageClicksArray[3] = obj;
                obj = {name : "Dashboard", value : this.props.adminData.data.pageClicks.Dashboard}
                pageClicksArray[4] = obj;
                obj = {name : "MovieDetails", value : this.props.adminData.data.pageClicks.MovieDetails}
                pageClicksArray[5] = obj;
                obj = {name : "Bills", value : this.props.adminData.data.pageClicks.Bills}
                pageClicksArray[6] = obj;
                obj = {name : "BillDetails", value : this.props.adminData.data.pageClicks.BillDetails}
                pageClicksArray[7] = obj;

                this.setState({
                    pageClicksArray: pageClicksArray
                });
                console.log("pageClicksArray",pageClicksArray);
                console.log("this.props.adminData.data.pageClicks",this.state.pageClicksArray);
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getMovieClicks().then(
            (data) => {
                console.log("after getMovieClicks",this.props.adminData.data.movieClicks);
                var movieClickArray = [];
                for(var i=0; i<this.props.adminData.data.movieClicks.length; i++){
                    var obj = {name:this.props.adminData.data.movieClicks[i].title,value:this.props.adminData.data.movieClicks[i].clicks}
                    movieClickArray.push(obj);
                }
                console.log("movieClickArray",movieClickArray);
                this.setState({
                    movieClicks: movieClickArray
                });
                console.log("this.props.adminData.data.movieClicks",this.state.movieClicks);
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getReviewsOnMovies(this.state).then(
            (data) => {
                console.log("after getReviewsOnMovies",this.props.adminData.data.reviewsOnMovies);
                var reviewData = this.props.adminData.data.reviewsOnMovies;
                var reviewArray = [];
                for(var i=0; i<reviewData.length; i++){
                    var obj = {name:reviewData[i].title,value:reviewData[i].avgRating}
                    reviewArray.push(obj);
                }
                console.log("reviews-------------------",reviewArray);
                //var revM = [{name:"A quite place",value:3.4},{name:"Deadpool",value:4},{name:"JP",value:2.2}];
                this.setState({
                    reviewsOnMovies: reviewArray
                });
                console.log("reviewsOnMovies",this.state.reviewsOnMovies);
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getMovies().then(
            (data) => {

                console.log("after getMovies props",this.props.moviesData.data.moviesList);
                console.log("after getMovies moviesdata",this.props.moviesData);
                this.setState({
                    moviesList: this.props.moviesData.data.moviesList
                });
            },
            (err) => {
                console.log("inside err");
            });

        /*this.props.getTop10MovieRevenues(this.state).then(
            (data) => {
                console.log("after getTop10MovieRevenues",this.props.adminData.data.top10_movie_revenues);
                this.setState({
                    top10_movie_revenues: this.props.adminData.data.top10_movie_revenues
                });
                console.log("this.props.adminData.data.top10_movie_revenues",this.state.top10_movie_revenues);
            },
            (err) => {
                console.log("inside err");
            });

        this.props.getTop10MovieRevenues(this.state).then(
            (data) => {
                console.log("after getTop10MovieRevenues",this.props.adminData.data.top10_movie_revenues);
                this.setState({
                    top10_movie_revenues: this.props.adminData.data.top10_movie_revenues
                });
                console.log("this.props.adminData.data.top10_movie_revenues",this.state.top10_movie_revenues);
            },
            (err) => {
                console.log("inside err");
            });*/

    }

    checkMovie(e){
        console.log("inside checkMovie",e.target.value);
        this.props.getCityWiseRevenuePerYearForMovie(e.target.value).then(
            (data) => {
                console.log("after getCityWiseRevenuePerYearForMovie",this.props.adminData.data.citywise_revenue_peryear_for_movie);
                this.setState({
                    citywise_revenue_peryear_for_movie: this.props.adminData.data.citywise_revenue_peryear_for_movie
                });
            },
            (err) => {
                console.log("inside err");
            });

    }

    render() {
        const data = [
            {text: 'Man', value: 300},
            {text: 'Woman', value: 100},
            {text: 'ChildMan', value: 50},
            {text: 'ChildWoman', value: 75}
        ];
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        console.log("state : ", this.state);
        const getOptions = this.state.movieList;

        let mm = this.state.fms;
        let optionItems = mm && mm.map((mv) =>
            <option key={mv.movie_id}>{mv.title}</option>
        );

        return(
            <div>
                <br/><br/>
                {/*<div className="page-header-container">*/}
                    {/*<div className="row">*/}
                        {/*<nav className="page-navigation">*/}
                            {/*<ul className="page-navigation-list">*/}
                                {/*<li><NavLink className="page-navigation-link" to="/User/EditProfile"> Upload Movie </NavLink> </li>*/}
                            {/*</ul>*/}
                            {/*<ul className="page-navigation-list">*/}
                                {/*<li><NavLink className="page-navigation-link" to="">  Edit Movie Hall </NavLink> </li>*/}
                            {/*</ul>*/}
                            {/*<ul className="page-navigation-list">*/}
                                {/*<li><NavLink className="page-navigation-link" to="">  Edit Movie Hall </NavLink> </li>*/}
                            {/*</ul>*/}
                            {/*<ul className="page-navigation-list">*/}
                                {/*<li><NavLink className="page-navigation-link" to="">  Purchase History </NavLink> </li>*/}
                            {/*</ul>*/}
                        {/*</nav>*/}
                    {/*</div>*/}
                {/*</div>*/}

                <div className="dashboard-row1 maxwidth row">
                    <h1 className='panel-group-head-profile'> Admin Dashboard </h1> <hr/>
                    {/*Retrieve data from database and show first 10 movies with its revenue/year*/}
                    <div className="col-sm-4 dashboard-row1 ">

                        <h4><b>Top 10 movies with its revenue/year - 2018</b></h4>
                        <br/><br/>
                        <BarChart width={400} height={200} data={this.state.top10_movie_revenues}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="title"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="totalRevenue" fill="#FFA500" />
                        </BarChart>
                    </div>

                    <div className="col-sm-4 dashboard-row1 ">
                        <h4><b>City wise revenue/year - 2018</b></h4>
                        <br/>
                        Select Movie
                        <select onChange={this.checkMovie.bind(this)}>
                            {optionItems}
                        </select> <br/><br/>


                        <BarChart width={300} height={200} data={this.state.citywise_revenue_peryear_for_movie}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="city"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="totalRevenue" fill="#8884d8" />
                        </BarChart>
                    </div>

                    <div className="col-sm-4 dashboard-row1 ">
                        <h4><b>Top 10 halls with maximum revenue/year - 2018</b></h4>
                        <br/><br/>
                        <LineChart width={500} height={300} data={this.state.top10_halls_with_max_revenue}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="hallName"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" activeDot={{r: 8}}/>
                        </LineChart>
                    </div>
                </div>

                {/*<p>-----</p>*/}
                <hr/>

                <div className="dashboard-row1 row">
                    <div className="col-sm-4 ">
                        <div className="dashboard-row1 ">
                            <h4><b>Reviews for Movies - 2018</b></h4>
                            <br/><br/>
                            <PieChart width={800} height={300}>
                                <Pie data={this.state.reviewsOnMovies} cx={150} cy={150} innerRadius={50} outerRadius={90} fill="#82ca9d" label/>
                            </PieChart>
                            {/*<br/><br/>*/}
                            <div margin-left>{this.state.reviewsOnMovies && this.state.reviewsOnMovies.map((reviews,i) =>
                                <h5 key={i}>
                                    <div>{reviews.name} : {reviews.value}</div>
                                </h5>)}
                            </div>

                            <br/>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <h4><b>page clicks - 2018</b></h4>
                        <br/><br/>
                        <PieChart width={800} height={300}>
                            <Pie data={this.state.pageClicksArray} cx={150} cy={150} innerRadius={50} outerRadius={90} fill="#82ca9d" label/>
                        </PieChart>
                        {this.state.pageClicksArray && this.state.pageClicksArray.map((page,i) =>
                            <h5 key={i}>
                                <div>{page.name} : {page.value}</div>
                            </h5>)}

                    </div>

                    <div className="col-sm-4 ">
                        <h4><b>movies clicks - 2018</b></h4>
                        <br/>
                        <PieChart width={800} height={300}>
                            <Pie data={this.state.movieClicks} cx={150} cy={150} innerRadius={50} outerRadius={90} fill="#8884d8" label/>
                        </PieChart>
                        {this.state.movieClicks && this.state.movieClicks.map((mv,i) =>
                            <h5 key={i}>
                                <div>{mv.name} : {mv.value}</div>
                            </h5>)}
                        <br/><br/>

                    </div>

                </div>



                <br/>
                <hr/>
                <br/>

                <div className="dashboard-row1 row">
                    <div className="col-sm-8">
                        <h4><b>Area wise graph- 2018</b></h4>
                        <br/><br/>
                        <AreaChart width={700} height={300} data={this.state.pageClicksArray}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type='monotone' dataKey='value' stackId="1" stroke='#F4A460' fill='#F4A460' />
                        </AreaChart>
                    </div>
                    <div className="col-sm-4">
                        <h4><b>User Flow diagram city wise - 2018</b></h4>
                        <br/>
                        <div>
                            <br/><h4>San Jose city :</h4><br/><br/>
                            <b>----></b>HOME<b>----></b>MOVIE<b>----></b>BOOK<b>----></b>LOGIN<b>----></b>PAYMENT<b>----></b>LOGOUT
                            <br/>San Clara city :<br/><br/>
                            <b>----></b>HOME<b>----></b>MOVIE<b>----></b>BOOK<b>----></b>LOGIN<b>----></b>PAYMENT<b>----></b>LOGOUT
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        adminData : state.admin,
        moviesData : state.movies
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, getData, getMoviesData), dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);