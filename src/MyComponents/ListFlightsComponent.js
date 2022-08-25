import React, { Component } from "react";
import Service from "../Services/Service";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Swal from 'sweetalert2'

const logout = () => {
  localStorage.removeItem("role");
};


class ListFlightsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
    };

    this.addFlight = this.addFlight.bind(this);
    this.editFlight = this.editFlight.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);
  }
 
  

  deleteFlight(flightNumber) {
    Service.deleteFlight(flightNumber).then((res) => {
      this.setState({
        flights: this.state.flights.filter(
          (flight) => flight.flightNumber !== flightNumber
        ),
      });
    });
  }

  editFlight(flightNumber) {
    this.props.history.push(`/update-flight/${flightNumber}`);
  }

  componentDidMount() {
    Service.getFlights().then((res) => {
      this.setState({ flights: res.data });
    });
  }

  addFlight() {
    this.props.history.push("/add-flight");
  }

  render() {
    return (
      <div id="admin" class="section" style={{

        height: '100vh',
        // marginTop: '-120px',
        // fontSize: '50px',
        backgroundSize: 'cover',
    }}>
      <div style={{ color: "black" }}>
        <div className="mx-n3">
        </div>
        <div className="d-flex p-2 mx-n3 flight-table table-margin">
          <div className="mx-auto text-center">
            <h2 className="mx-auto">Flights List</h2>
          </div>
          <div className="mt-1" style={{marginRight:30}}>
            <button className="btn btn-primary"  onClick={this.addFlight}>
              Add Flight
            </button>
          </div>
        </div>
        <div style={{marginLeft:20, marginRight:20, backgroundColor: "white"}} className="row flight-table">
          <Table hover striped bordered
            style={{ alignSelf: "center", color: "black" }}
          >
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Flight Name</th>
                <th>Takeoff</th>
                <th>Landing</th>
                {/* <th>Layover</th> */}
                <th>Duration</th>
                <th>Departure Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Flight Fare</th>
                <th>Seats</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.flights.map((flight) => (
                <tr key={flight.flightNumber}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.flightName}</td>
                  <td>{flight.takeoff}</td>
                  <td>{flight.landing}</td>
                  {/* <td>{flight.layover.toString()}</td> */}
                  <td>{flight.duration}</td>
                  <td>{flight.departureDate}</td>
                  <td>{flight.departureTime}</td>
                  <td>{flight.arrivalTime}</td>
                  <td>{flight.flightFare}</td>
                  <td>{flight.totalSeats}</td>
                  <td>
                    <button 
                      onClick={() => this.editFlight(flight.flightNumber)}
                      className="btn btn-info"
                      style={{ marginRight: "5px", width: 40,marginLeft:-4 }}
                    ><div style={{marginLeft:-6}}>Edit</div>
                    </button>
                    <button
                      onClick={() =>{
                        const confirmBox = window.confirm(
                          "Do you really want to delete this?"
                        )
                        if (confirmBox === true){ this.deleteFlight(flight.flightNumber)}}}
                      className="btn btn-danger , col-lg-6 col-xl-6.9"
                    ><div style={{marginLeft:-9}}>
                      Delete</div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(ListFlightsComponent);
