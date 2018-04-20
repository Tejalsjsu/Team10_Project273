import React from 'react';
import * as moviesDetails from "../actions/moviesActions";
import {moviesData} from "../reducers/moviesReducer";
import {bindActionCreators} from 'redux';
import '../App.css';
import {connect} from "react-redux";
import {Redirect,withRouter} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class MovieDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            title:"",
            trailer_link:"",
            release_date:"",
            movie_characters:"",
            see_it_in:"",
            genre:"",
            movie_length:""
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData){
            if(nextProps.moviesData.data){
                this.setState ({
                    moviesList : nextProps.moviesData.data.moviesList,
                    hallsList : nextProps.moviesData.data.hallsList,
                    genreList : nextProps.moviesData.data.genreList,
                    moviesListBck : nextProps.moviesData.data.moviesList,
                    hallsListBck : nextProps.moviesData.data.hallsList
                });

                console.log(JSON.stringify(nextProps.moviesData.data));
                let price_list = [], price;
                for(let i=0;i<nextProps.moviesData.data.hallsList.length;i++){
                    price = nextProps.moviesData.data.hallsList[i].ticket_price;
                    if(price_list.indexOf(price)== -1) {
                        price_list.push(price);
                    }
                }
                this.setState({
                    priceList : price_list
                });
            }
        }
    }

    componentWillMount(){
        this.props.getMovies();
        this.props.getHalls();
        this.props.getGenreList();
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            release_date: date
        });
    }

    addMovie(){
        this.props.addMovie(this.state);
    }


    render() {
        return (
            <div className="container-fluid">
                <input
                    placeholder="Enter Movie Name"
                    type="text"
                    required
                    label=""
                    name="title"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    placeholder="Add Trailer Link"
                    type="url"
                    required
                    label=""
                    name="trailer_link"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    placeholder="Add Movie Characters seperated by comma"
                    type="text"
                    required
                    label=""
                    name="movie_characters"
                    onChange={this.onChange.bind(this)}
                />
                <div>
                    <h4>Release Date</h4>
                    <DatePicker  required
                                 selected={this.state.release_date}
                                 onChange={this.handleDateChange.bind(this)}
                    />
                </div>
                <input
                    placeholder="Add Movie Length"
                    type="text"
                    required
                    label=""
                    name="movie_length"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    placeholder="See it in"
                    type="text"
                    required
                    label=""
                    name="see_it_in"
                    onChange={this.onChange.bind(this)}
                />
                <input
                    placeholder="Add Genre"
                    type="text"
                    required
                    label=""
                    name="genre"
                    onChange={this.onChange.bind(this)}
                />
                <button onClick={this.addMovie.bind(this)}>Add Movie</button>

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        moviesData : state.movies
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, moviesDetails),dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(MovieDetails);
//export default Landing;