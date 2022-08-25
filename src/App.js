import './App.css';
import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./MyComponents/Home";
//import Header from "./MyComponents/Header";
import ListFlightsComponent from "./MyComponents/ListFlightsComponent"
import CreateFlightComponent from "./MyComponents/CreateFlightComponent"
import UpdateFlightComponent from "./MyComponents/UpdateFlightComponent"
import ListBookingsComponent from "./MyComponents/ListBookingsComponent"
import ListofPassengerComponent from "./MyComponents/ListofPassenger"

// import SearchFlights from "./MyComponents/SearchFlights" 
import Search from "./MyComponents/Search"
import BookingPage from "./MyComponents/BookingPage"
//import SubmitForm from './MyComponents/SubmitForm'
import About from "./MyComponents/About"
import Login from "./MyComponents/Login"
import Registration from "./MyComponents/Registration"
import Paypal from "./MyComponents/Paypal"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./Services/AuthService.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Payment from './MyComponents/payment';
import BoardUser from "./MyComponents/board-user.component";
import BoardAdmin from "./MyComponents/board-admin.component";
import BoardModerator from "./MyComponents/board-moderator.component";
import checkinPassengerComponent from "./MyComponents/checkinPassenger";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
            
          </Link>
          <Link to={"/"} className="navbar-brand" style={{ marginLeft: "1%" }}>
            AirAsia
          </Link>
          <div className="navbar-nav mr-auto" style={{ marginLeft: "50%" }}>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"} >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/search"} className="nav-link active" aria-current="page">
                Search Flight
              </Link>
            </li>
            

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/checkin"} className="nav-link active" aria-current="page">
                  Check-In
                </Link>

              </li>
            )}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/fetchAllCHeckIn"} className="nav-link active" aria-current="page">
                  Passenger-List
                </Link>

              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/flights"} className="nav-link active" aria-current="page">
                  Add Flight
                </Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page">
                  Hello, {currentUser.username}
                </Link>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link active" aria-current="page" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link active" aria-current="page">
                  SignIn
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link active" aria-current="page">
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
              <Link to={"/about"} className="nav-link active" aria-current="page">
                About
              </Link>
            </li>

            </div>
          )}
        </nav>

        <div >
          {/* <div>
      <PaytmButton />
       </div > */}

          {/* <Header title="AirIndia" /> */}
          <Switch>

            {/* <Route exact path="/">
            <Home />
          </Route> */}
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/bookings" component={ListBookingsComponent} />
            <Route path="/booking" component={BookingPage} />
            <Route path="/flights" component={ListFlightsComponent} />

            <Route path="/fetchAllCHeckIn" component={ListofPassengerComponent} />
            <Route path="/add-flight" component={CreateFlightComponent} />
            <Route path="/checkin" component={checkinPassengerComponent} />
            <Route path="/paypal" component={Paypal} />
            <Route path="/search" component={Search} />
            <Route path="/payment" component={Payment} />
            <Route path="/update-flight/:flightNumber" component={UpdateFlightComponent} />
            <Route path="/booking/:flightNumber" component={BookingPage} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />


            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/register">
              <Registration />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

          </Switch>
          {/* <Footer /> */}


        </div>
      </div>
    );
  }
}

export default App;