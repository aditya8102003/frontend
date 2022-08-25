import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Service from "../Services/Service";
import { PaytmButton } from '../paytm-button/paytmButton';

export class Payment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // cardNumber: '',
            // cardType: '',
            bankName: '',
            amount: '',
            description: '',
            paymentDate: '',
            customerId: '',
            transactionId: '',
            //expirydate: '',
            //cvv: ''
        }

        //         BANKNAME: "Central Bank of India"
        // BANKTXNID: "777001640419179"
        // CHECKSUMHASH: "2VUOhOEs6AmkHHhQB58l1kns9RG2nq3zCRnm9KQsgfnRLoTFW+jVbZz3kwOldcP0ceak+7zuWW26Q+l6kst7V2sR+78YikiO6RWmXoWvrkU="
        // CURRENCY: "INR"
        // GATEWAYNAME: "HDFC"
        // MID: "eTxRNl10134241088357"
        // ORDERID: "Order_1660215794378"
        // PAYMENTMODE: "DC"
        // RESPCODE: "01"
        // RESPMSG: "Txn Success"
        // STATUS: "TXN_SUCCESS"
        // TXNAMOUNT: "1.00"
        // TXNDATE: "2022-08-11 16:33:14.0"
        // TXNID: "20220811111212800110168266903961336"

        this.changeAmountHandler();
        this.changePaymentDateHandler();

        this.changeCardNumberHandler = this.changeCardNumberHandler.bind(this);
        this.changeBankNameHandler = this.changeBankNameHandler.bind(this);
        this.changeCardTypeHandler = this.changeCardTypeHandler.bind(this);
        this.changeExpiryHandler = this.changeExpiryHandler.bind(this);
        this.changeCVVIdHandler = this.changeCVVIdHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);

        this.savePayment = this.savePayment.bind(this);
    }

    //for save
    savePayment = (e) => {
        console.log(e);
        e.preventDefault();
        const bookingData = {
            amount: this.state.amount,
            bankName: this.state.bankName,
            cardNumber: this.state.cardNumber,
            cardType: this.state.cardType,
            customerId: this.state.customerId,
            description: this.state.description,
            paymentDate: this.state.paymentDate,
            transactionId: this.state.transactionId
        };
        Service.savePayment(bookingData).then((res) => {
            console.log(res);
            alert(res.data);
            //redirect to home
        })
    }


    changeBankNameHandler = (event) => {
        this.setState({ bankName: event.target.value });
    }
    changeCardTypeHandler = (event) => {
        this.setState({ cardType: event.target.value });
    }
    changeCardNumberHandler = (event) => {
        this.setState({ cardNumber: event.target.value });
    }
    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    changeExpiryHandler = (event) => {
        this.setState({ expirydate: event.target.value });
    }
    changeCVVIdHandler = (event) => {
        this.setState({ cvv: event.target.value });
    }

    changeAmountHandler = () => {
        this.state.amount = localStorage.getItem('bookingAmount');
        this.state.transactionId = "pay" + Math.floor(Math.random() * 100000);
        this.state.customerId = 11;
    }
    changePaymentDateHandler = () => {
        var today = new Date();
        var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + "  " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.state.paymentDate = date;
    }

    //      {
    //   "amount": 101,
    //   "bankName": "BOI",
    //   "cardNumber": "1234526",
    //   "cardType": "Master",
    //   "customerId": "66664",
    //   "description": "uvvvv",
    //   "paymentDate": "10/7/2022",
    //   "transactionId": "555555"
    // }

    render() {
        return (
            <div>
                <div className="homecontainer">
                </div>
                <section
                    className="vh-100 bg-image"
                    style={{ backgroundColor: "#C3CCC6" }}
                >

                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" style={{ borderRadius: "1rem" }}>
                                       
                                            <div className="button-container">
                                                <PaytmButton />
                                            </div>

                                            {/* <h2 className="text-uppercase text-center mb-5">
                                                Payment Details
                                            </h2>

                                            <form>
                                                <div className="form-outline mb-4"></div>

                                                <div className="input-container">
                                                    <label>Amount : </label>
                                                    <input type="text" name="amount" disabled required placeholder="Amount Is required" value={this.state.amount} />
                                                </div>

                                                <div className="input-container">
                                                    <label>Description : </label>
                                                    <input type="text" name="description" required placeholder="Enter Your description" value={this.state.description} onChange={this.changeDescriptionHandler} />
                                                   
                                                </div>

                                                <div className="input-container">
                                                    <label>BankName : </label>
                                                    <input type="text" name="bankName" required placeholder="Enter Your BankName" value={this.state.bankName} onChange={this.changeBankNameHandler} />
                                                    
                                                </div>

                                                <div className="input-container">
                                                    <label>CardType : </label>
                                                    <input type="text" name="cardType" required placeholder="Enter Your BankName" value={this.state.cardType} onChange={this.changeCardTypeHandler} />
                                                   
                                                </div>

                                                <div className="input-container">
                                                    <label>Card Number : </label>
                                                    <input type="text" name="customerId" required placeholder="Enter Your BankName" value={this.state.cardNumber} onChange={this.changeCardNumberHandler} />
                                                    
                                                </div>

                                                <div className="input-container">
                                                    <label>Expiry date : </label>
                                                    <input type="text" name="paymentDate" required placeholder="Enter Your paymentDate" value={this.state.expirydate} onChange={this.changeExpiryHandler} />
                                                    
                                                </div>

                                                <div className="input-container">
                                                    <label>CVV : </label>
                                                    <input type="text" name="transactionId" required placeholder="Enter Your transactionId" value={this.state.cvv} onChange={this.changeCVVIdHandler} />
                                                </div>

                                                <div onClick={this.savePayment} className="button-container">
                                                    <input type="submit" value="Make Payment" />
                                                </div>
                                            </form> */}
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >

        )
    }
}

export default Payment