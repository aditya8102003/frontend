import { useState } from "react";
import { useHistory } from "react-router-dom";
import SubmitForm from "./SubmitForm";
import Logout from "./Logout";
import Service from "../Services/Service";
import { withRouter } from "react-router-dom";

const BookingPage = () => {
  const history = useHistory();
  const [passengers, setPassengers] = useState([]);
  const [addingPassenger, setAddingPassenger] = useState(true);
  var flightNumber = localStorage.getItem("flightNumber");
  console.log(flightNumber);
  const proceedNext = async () => {
    const userid = 11; //localStorage.getItem("userid");
    const bookingData = {
      passengerList: passengers,
      userid,
      flightNumber: flightNumber,
    };

    await Service.createBooking(bookingData).then((res) => {
      // let len = 1;
      // console.log(res.data);
      // if (res.data.passengerList > 1) {
      //   len = res.data.passengerList.length;
      // }
      let len = res.data.passengerList.length;
      localStorage.setItem("bookingAmount", res.data.bookingAmount * len);
      history.push(`/payment`);

      //let resp = res;
      //const bookingid = resp.data.bookingid;
      //const fareData = { bookingid };
      // const fareResp = Service.createFare(fareData); // this function is not available you need to create
      // history.push(`/ticket/${fareResp.data.farenum}`)
    });
  };
  const deletePassenger = (index) => {
    let allPassengers = [...passengers];
    allPassengers = allPassengers.filter((pas, ind) => ind !== index);
    setPassengers(allPassengers);
  };
  return (
    <div>
      <div
        id="booking"
        class="section"
        style={{
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <Logout />
        {passengers.length > 0 && (
          <div style={{ padding: 20 }} className="row">
            {passengers.map((passenger, index) => (
              <div className="col-sm-4" style={{ padding: 10 }}>
                <div
                  className="card flight-table table-margin"
                  style={{ color: "black" }}
                >
                  <div className="card-header">
                    <div className="d-flex justify-content-between">
                      <div>Passenger {index + 1}</div>
                      <div className="text-secondary">
                        <span
                          role="button"
                          className="btn btn-danger"
                          onClick={() => {
                            deletePassenger(index);
                          }}
                        >
                          X
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <span>Name: </span>
                      <span>
                        {passenger.firstName} {passenger.lastName}
                      </span>
                    </div>
                    <div>
                      <span>Gender: </span>
                      <span>{passenger.gender}</span>
                    </div>
                    <div>
                      <span>Age: </span>
                      <span>{passenger.age}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!addingPassenger ? (
          <div className="text-center table-margin" style={{ marginTop: 20 }}>
            <button
              className="btn btn-primary"
              onClick={() => setAddingPassenger(true)}
            >
              Add Another Passenger
            </button>
          </div>
        ) : (
          <SubmitForm
            setAddingPassenger={setAddingPassenger}
            setPassengers={setPassengers}
            passengers={passengers}
          />
        )}
        {passengers.length > 0 && (
          <div className="text-center mt-2">
            <button className="btn btn-success" onClick={() => proceedNext()}>
              <span className="paytm">Checkout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(BookingPage);
