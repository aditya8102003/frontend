import React, { Component } from "react";
import TimePicker from "react-time-picker";
import Service from "../Services/Service";
import { withRouter } from "react-router-dom";
import Logout from "./Logout";
import Swal from "sweetalert2";

class CreateFlightComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightNumber: "",
      flightName: "",
      takeoff: "",
      landing: "",
      duration: "",
      departureDate: "",
      arrivalDate: "",
      departureTime: "",
      arrivalTime: "",
      flightFare: "",
      totalSeats: "",

      errors: {
        flightNumber: "",
        flightName: "",
        takeoff: "",
        landing: "",
        duration: "",
        departureDate: "",
        arrivalDate: "",
        departureTime: "",
        arrivalTime: "",
        flightFare: "",
        totalSeats: "",
      },
    };

    this.changeFlightNumberHandler = this.changeFlightNumberHandler.bind(this);
    this.changeFlightNameHandler = this.changeFlightNameHandler.bind(this);
    this.changeTakeoffHandler = this.changeTakeoffHandler.bind(this);
    this.changeLandingHandler = this.changeLandingHandler.bind(this);
    this.changeDurationHandler = this.changeDurationHandler.bind(this);
    this.changeDepartureDateHandler =
      this.changeDepartureDateHandler.bind(this);
    this.changeArrivalDateHandler = this.changeArrivalDateHandler.bind(this);
    this.changeDepartureTimeHandler =
      this.changeDepartureTimeHandler.bind(this);
    this.changeArrivalTimeHandler = this.changeArrivalTimeHandler.bind(this);
    this.changeFlightFareHandler = this.changeFlightFareHandler.bind(this);
    this.changeTotalSeatsHandler = this.changeTotalSeatsHandler.bind(this);
    this.saveFlight = this.saveFlight.bind(this);
  }

  changeFlightNumberHandler = (event) => {
    this.setState({ flightNumber: event.target.value });
  };

  changeFlightNameHandler = (event) => {
    this.setState({ flightName: event.target.value });
  };

  changeTakeoffHandler = (event) => {
    this.setState({ takeoff: event.target.value });
  };

  changeLandingHandler = (event) => {
    this.setState({ landing: event.target.value });
  };

  changeDurationHandler = (event) => {
    this.setState({ duration: event.target.value });
  };

  changeDepartureDateHandler = (event) => {
    this.setState({ departureDate: event.target.value });
  };

  changeArrivalDateHandler = (event) => {
    this.setState({ arrivalDate: event.target.value });
  };

  changeDepartureTimeHandler = (event) => {
    this.setState({ departureTime: event });
  };

  changeArrivalTimeHandler = (event) => {
    this.setState({ arrivalTime: event });
  };

  changeFlightFareHandler = (event) => {
    this.setState({ flightFare: event.target.value });
  };

  changeTotalSeatsHandler = (event) => {
    this.setState({ totalSeats: event.target.value });
  };

  saveFlight = (e) => {
    e.preventDefault(0);
    let flight = {
      flightNumber: this.state.flightNumber,
      flightName: this.state.flightName,
      takeoff: this.state.takeoff,
      landing: this.state.landing,
      duration: this.state.duration,
      departureDate: this.state.departureDate,
      arrivalDate: this.state.arrivalDate,
      departureTime: this.state.departureTime,
      arrivalTime: this.state.arrivalTime,
      flightFare: this.state.flightFare,
      totalSeats: this.state.totalSeats,
    };

    Service.createFlight(flight)
      .then((res) => {
        Swal.fire("flight added successfully");
        this.props.history.push("/flights");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
    console.log("flight => " + JSON.stringify(flight));
  };

  cancel() {
    this.props.history.push("/flights");
  }

  render() {
    return (
      <div>
        <div id="admin" class="section">
          <Logout />
          <div className="container">
            <div className="row">
              <div
                className="card col-md-6 offset-md-3 offset-md-3 light-bg table-margin rounded flight-table"
                style={{ color: "black" }}
              >
                <h3 className="text-center" style={{ marginTop: "20px" }}>
                  Add Flight
                </h3>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Flight Number: </label>
                      <input
                        placeholder="Flight Number"
                        name="flightNumber"
                        className="form-control"
                        required
                        value={this.state.flightNumber}
                        onChange={this.changeFlightNumberHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Flight Name: </label>
                      <input
                        placeholder="Flight Name"
                        name="flightName"
                        className="form-control"
                        value={this.state.flightName}
                        onChange={this.changeFlightNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>TakeOff: </label>
                      <input
                        placeholder="Takeoff"
                        name="takeoff"
                        className="form-control"
                        value={this.state.takeoff}
                        onChange={this.changeTakeoffHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Landing: </label>
                      <input
                        placeholder="Landing"
                        name="landing"
                        className="form-control"
                        value={this.state.landing}
                        onChange={this.changeLandingHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>Duration: </label>
                      <input
                        placeholder="Duration"
                        name="duration"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.changeDurationHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ marginRight: "50px" }}>
                        Departure Date:{" "}
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        className="form-control"
                        value={this.state.departureDate}
                        onChange={this.changeDepartureDateHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ marginRight: "76px" }}>
                        Arrival Date:{" "}
                      </label>
                      <input
                        name="arrivalDate"
                        type="date"
                        className="form-control"
                        value={this.state.arrivalDate}
                        onChange={this.changeArrivalDateHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ marginRight: "49px", marginTop: 20 }}>
                        Departure Time:{" "}
                      </label>
                      <TimePicker
                        name="departureTime"
                        value={this.state.departureTime}
                        onChange={this.changeDepartureTimeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ marginRight: "76px", marginTop: 15 }}>
                        Arrival Time:{" "}
                      </label>
                      <TimePicker
                        name="arrivalTime"
                        value={this.state.arrivalTime}
                        onChange={this.changeArrivalTimeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Flight Fare: </label>
                      <input
                        placeholder="Flight Fare"
                        name="flightFare"
                        className="form-control"
                        value={this.state.flightFare}
                        onChange={this.changeFlightFareHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Total Seats: </label>
                      <input
                        placeholder="Total Seats"
                        name="totalSeats"
                        className="form-control"
                        value={this.state.totalSeats}
                        onChange={this.changeTotalSeatsHandler}
                      />
                    </div>

                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="btn btn-success"
                        style={{ marginTop: 15 }}
                        onClick={this.saveFlight}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={this.cancel.bind(this)}
                        style={{ marginLeft: "10px", marginTop: 15 }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateFlightComponent);
