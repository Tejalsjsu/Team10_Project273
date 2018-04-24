import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {latest10Bills, searchByDate, searchByMonth, updatePageClick} from "../../actions/adminActions";
import {BILLS} from '../../actions/pageClickEnums';
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import './datePicker.css';
import moment from 'moment';
import Moment from 'react-moment';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Dropdown
} from 'reactstrap';

class Bills extends Component {

  constructor (props) {
      super(props)
      let d = new Date(moment());
      let date_str = d.getFullYear() + '-0' + (d.getMonth()+1) + '-' + d.getDate();
      let month_str = d.getMonth()+1;
      this.state = {
        bills: [],
        startDate: moment(),
        dateString: date_str,
        monthString: month_str,
        modalIsOpen: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
      this.getBillsByMonth = this.getBillsByMonth.bind(this);
      this.getBillsByDate = this.getBillsByDate.bind(this);
  }

  componentDidMount() {
    console.log("Did mount called in bills");
    this.props.latest10Bills();
    this.props.updatePageClick(BILLS);
  }

  onButtonClick() {
    console.log("my button has clicked")
    console.log("date value picked from button: " + this.state.startDate);
  }

  getBillsByDate() {
    console.log("date string: " + this.state.dateString);
    this.props.searchByDate(this.state.dateString);
  }

  getBillsByMonth() {
    console.log("month string: " + this.state.monthString);
    this.props.searchByMonth(this.state.monthString);
  }

  handleChange(epoch_date) {
    let d = new Date(epoch_date);
    let date_in_string = d.getFullYear() + '-0' + (d.getMonth()+1) + '-' + d.getDate();
    let month_in_string = d.getMonth()+1;
    this.setState({
      startDate: epoch_date,
      dateString: date_in_string,
      monthString: month_in_string
    });
  }

  render() {
    console.log("this props admin: " + JSON.stringify(this.props.admin));
    return (
      <div className="container-fluid">
        <br/><br/>
        <p style={{color: 'white'}}>Search by Date/Month</p>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
        <br/>
        <Button color="primary" size="sm" onClick={this.getBillsByMonth}>
            Filter by Month
        </Button>
        {' '}
        <Button color="primary" size="sm" onClick={this.getBillsByDate}>
            Filter by Date
        </Button>
        <br/>
        <br/>
        <Table style={{color: 'white'}}>
           <thead>
             <tr>
               <th>#</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Amount ($)</th>
               <th>Tax (%)</th>
               <th>Date</th>
               <th>View Details</th>
             </tr>
          </thead>
          <tbody>
             {
               this.props.admin.bills.map((billInfo, index) => (
                 <tr key = {index}>
                     <th>{index+1}</th>
                     <td>{billInfo.firstName}</td>
                     <td>{billInfo.lastName}</td>
                     <td>{billInfo.amount}</td>
                     <td>{billInfo.tax}</td>
                     <td><Moment date={billInfo.date} /></td>
                     <td>
                        <span>
                              <Link
                                  to={`/admin-bill-info/${billInfo.BillingId}`}
                                  className="btn btn-link"
                                  key={billInfo.BillingId}
                                  style={{color: 'white'}}
                                >
                              View
                            </Link>
                        </span>
                      </td>
                  </tr>
               ))
             }
           </tbody>
        </Table>
    </div>
    );
  }
}

function mapStateToProps({ admin }) {
  return { admin };
}

export default connect(mapStateToProps, {latest10Bills, searchByDate, searchByMonth, updatePageClick})(withRouter(Bills));
