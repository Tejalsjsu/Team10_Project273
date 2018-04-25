import React from "react";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as getData from '../../actions/adminActions';
import {adminData} from "../../reducers/adminReducer";
//import PieChart from 'react-simple-pie-chart';
//import BarChart from 'react-bar-chart';
import {BarChart} from 'react-easy-chart';
import {PieChart} from 'react-easy-chart';



//import {Link} from 'react-router-dom';

class Admin extends React.Component {
    /*constructor(props){
            super(props);
            this.state = {
                redirect: false,
				nScreens:0
            };
		/!*this.add = this.add.bind(this);
		this.search = this.search.bind(this);
		this.update = this.update.bind(this);*!/
    }*/

    state = {
        redirect: false,
        nScreens:0
    };

    add(){
        console.log("Add Movie Hall inside admin.js");
        
		console.log("props",this.props);
		console.log("state",this.state);
        this.props.addMovieHall(this.state).then(
            (data) => {
                this.setState({
                    aMessage: this.props.adminData.data.message
                });
            },
            (err) => {
                console.log("inside err");
            });
    }

	search(){
		console.log("Search Movie Hall inside admin.js",this.state.hallName);
		this.props.searchMovieHall(this.state.hallName).then(
            (data) => {
                console.log("inside searchMovieHall", this.props.adminData.data.hallData);
                this.setState({
                    hall_id: this.props.adminData.data.hallData.hall_id,
                    hallName: this.props.adminData.data.hallData.hallName,
                    movie_times: this.props.adminData.data.hallData.movie_times,
                    nScreens: this.props.adminData.data.hallData.nScreens,
                    nTickets: this.props.adminData.data.hallData.nTickets,
                    tPrice: this.props.adminData.data.hallData.tPrice,
                    movieTimesBfr : this.props.adminData.data.hallData.movie_times
                });

                var str = this.props.adminData.data.hallData.movie_times;
                var splitted = str.split("|");

                for(var i=0; i<splitted.length; i++){
                    if(splitted[i] == "9-11") {
                        console.log("in 9-11");
                        document.getElementById("chk1").checked = true;
                    }
                    if(splitted[i] == "11-2") {
                        console.log("in 9-11");
                        document.getElementById("chk2").checked = true;
                    }
                    if(splitted[i] == "2-4") {
                        console.log("in 9-11");
                        document.getElementById("chk3").checked = true;
                    }
                }
            },
            (err) => {
                console.log("inside err");
            });
	}
	
	 update(){

        if(document.getElementById("chk1").checked == true){
            console.log("inside 1");
            this.setState({t1:"9-11"});
        }
        if(document.getElementById("chk2").checked == true){
            console.log("inside 2");
            this.setState({
                t2:"11-2"
            });
        }
        if(document.getElementById("chk3").checked == true){
            console.log("inside 3");
            this.setState({t3:"2-4"});
        }
         console.log("Update Movie Hall inside admin.js before update",this.state);

        this.props.updateMovieHall(this.state).then(
            (data) => {
                console.log("inside update after updated data", this.props.adminData.data);
                this.setState({
                    hall_id: this.props.adminData.data.hallData.hall_id,
                    hallName: this.props.adminData.data.hallData.hallName,
                    movie_times: this.props.adminData.data.hallData.movie_times,
                    nScreens: this.props.adminData.data.hallData.nScreens,
                    nTickets: this.props.adminData.data.hallData.nTickets,
                    tPrice: this.props.adminData.data.hallData.tPrice,
                    uMessage: this.props.adminData.data.hallData.message,
                });

                var str = this.props.adminData.data.hallData.movie_times;
                var splitted = str.split("|");

                for(var i=0; i<splitted.length; i++){
                    if(splitted[i] == "9-11") {
                        console.log("in 9-11");
                        document.getElementById("chk1").checked = true;
                    }
                    if(splitted[i] == "11-2") {
                        console.log("in 9-11");
                        document.getElementById("chk2").checked = true;
                    }
                    if(splitted[i] == "2-4") {
                        console.log("in 9-11");
                        document.getElementById("chk3").checked = true;
                    }
                }

            },
            (err) => {
                console.log("inside err");
            });
    }

    render(){
		const {adminData} = this.props;
		console.log("varshaData inside render ",this.props.varshaData);

        var crDr = {};
        var crDrlist= [];
        crDr = {color:'#008080',value:0};
        crDrlist.push(crDr);
        crDr = {color:'#808000',value:0};
        crDrlist[1] = crDr;

        crDrlist[0].value = 12;
        crDrlist[1].value = 15;


        const data = [
            {text: 'Man', value: 500},
            {text: 'Woman', value: 300}
        ];

        const margin = {top: 20, right: 20, bottom: 30, left: 40};
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
				<br/>
                {this.state.aMessage ? this.state.aMessage : ""}
                <br/><br/>

                pie chart


                    <PieChart
                        data={[
                            { key: 'A', value: 100 },
                            { key: 'B', value: 200 },
                            { key: 'C', value: 50 }
                        ]}
                    />
                <BarChart
                    data={[
                        {x: 'A', y: 20},
                        {x: 'B', y: 30},
                        {x: 'C', y: 40},
                        {x: 'D', y: 20},
                        {x: 'E', y: 40},
                        {x: 'F', y: 25},
                        {x: 'G', y: 5}
                    ]}
                />
                    <PieChart
                        size={400}
                        innerHoleSize={200}
                        data={[
                            { key: 'A', value: 100, color: '#aaac84' },
                            { key: 'B', value: 200, color: '#dce7c5' },
                            { key: 'C', value: 50, color: '#e3a51a' }
                        ]}
                    />
				
                Search Movie Hall
				<hr/><br/><br/>
				<input type="text" name="searchHall" onChange={(e) => {this.setState({hallName:e.target.value})}}/>
				<button onClick={this.search.bind(this)}>Search</button><br/><br/>
				Name : <input type="text" name="hallName" value={this.state.hallName} onChange={(e) => {this.setState({hallName:e.target.value})}}/><br/>
                <input type="checkbox" name="chk1" id="chk1" />9-11<br/>
                <input type="checkbox" name="chk2" id="chk2" />11-2<br/>
                <input type="checkbox" name="chk3" id="chk3" />2-4<br/>
                Number of Tickets : <input type="text" value={this.state.nTickets} onChange={(e) => {this.setState({nTickets:e.target.value})}}/><br/>
                Number of screens : <input type="text" value={this.state.nScreens} onChange={(e) => {this.setState({nScreens:e.target.value})}} max="10" min="1"/><br/>
                Ticket Price : <input type="text" value={this.state.tPrice} onChange={(e) => {this.setState({tPrice:e.target.value})}}/><br/>
                <button onClick={this.update.bind(this)}>Update Hall</button><br/>
                <br/>
                {this.state.uMessage ? this.state.uMessage : ""}
            </div>
        );
    }
}	

function mapStateToProps(state){
    return{
        adminData : state.admin
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, getData), dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(Admin);