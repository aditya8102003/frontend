import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";
import { Button, Table } from "react-bootstrap";
import Service from "../Services/Service";
import Logout from "./Logout";
import { withRouter } from "react-router-dom";
import AuthService from "../Services/AuthService";
import Swal from "sweetalert2";

function Search() {
  const history = useHistory();
  const [flights, setFlights] = useState([]);
  const [airportList, setAirportList] = useState([]);
  const [takeoff, setFlightTakeOffStation] = useState("");
  const [landing, setFlightLandingStation] = useState("");
  const [departureDate, setdepartureDate] = useState("");

  useEffect(() => {
    Service.getFlights()
      .then((response) => {
        setAirportList(response.data);
        setAirportList(response.data);
      })
      .catch((error) => console.error(`Error :  ${error}`));
  }, []);

  const searchFlights = async (event) => {
    event.preventDefault();
    let search = {
      takeoff,
      landing,
      departureDate,
    };
    const flightResp = await Service.getByTakeoffAndLandingAndDepartureDate(
      search
    );
    console.log(flightResp);
    setFlights(flightResp.data);
  };

  const selectFlight = (id) => {
    if (AuthService.getCurrentUser()) {
      //  if(userId){
      localStorage.setItem("flightNumber", id);
      history.push(`/booking/${id}`);
      // }else{
      // history.push(`/login`);
      // }
    } else {
      // alert("please SignIn..")
      // Swal.getConfirmButton( 'please login yourself');
      history.push(`/login`);
    }
  };

  return (
    <div>
      <div
        id="search"
        class="section"
        style={{
          height: "110vh",
          marginTop: "-20px",
          backgroundSize: "cover",
        }}
      >
        <section className="vh-100" >
          <Logout />
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <div className="row mt-3 pt-3">
              <div className="search">
                <div className="search--tabs">
                </div>
                <div className="search--form" style={{backgroundColor:"#cce0ff"}}>
                  <label> From: </label>
                  <select
                    className="form-control"
                    name="departureAirport"
                    value={takeoff || ""}
                    onChange={(e) => {
                      setFlightTakeOffStation(e.target.value);
                    }}
                  >
                    <option value="">Select departure city</option>
                    {airportList.map((flight) => (
                      <option key={flight.flightNumber} value={flight.takeoff}>
                        {flight.takeoff}
                      </option>
                    ))}
                  </select>

                  <label style={{ marginTop: 16 }}> To : </label>
                  <select
                    className="form-control"
                    name="destinatonAirport"
                    value={landing || ""}
                    onChange={(e) => {
                      setFlightLandingStation(e.target.value);
                    }}
                  >
                    <option value="">Select arrival city</option>
                    {airportList.map((flight) => (
                      <option key={flight.flightNumber} value={flight.landing}>
                        {flight.landing}
                      </option>
                    ))}
                  </select>

                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="date"
                      name="departureDate"
                      className="form-control"
                      value={departureDate || ""}
                      onChange={(e) => {
                        setdepartureDate(e.target.value);
                      }}
                    />
                  </div>
                  <button className="btn" onClick={searchFlights}>
                    Search
                  </button>
                </div>
              </div>

              {flights.length !== 0 ? (
                <div className="col-lg-13 mb-5 grid-margin" >
                  <div
                    className="card h-100 flight-table"
                    style={{backgroundColor:"#cce0ff"}}
                  >
                    <h4 className="card-header" style={{ color: "red" }}>
                      Available Flights {takeoff} - {landing}
                    </h4>
                    <div className="card-body">
                      <Table
                        striped
                        bordered
                        hover
                        style={{
                          height: "250px",
                          overflow: "scroll",
                          display: "block",
                          color: "black",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>FlightNumber</th>
                            <th>Takeoff</th>
                            <th>Departure Date</th>
                            <th>Departure Time</th>
                            <th>Landing</th>
                            <th>Arrival Date</th>
                            <th>Arrival Time</th>
                            <th>Flight Fare</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {flights.map((flight) => (
                            <tr key={flight.flightNumber}>
                              <td>{flight.flightNumber}</td>
                              <td>{flight.takeoff}</td>
                              <td>{flight.departureDate}</td>
                              <td>{flight.departureTime}</td>
                              <td>{flight.landing}</td>
                              <td>{flight.arrivalDate}</td>
                              <td>{flight.arrivalTime}</td>
                              <td>{flight.flightFare}</td>
                              <td>
                                {" "}
                                <button
                                  onClick={() =>
                                    selectFlight(flight.flightNumber)
                                  }
                                  className="btn btn-info"
                                >
                                  Book
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default withRouter(Search);
