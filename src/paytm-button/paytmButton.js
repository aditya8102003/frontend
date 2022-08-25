import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
const PaytmChecksum = require('./paytmChecksum');
const axios = require('https');

export function PaytmButton() {
    const history = useHistory();
    const [amount, setAmount] = useState(localStorage.getItem('bookingAmount'));
    const [description, setDescription] = useState("");
    const [bankName, setbankName] = useState("");
    const [paymentDate, setpaymentDate] = useState("");
    const [paymentFlag, setpaymentFlag] = useState(false);
    var resPaymentStatus;
    const [paymentData, setPaymentData] = useState({
        token: "",
        order: "",
        mid: "eTxRNl10134241088357",
        amount: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = () => {
        let orderId = 'Order_' + new Date().getTime();

        // Sandbox Credentials
        let mid = "eTxRNl10134241088357"; // Merchant ID
        let mkey = "6@waGHgDSndsR2wn"; // Merhcant Key
        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": mid,
            "websiteName": "WEBSTAGING",
            "orderId": orderId,
            "callbackUrl": "https://merchant.com/callback",
            "txnAmount": {
                "value": amount,
                "currency": "INR",
            },
            "userInfo": {
                "custId": '1001',
            }
        };

        PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), mkey).then(function (checksum) {
            console.log(checksum);
            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);

            var options = {
                /* for Staging */
                hostname: 'securegw-stage.paytm.in',

                /* for Production */
                // hostname: 'securegw.paytm.in',

                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            var response = "";
            var post_req = axios.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });
                post_res.on('end', function () {
                    console.log('Response: ', response);
                    // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
                    setPaymentData({
                        ...paymentData,
                        token: JSON.parse(response).body.txnToken,
                        order: orderId,
                        mid: mid,
                        amount: amount
                    })
                });
            });

            post_req.write(post_data);
            post_req.end();
        });
    }

    const gotoHome = () => {
        Swal.fire("booking successful");
        history.push(`/home`);
    }

    const makePayment = () => {
        setLoading(true);
        var config = {
            "root": "",
            "style": {
                "bodyBackgroundColor": "#fafafb",
                "bodyColor": "",
                "themeBackgroundColor": "#0FB8C9",
                "themeColor": "#ffffff",
                "headerBackgroundColor": "#284055",
                "headerColor": "#ffffff",
                "errorColor": "",
                "successColor": "",
                "card": {
                    "padding": "",
                    "backgroundColor": ""
                }
            },
            "data": {
                "orderId": paymentData.order,
                "token": paymentData.token,
                "tokenType": "TXN_TOKEN",
                "amount": paymentData.amount /* update amount */
            },
            "payMode": {
                "labels": {},
                "filter": {
                    "exclude": []
                },
                "order": [
                    "CC",
                    "DC",
                    "NB",
                    "UPI",
                    "PPBL",
                    "PPI",
                    "BALANCE"
                ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
                "mid": paymentData.mid,
                "redirect": false
            },
            "handler": {
                "transactionStatus": function transactionStatus(paymentStatus) {
                    console.log("paymentStatus => ", paymentStatus);
                    setpaymentFlag(true);
                    setLoading(false);
                    resPaymentStatus = paymentStatus;
                    setbankName(paymentStatus.BANKNAME);
                    setpaymentDate(paymentStatus.TXNDATE);
                },
                "notifyMerchant": function notifyMerchant(eventName, data) {
                    console.log("Closed");
                    setpaymentFlag(true);
                    setLoading(false);
                }
            }
        };
        console.log(config);
        if (window.Paytm && window.Paytm.CheckoutJS) {
            // initialze configuration using init method
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                console.log('Before JS Checkout invoke');
                // after successfully update configuration invoke checkoutjs
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("Error => ", error);
            });
        }
    }

    return (
        <div>
            <div className="card-body p-5">
                {paymentFlag === false ?
                    <h2 className="text-uppercase text-center">
                        Payment Details
                    </h2> : null}

                {paymentFlag === true ?
                    <h2 className="text-uppercase text-center">
                        Payment successfull
                    </h2> : null}

                <form>
                    <div className="form-outline mb-4"></div>

                    <div className="input-container">
                        <label>Amount : </label>
                        <input type="text" name="amount" value={amount} disabled required placeholder="Amount Is required" />
                    </div>

                    <div className="input-container">
                        <label>Description : </label>
                        <input type="text" name="description" value={description} placeholder="Enter Your description" onChange={(e) => {
                            setDescription(e.target.value);
                        }} />
                    </div>

                    {paymentFlag === true ? <div className="input-container">
                        <label>BankName : </label>
                        <input type="text" name="bankName" disabled required placeholder="Enter Your BankName" value={bankName} />
                    </div> : null}

                    {paymentFlag === true ? <div className="input-container">
                        <label>Payment Date : </label>
                        <input type="text" name="customerId" disabled required placeholder="Enter Your BankName" value={paymentDate} />
                    </div> : null}

                    {
                        loading ? (
                            <img style={{ width: 34 }} src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
                        ) : (
                            paymentFlag === true ?
                                <button className="kem" onClick={() => gotoHome()}>Done</button> :
                                <button className="kem" onClick={() => makePayment()}>Make Payment</button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}