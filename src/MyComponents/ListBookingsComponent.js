import React, { Component } from "react";
import Service from "../Services/Service";
import { Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("role");
};

class ListBookingsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
    };

    this.deleteBooking = this.deleteBooking.bind(this);
  }

  deleteBooking(bookingid) {
    Service.deleteBooking(bookingid).then((res) => {
      this.setState({
        bookings: this.state.bookings.filter(
          (booking) => booking.bookingid !== bookingid
        ),
      });
    });
  }

  componentDidMount() {
    Service.getBookings().then((res) => {
      this.setState({ bookings: res.data });
    });
  }

  addBooking() {
    this.props.history.push("/admin");
  }

  render() {
    return (
      <div style={{ color: "white" }}>
        <div className="mx-n3">
        </div>
        <div className="d-flex p-2 mx-n3 flight-table table-margin">
          <div className="mx-auto text-center">
            <h2 className="mx-auto">Bookings List</h2>
          </div>
        </div>
        <div className="row flight-table w-100vh">
          <Table hover striped bordered
            style={{ color: "black" }}
          >
            <thead>
              <tr>
                <th>Booking Id</th>
                <th>Number of Passengers</th>
                <th>User Id</th>
                <th>Flight Number</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.bookings.map((booking) => (
                <tr key={booking.bookingid}>
                  <td>{booking.bookingid}</td>
                  <td>{booking.passengerList.length}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.flightNumber}</td>
                  <td>
                    <button
                      onClick={() => this.deleteBooking(booking.bookingid)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(ListBookingsComponent);
