import React, { useState } from 'react';
import './styling/billing.css';
import NavBar from "../pages/Navbar.jsx";
import { useNavigate } from 'react-router-dom'
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { fetchUserAttributes } from 'aws-amplify/auth';

const Billing = () => {
  const navigate = useNavigate();
  const client = generateClient();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNameError, setCardNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const options = [
    { value: 'Basic', label: 'Basic' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const handleDropdown = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleInput = (evt) => {
    const { name, value } = evt.target;
    if (name === 'cardName') {
      setCardName(value);
      setCardNameError('');
    } else if (name === 'cardNumber') {
      setCardNumber(value);
      setCardNumberError('');
    } else if (name === 'expiry') {
      setExpiry(value);
      setExpiryError('');
    } else if (name === 'cvv') {
      setCvv(value);
      setCvvError('');
    }
  };

  const currentPlan = 'Basic';

  const updatePlan = () => {}

  return (
    <form className='billing-form'>
      <>
        <h1>Billing Page</h1>
        <div>
          <h2>Update your billing details</h2>
          <hr />
          <h3>Current plan</h3>
          <h4>{currentPlan}</h4>
          <br></br>
          <h3>Card Details</h3>
          <div className='section'>
            <div>
              <label>Name on Card:</label>
              <input className='billing-input'
                type="text"
                name="cardName"
                placeholder='Joe Doe'
                value={cardName}
                onChange={handleInput}
              />
              {cardNameError && <span>{cardNameError}</span>}
            </div>
            <div>
              <label>Expiry:</label>
              <input className='billing-input-1'
                type="text"
                name="expiry"
                placeholder='07/07'
                value={expiry}
                onChange={handleInput}
              />
              {expiryError && <span>{expiryError}</span>}
            </div>
          </div>
          <div className='section'>
            <div>
              <label>Card Number:</label>
              <input className='billing-input'
                type="text"
                name="cardNumber"
                placeholder='6549 7665 2558 2020'
                value={cardNumber}
                onChange={handleInput}
              />
              {cardNumberError && <span>{cardNumberError}</span>}
            </div>
            <div>
              <label>CVV:</label>
              <input className='billing-input-1'
                type="number"
                name="cvv"
                placeholder='654'
                value={cvv}
                onChange={handleInput}
              />
              {cvvError && <span>{cvvError}</span>}
            </div>
          </div>
            <label>Select plan</label>
            <div className='section'>
            <select className='dropdown' id="dropdown" value={selectedPlan} onChange={handleDropdown}>
              <option className='dropdown-options' value="">Select...</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {selectedPlan && <p>{selectedPlan}</p>}
            <div>
              <button className="billing-update-button" onClick={updatePlan}>Update</button>
            </div>
          </div>
        </div>
      </>
    </form>
  );
};

export default Billing;
