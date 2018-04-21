import React from "react";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as data from '../../actions/adminActions';
import {movieData} from "../../reducers/adminReducer";

//import {Link} from 'react-router-dom';

class Admin extends React.Component {
    constructor(props){
            super(props);
            this.state = {
                redirect: false,
				nScreens:0
            };
		/*this.add = this.add.bind(this);
		this.search = this.search.bind(this);
		this.update = this.update.bind(this);*/
    }

    add(){
        console.log("Add Movie Hall inside admin.js");
        
		console.log("props",this.props);
		console.log("state",this.state);
        this.props.addMovieHall(this.state);
    }

	search(e){
		console.log("Search Movie Hall inside admin.js",e.target.value);
		this.props.searchMovieHall(e.target.value);
		this.setState({
			hallName:"CineMax",
			chk1 : "9-11",
			chk2 : "11-2",
			chk3 : "2-4",
			nTickets : "4",
			nScreens : "7",
			ticketPrice : "25"
		});
	}
	
	 update(){
        console.log("Add Movie Hall inside admin.js");
        
		console.log("props",this.props);
		console.log("state",this.state);
        this.props.addMovieHall(this.state);
    }

    render(){
		const {movieData} = this.props;
        return(
            <div>
                Add Movie Hall
                <br/><br/><br/>
				Name : <input type="text" name="hallName" onChange={(e) => {this.setState({hallName:e.target.value})}}/><br/>
                <input type="checkbox" name="chk1"  onChange={(e) => {this.setState({t1:"9-11"})}}/>9-11<br/>
                <input type="checkbox" name="chk2" onChange={(e) => {this.setState({t2:"11-2"})}}/>11-2<br/>
                <input type="checkbox" name="chk3"  onChange={(e) => {this.setState({t3:"2-4"})}}/>2-4<br/>
                Number of Tickets : <input type="text" onChange={(e) => {this.setState({nTickets:e.target.value})}}/><br/>
                Number of screens : <input type="text" onChange={(e) => {this.setState({nScreens:e.target.value})}} max="10" min="1"/><br/>
                Ticket Price : <input type="text" onChange={(e) => {this.setState({tPrice:e.target.value})}}/><br/>
                <button onClick={this.add.bind(this)}>Add Hall</button><br/>
				<br/><br/><br/>
				
				

				<hr/><br/><br/>
				<input type="text" name="searchHall"/>
				<button onClick="this.search.bind(this)">Search</button><br/><br/>
				Name : <input type="text" name="hallName" onChange={(e) => {this.setState({hallName:e.target.value})}}/><br/>
                <input type="checkbox" name="chk1"  onChange={(e) => {this.setState({t1:"9-11"})}}/>9-11<br/>
                <input type="checkbox" name="chk2" onChange={(e) => {this.setState({t2:"11-2"})}}/>11-2<br/>
                <input type="checkbox" name="chk3"  onChange={(e) => {this.setState({t3:"2-4"})}}/>2-4<br/>
                Number of Tickets : <input type="text" onChange={(e) => {this.setState({nTickets:e.target.value})}}/><br/>
                Number of screens : <input type="text" onChange={(e) => {this.setState({nScreens:e.target.value})}} max="10" min="1"/><br/>
                Ticket Price : <input type="text" onChange={(e) => {this.setState({tPrice:e.target.value})}}/><br/>
                <button onClick={this.update.bind(this)}>Update Hall</button><br/>
            </div>
        );
    }
}	

function mapStateToProps(state){
    return{
        movieData : state.adminReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(data, dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(Admin);