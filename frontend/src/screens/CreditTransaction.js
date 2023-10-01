import React, { useContext, useState, useEffect } from "react";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import ContextApi from "../ApiAndComponent/ContextApi";
import { toast, Toaster } from "react-hot-toast";
import "../css/LoginCss.css";
import {loadStripe} from '@stripe/stripe-js';

export default function CreditTransaction() {
  const a = useContext(ContextApi);
  const id = a.user._id;

  const [transactions, settransactions] = useState([]);
  const [transID, settransID] = useState("");
  const [addMoney, setaddMoney] = useState(false);
  const [budget, setbudget] = useState(0);
  const createTransactions = async () => {
    const response = await fetch(
      "http://localhost:5000/api/createTransactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      toast.error("Error in fetching the Transaction");
    }
    if (json.success) {
      settransID(json.transID);
      getTransactions();
    }
  };

  const getTransactions = async () => {
    const response = await fetch("http://localhost:5000/api/getTransactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user.transactionID ? a.user.transactionID : transID,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      toast.error("Error in fetching the Transaction");
    }
    if (json.success) {
      settransactions(json.transaction);
    }
  };

  const onChangeHander = (event) => {
    setbudget(event.target.value);
  };

  const currencySymbolStyle = {
    fontSize: "20px",
    marginRight: "5px",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    fontSize: "18px",
  };

  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51Nr5KGSJ5d6Cj4qWOWtqd6oHSCH3wq1lcCL73Hx3nz0GR7QZ9JMtD5S4EjRRjI3CwdQXAKS2BMm5QPP2BKQmjnNA00JWDoP1jC")

        const response = await fetch("http://localhost:5000/api/crerate-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: a.user.personalInfo[0].name,
            amount:budget,
            qty:1
          }),
        });
        const json = await response.json();
        console.log("json", json);

        const result = stripe.redirectToCheckout({
            sessionId: json.id
        })
    
        if (json.success) {
          console.log("payment successfull")
        }
        if (!json.success) {
          console.log("Something went wrong");
        }
}

  useEffect(() => {
    if (a.user.transactionID) {
      getTransactions();
    } else {
      createTransactions();
    }
  }, []);

  return (
    <div>
      <UserNavbar />
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className="container-fluid mt-4" style={{ width: "80vw" }}>
        <div className="row">
          <div className="normal-box col-12">
            <h2>Wallet</h2>
            <p className="" style={{ fontSize: "2vmax" }}>
              Available Credits: {transactions.credits}
            </p>
            <button className="button-6" onClick={()=>{setaddMoney(true)}}>Add Credits</button>
            <button className="button-6" disabled>
              Withdraw
            </button>
            <br />
            {addMoney && (
                <div>
                    <span style={currencySymbolStyle}>Amount: </span>
            <input
              type="number"
              name="budget"
              style={inputStyle}
              onChange={onChangeHander}
              value={budget}
              placeholder="Enter Amount"
            />
            <button
              onClick={makePayment}
              className="button-55"
            >
              Add
            </button>
                </div>
            )}
          </div>
        </div>
        <div className="row mt-4">
            <h3>Transaction History</h3>
            <br />
            <div className="col-12">
            <p>No Transaction History</p>
            </div>
        </div>
      </div>
    </div>
  );
}
