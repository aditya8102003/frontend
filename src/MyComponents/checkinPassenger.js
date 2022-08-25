import React, { Component } from "react";
import TimePicker from "react-time-picker";
import Service from "../Services/Service";
import { withRouter } from "react-router-dom";
import Logout from "./Logout";
import Swal from "sweetalert2";

class checkinPassengerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkinId: "",
      flightNumber: "",
      seatNumber: "",
      firstName: "",
      lastName: "",
      flightDate: "",
      checkInTime: "",

      errors: {
        checkinId: "",
        flightNumber: "",
        seatNumber: "",
        firstName: "",
        lastName: "",
        flightDate: "",
        checkInTime: "",
      },
    };

    this.changeCheckinIdHandler = this.changeCheckinIdHandler.bind(this);
    this.changeFlightNumberHandler = this.changeFlightNumberHandler.bind(this);
    this.changeSeatNumberHandler = this.changeSeatNumberHandler.bind(this);
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeFlightDateHandler = this.changeFlightDateHandler.bind(this);
    this.changeCheckInTimeHandler = this.changeCheckInTimeHandler.bind(this);

    this.saveFlight = this.saveFlight.bind(this);
  }

  changeCheckinIdHandler = (event) => {
    this.setState({ checkinId: event.target.value });
  };

  changeFlightNumberHandler = (event) => {
    this.setState({ flightNumber: event.target.value });
  };

  changeSeatNumberHandler = (event) => {
    this.setState({ seatNumber: event.target.value });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeFlightDateHandler = (event) => {
    this.setState({ flightDate: event.target.value });
  };

  changeCheckInTimeHandler = (event) => {
    this.setState({ checkInTime: event });
  };

  saveFlight = (e) => {
    e.preventDefault(0);
    let flight = {
      checkinId: this.state.checkinId,
      flightNumber: this.state.flightNumber,
      seatNumber: this.state.seatNumber,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      flightDate: this.state.flightDate,
      checkInTime: this.state.checkInTime,
    };

    Service.checkinPassenger(flight)
      .then((res) => {
        // alert(res.data);
        Swal.fire("CheckedIn Successfully!");
        this.props.history.push("/home");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
    console.log("flight => " + JSON.stringify(flight));
  };

  render() {
    return (
      <div>
        <div
          id="check"
          class="section"
          style={{
            height: "100vh",
            // marginTop: '-120px',
            // fontSize: '50px',
            backgroundSize: "cover",
          }}
        >
          <Logout />
          <div className="container">
            <div className="row">
              <div
                className="card col-md-5 offset-md-3 offset-md-3 light-bg table-margin rounded flight-table"
                style={{
                  color: "black",
                  marginTop: 10,
                  backgroundColor: "#cce0ff",
                  marginLeft: "1%",
                }}
              >
                <h3 className="text-center" style={{ marginTop: "20px" }}>
                  Passenger CheckIN
                </h3>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>checkinId: </label>
                      <input
                        placeholder="checkinId"
                        name="checkinId"
                        className="form-control"
                        required
                        value={this.state.checkinId}
                        onChange={this.changeCheckinIdHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>flightNumber: </label>
                      <input
                        placeholder="flightNumber"
                        name="flightNumber"
                        className="form-control"
                        value={this.state.flightNumber}
                        onChange={this.changeFlightNumberHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>seatNumber: </label>
                      <input
                        placeholder="seatNumber"
                        name="seatNumber"
                        className="form-control"
                        value={this.state.seatNumber}
                        onChange={this.changeSeatNumberHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>firstName: </label>
                      <input
                        placeholder="firstName"
                        name="firstName"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={this.changeFirstNameHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>lastName: </label>
                      <input
                        placeholder="lastName"
                        name="lastName"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={this.changeLastNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ marginRight: "50px" }}>
                        flightDate:{" "}
                      </label>
                      <input
                        type="date"
                        name="flightDate"
                        className="form-control"
                        value={this.state.flightDate}
                        onChange={this.changeFlightDateHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ marginRight: "49px", marginTop: 20 }}>
                        checkInTime:{" "}
                      </label>
                      <TimePicker
                        name="checkInTime"
                        value={this.state.checkInTime}
                        onChange={this.changeCheckInTimeHandler}
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
                        style={{ marginTop: 10 }}
                        onClick={this.saveFlight}
                      >
                        CheckIn
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
export default withRouter(checkinPassengerComponent);
