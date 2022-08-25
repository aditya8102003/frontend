import { useState } from "react";
import { withRouter } from "react-router-dom";

const SubmitForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("5");
  const [gender, setGender] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const userObj = { firstName, lastName, age, gender }
    props.setPassengers([...props.passengers, userObj])
    props.setAddingPassenger(false)
  };
  return (
    <div className="w-100" style={{padding:20}}>
      <form className="text-primary" onSubmit={handleSubmit}>
      <div style={{color:"black", marginLeft:6, marginBottom:-14, fontWeight:"bold"}}>Add Passenger Details:</div>
        <div className="card flight-table mt-3 p-3" style={{ color: "black" }}>
          <div className="text-center">
            <div className="row mb-2">
              <div className="col-sm-3">
                <div>First Name</div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </div>

              <div className="col-sm-3">
                <div> Last name</div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </div>

              <div className="col-sm-3">
                <div>Age</div>
                <input
                  type="number"
                  min={5}
                  max={100}
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  required
                />
              </div>

              <div className="col-sm-3">
                <div>Gender</div>
                <label>
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="ml-1 mr-2"
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                    required
                  />
                  {" "}
                  Male
                 
                </label>
                <label style={{marginLeft:8}}>
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="ml-1"
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                    required
                  />
                  {" "}
                  Female
                </label>
              </div>

            </div>

            {/* <div className="row mb-2"></div> */}
          </div>
          <div style={{marginTop:20}} className="mx-auto">
            <button className="btn btn-primary" type="submit">Save</button>
            <button style={{marginLeft:16}} className="btn btn-danger" onClick={() => props.setAddingPassenger(false)}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SubmitForm);
