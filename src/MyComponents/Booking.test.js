import axios from "axios";

let booking = {
  bookingAmount: "5000",

  bookingId: 1,

  flightNumber: "A100",

  passengerList: [
    {
      age: 24,

      email: "komal@gmail.com",

      firstName: "komal",

      gender: "female",

      lastName: "warpade",
    },
  ],

  userId: "10",
};

test("Testing View All Booking funciton.", async () => {
  axios.get("http://localhost:8092/booking/allBookings").then((resp) => {
    let booking = result.data;

    expect(booking).toBe(booking);
  });
});

test("Testing Add booking funciton.", async () => {
  axios
    .post("http://localhost:8092/booking/addBooking", booking)
    .then((resp) => {
      let booking = result.data;

      expect(booking).toBe(booking);
    });
});

// test("Testing Update order funciton.", async () => {

//     axios.put("http://localhost:8092/booking/updateBooking/", car).then(resp =>{

//         let carwash = result.data;

//         expect(carwash).toBe(carwash);

//     });

// });
