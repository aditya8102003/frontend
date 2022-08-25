import axios from "axios";

let flight = {
  checkinId: 1,

  firstName: "komal",

  lastName: "warpade",

  seatNumber: "1",

  checkInTime: "2022-08-15T05:08:12.368+00:00",

  flightNumber: "C100",

  flightDate: "22/8/22",
};

test("Testing View All checkIn funciton.", async () => {
  axios.get("http://localhost:8093/checkin/fetchAllCHeckIn").then((resp) => {
    let flight1 = result.data;

    expect(flight1).toBe(flight1);
  });
});

test("Testing Update flight funciton.", async () => {
  axios
    .put("http://localhost:8093/checkin/updatecheckin", flight)
    .then((resp) => {
      let flight1 = result.data;

      expect(flight1).toBe(flight1);
    });
});
