import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link, NavLink } from 'react-router-dom';
import SearchingStyle from '../style/SearchingStyle.css'
import AuthService from '../Services/AuthService.js';
import "../style/login.css"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
        <div id="booking" class="section">
          <div class="section-center">
            <div class="container" >
              <div class="row">
                <div class="booking-form">
                  <div class="booking-bg"style={{marginTop:"8%",marginBottom:"8%"}}>
                    <div class="form-header">
                    <h2 style={{marginTop:"20%"}}>Welcome To AirAsia</h2>
                    <h4 style={{marginTop:"5%"}}>Create Your Account</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6"></div>
                    <div className="homecontainer" >
                    </div>
                    {/* <section
          className="vh-100 bg-image"
          style={{ backgroundColor: "#C3CCC6" }}
        >

          <div className="mask d-flex align-items-center h-100 gradient-custom-3" style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/cc/a5/02/cca5022c86f67861746d7cf2eb486de8.gif')"
          }}> */}
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginLeft: "48%" }}>
                        <div className="col-14 col-md-8 col-lg-8 col-xl-12">
                        <div
                            className="card shadow-2-strong"

                          >
                            <div className="card-body p-5 text-center">
                              <h2 className="text-center mb-5">
                                SignUp
                              </h2>

                              <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                  this.form = c;
                                }}
                              >
                                {!this.state.successful && (
                                  <div>
                                    <div className="input-container">
                                      <label htmlFor="username">Username</label>
                                      <Input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter Your Username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                      />
                                    </div>

                                    <div className="input-container">
                                      <label htmlFor="email">Email</label>
                                      <Input
                                        type="text"
                                        placeholder="Enter Your Email"
                                        className="form-control form-control-lg"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                      />
                                    </div>

                                    <div className="input-container">
                                      <label htmlFor="password">Password</label>
                                      <Input
                                        type="password"
                                        placeholder="Enter Your Email"
                                        className="form-control form-control-lg"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                      />
                                    </div><br />

                                    <div className="form-group">
                                      <button className="btn btn-primary btn-block" style={{ marginLeft:"50"}}>Sign Up</button>
                                    </div>
                                  </div>
                                )}

                                {this.state.message && (
                                  <div className="form-group">
                                    <div
                                      className={
                                        this.state.successful
                                          ? "alert alert-success"
                                          : "alert alert-danger"
                                      }
                                      role="alert"
                                    >
                                      {this.state.message}
                                    </div>
                                  </div>
                                )}
                                <CheckButton
                                  style={{ display: "none" }}
                                  ref={c => {
                                    this.checkBtn = c;
                                  }}
                                />
                                <div style={{ marginLeft: 40 }}>
                                  Don't have an account ?
                                  <NavLink to="/login">Sign In</NavLink>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></div></div></div></div></div>
      </div>

    );
  }
}