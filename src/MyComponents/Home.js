import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const gotoSearch = () => {
    history.push(`/search`);
  };

  return (
    <>
      <div
        id="home"
        class="section"
        style={{
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div class="section-center">
          <div class="container">
            <div class="row">
              <div class="col-md-12 col-md-offset-2">
                <div class="booking-cta">
                  <h1>Book your flight today</h1>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 10, marginLeft: "87%" }}
                    onClick={() => gotoSearch()}
                  >
                    Search Flights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
