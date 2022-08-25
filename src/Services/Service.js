import axios from 'axios';

const FLIGHT_API_BASE_URL = "http://localhost:8091/search";
const BOOKING_API_BASE_URL = "http://localhost:8092/booking";
const PAYMENT_API_BASE_URL ="http://localhost:8094/payment";
const CHECKIN_API_BASE_URL ="http://localhost:8093/checkin";


let Service = {
    getFlights : () => {return axios.get(FLIGHT_API_BASE_URL+"/flights");},
    createFlight : (flight) => {return axios.post(FLIGHT_API_BASE_URL+"/addFlight",flight);}, 
    getFlightsByFlightNumber : (flightNumber) => {return axios.get(FLIGHT_API_BASE_URL+"/flights/"+flightNumber);},
    updateFlight : (flight, flightNumber) => {return axios.put(FLIGHT_API_BASE_URL+"/updateFlight/"+flightNumber, flight);},
    deleteFlight : (flightNumber) => {return axios.delete(FLIGHT_API_BASE_URL+"/flight/delete/"+flightNumber)},
    getByTakeoffAndLandingAndDepartureDate : ({takeoff, landing}) => {
        const url = FLIGHT_API_BASE_URL+"/flight/"+takeoff+"/"+landing;
        console.log(url);
        return axios.get(url);
    },
    
    createBooking : (booking) => {return axios.post(BOOKING_API_BASE_URL+"/addBooking", booking);},
    getBookings : () => {return axios.get(BOOKING_API_BASE_URL+"/allBookings");},
    deleteBooking : (bookingid) => {return axios.delete(BOOKING_API_BASE_URL+"/deleteBooking/"+bookingid);},
    savePayment: (data) => {return axios.post(PAYMENT_API_BASE_URL+"/addPayment", data);},

    getcheckinPassenger : () => {return axios.get(CHECKIN_API_BASE_URL+"/fetchAllCHeckIn");},
    checkinPassenger : (data) => {return axios.post(CHECKIN_API_BASE_URL+"/create", data);}
}

export default Service;