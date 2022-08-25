import axios from "axios";



let flight = {

    arrivalDate: "2022-08-15T07:05:18.425Z",

    arrivalTime: "4am",

    departureDate: "2022-08-15T07:05:18.425Z",

    departureTime: "2am",

    duration: "2hr",

    flightFare: "2000",

    flightName: "indigo",

    flightNumber: "B101",

    landing: "mumbai",

    takeoff: "pune",

    totalSeats: 1



}



test("Testing Add flight funciton.", async () => {

    axios.post("http://localhost:8091/search/addFlight", flight).then((resp) => {

        let flight1 = result.data;

        expect(flight1).toBe(flight1);

    });

});



test("Testing View All flight funciton.", async () => {

    axios.get("http://localhost:8091/search/flights").then((resp) => {

        let flight1 = result.data;

        expect(flight1).toBe(flight1);

    });

});