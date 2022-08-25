import React from 'react'
import { Link } from "react-router-dom";

const Logout = (props) => {
  const logout = () => {
    localStorage.removeItem("role");
    
};
const classes = props.className || "";

return (
  <div className = {classes}>
    </div>
)
}
  
export default Logout;