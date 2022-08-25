import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../App.css";
import Logout from "./Logout";
import { withRouter } from "react-router-dom";

function Paypal() {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Sunflower",
                        amount: {
                            currency_code: "USD",
                            value: 20,
                        },
                    },
                ],
                // not needed if a shipping address is actually needed
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };
    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };


    return (
        <div style={{ marginLeft: "20%" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": "AR0uqjQcs_OHFzBUL7wALa01XokiTEqsyAXqs3D2p1mPc5B85WmdmtOd3c14QQ__hdv4FjbuNkNz9ZZj",
                }}>
                <div>
                    <h2 className="text-center mb-5" style={{marginLeft:"-30%"}}>
                        Payment Details
                    </h2>


                    
                    <div className="input-container">
                        <label>Make payment by :</label>
                    </div>

                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                </div>
            </PayPalScriptProvider>
        </div>
    )
}

export default withRouter(Paypal);