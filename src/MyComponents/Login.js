import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from '../Services/AuthService.js';
import { Link, NavLink } from 'react-router-dom';
import SearchingStyle from '../style/SearchingStyle.css';
import { withRouter } from "react-router";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        (response) => {
          this.props.history.push("/search");
          //window.location.reload();
          console.log(response.data);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div>
        <div id="booking" class="section">
          <div class="section-center">
            <div class="container">
              <div class="row ">
                <div class="booking-form">
                  <div class="booking-bg" style={{marginTop:"8%",marginBottom:"8%"}}>
                    <div class="form-header ">
                      <h2 style={{marginTop:"20%"}}>Welcome To AirAsia</h2>
                      <h4 style={{marginTop:"5%"}}>Please login to your account.</h4>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6"></div>
                    <div className="homecontainer">
                    </div>
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginLeft: "48%" }}>
                        <div className="col-14 col-md-8 col-lg-8 col-xl-12">
                          <div
                            className="card shadow-2-strong"

                          >
                            <div className="card-body p-5 text-center">
                              <h2 className="text-center mb-5">SignIn</h2>
                                <Form
                                  onSubmit={this.handleLogin}
                                  ref={c => {
                                    this.form = c;
                                  }}
                                >
                                  <div className="input-container">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                      type="text"
                                      placeholder="Enter Your Username"
                                      className="form-control form-control-lg"
                                      name="username"
                                      value={this.state.username}
                                      onChange={this.onChangeUsername}
                                      validations={[required]}
                                    />
                                  </div>

                                  <div className="input-container">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                      type="password"
                                      placeholder="Enter Your Password"
                                      className="form-control form-control-lg"
                                      name="password"
                                      value={this.state.password}
                                      onChange={this.onChangePassword}
                                      validations={[required]}
                                    />
                                  </div><br />

                                  <div className="form-group">
                                    <button
                                      className="btn btn-primary btn-block"
                                      disabled={this.state.loading}
                                    >
                                      {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      )}
                                      <span>Login</span>
                                    </button>
                                  </div>

                                  {this.state.message && (
                                    <div className="form-group">
                                      <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                      </div>
                                    </div>
                                  )}
                                  <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                      this.checkBtn = c;
                                    }}
                                  /><div >
                                    Don't have an account ?
                                    <NavLink to="/register">Sign Up</NavLink>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </section> */}
                  </div>
                </div></div></div></div></div>//</div>
    );
  }
}
export default withRouter(Login);