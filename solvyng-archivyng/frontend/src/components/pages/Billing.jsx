import React, { useState, useEffect } from 'react';
import './styling/billing.css';
import NavBar from "./Navbar.jsx";
import { useNavigate } from 'react-router-dom'
import * as queries from "../../graphql/queries.js";
import * as mutations from "../../graphql/mutations.js";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/api";
import { PaystackButton } from 'react-paystack';

const Billing = () => {
  const publicKey = "pk_test_19bde361f26770c7d3a3b527acb1fd7f3e79e93b";
  const navigate = useNavigate();
  const client = generateClient();

  const [userEmail, setuserEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardNameError, setCardNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPlanPrice, setSelectedPlanPrice] = useState('');
  const [cardDetails, setCardDetails] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardID, setcardID] = useState('');
  const [subID, setsubID] = useState('');
  const [currentPlan, setcurrentPlan] = useState('');
  const [currentPlanPrice, setcurrentPlanPrice] = useState('');
  const [planDate, setplanDate] = useState('');
  const options = [
    { value: 29.99, label: 'Basic' },
    { value: 49.99, label: 'Intermediate' },
    { value: 69.99, label: 'Advanced' }
  ];
  const [saveConfirmationDialog, setsaveConfirmationDialog] = useState(false);
  const [deleteConfirmationDialog, setdeleteConfirmationDialog] = useState(false);
  const [paymentConfirmationDialog, setPaymentConfirmationDialog] = useState(false);
  const [cancelConfirmationDialog, setCancelConfirmationDialog] = useState(false);
  const [saveCardDialog, setsaveCardDialog] = useState(false);
  const [removeCardDialog, setremoveCardDialog] = useState(false);
  const [paymentDialog, setpaymentDialog] = useState(false);
  const [cancelSubscriptionDialog, setcancelSubscriptionDialog] = useState(false);

  const opensaveCardDialog = () => {
    if (cardName && cardNumber && cvv && expiry) {
      setsaveCardDialog(true);
    } else {
      alert('Enter the required card info.');
    }

  };

  const opensaveConfirmationDialog = () => {
    setsaveConfirmationDialog(true);
  };

  const openremoveCardDialog = () => {
    setremoveCardDialog(true);
  };

  const opendeleteConfirmationDialog = () => {
    setdeleteConfirmationDialog(true);
  };

  const openPaymentDialog = () => {
    if (selectedPlanPrice) {
      setpaymentDialog(true);
    } else {
      alert('Choose a plan in order to upgrade');
    }
  };

  const openpaymentConfirmationDialog = () => {
    setPaymentConfirmationDialog(true);
  };

  const opencancelDialog = () => {
    setcancelSubscriptionDialog(true);
  };

  const opencancelConfirmationDialog = () => {
    setCancelConfirmationDialog(true);
  };

  const closeconfirmationDialogs = () => {
    setsaveConfirmationDialog(false);
    setdeleteConfirmationDialog(false);
    setPaymentConfirmationDialog(false);
    setCancelConfirmationDialog(false);
    window.location.reload();
  };

  const closeDialogs = () => {
    setsaveCardDialog(false);
    setremoveCardDialog(false);
    setpaymentDialog(false);
    setcancelSubscriptionDialog(false);
  };

  const handleDropdownChange = (evt) => {
    const selectedValue = evt.target.value;
    const selectedOption = options.find(option => option.value === parseFloat(selectedValue));

    setSelectedPlan(selectedOption.label);
    setSelectedPlanPrice(selectedOption.value);
  };

  const validateCardname = (cardName) => {
    const cardNameRegex = /^[a-zA-Z\s]*$/;
    return cardNameRegex.test(cardName);
  }

  const validateCardnumber = (cardNumber) => {
    const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    return cardNumberRegex.test(cardNumber);
  }

  const validateCVV = (cvv) => {
    const cvvRegex = /^\d{3}$/;
    return cvvRegex.test(cvv);
  }

  const validateExpirydate = (expiry) => {
    return expiry;
  }

  const handleInput = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    if (name === 'cardName') {
      setCardName(value);
      setCardNameError(validateCardname(value) ? '' : 'Only letters and spaces');
    }
    if (name === 'cardNumber') {
      setCardNumber(value);
      setCardNumberError(validateCardnumber(value) ? '' : 'Must be 16 digits');
    }
    if (name === 'cvv') {
      setCvv(value);
      setCvvError(validateCVV(value) ? '' : 'Must be 3 digits');
    }
    if (name === 'expiry') {
      setExpiry(value);
      setExpiryError(validateExpirydate(value) ? '' : 'MM/YY');
    }
  }

  async function saveCardDetails() {
    try {
      const userAttributes = await fetchUserAttributes();
      const userEmail = userAttributes.email;
      const variables = {
        input: {
          "card_name": cardName,
          "card_number": cardNumber,
          "expire_date": expiry,
          "cvc_number": cvv,
          "user_email": userEmail
        }
      };
      const newCreditCardDetails = await client.graphql({
        query: mutations.createUserCardDetails, variables
      });
      console.log(newCreditCardDetails);
      setsaveCardDialog(false);
      opensaveConfirmationDialog();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCardDetails() {
    try {
      const variables = { input: { id: cardID } };
      const removecardDetails = await client.graphql({ query: mutations.deleteUserCardDetails, variables });
      console.log(removecardDetails);
      const updatedCardDetails = cardDetails.filter(card => card.id !== cardID);
      setCardDetails(updatedCardDetails);
      setremoveCardDialog(false);
      opendeleteConfirmationDialog();
      if (selectedCard === cardID) {
        setcardID('');
        setCardName('');
        setCardNumber('');
        setExpiry('');
        setCvv('');
        setSelectedCard(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function subscribeToplan() {
    try {
      const userAttributes = await fetchUserAttributes();
      const userEmail = userAttributes.email;
      const create_variables = {
        input: {
          "current_plan": selectedPlan,
          "user_email": userEmail,
          "current_plan_price": selectedPlanPrice
        }
      };
      const update_variables = {
        input: {
          "id": subID,
          "current_plan": selectedPlan,
          "user_email": userEmail,
          "current_plan_price": selectedPlanPrice
        }
      };
      if (!subID) {
        const newSubsciption = await client.graphql({
          query: mutations.createUserPlanSubscription,
          variables: create_variables
        });
        console.log(newSubsciption);
        setpaymentDialog(false);
        openpaymentConfirmationDialog();
      } else {
        const newSubsciption = await client.graphql({
          query: mutations.updateUserPlanSubscription,
          variables: update_variables
        });
        console.log(newSubsciption);
        setpaymentDialog(false);
        openpaymentConfirmationDialog();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function cancelPlan() {
    try {
      const variables = {
        input: {
          id: subID
        }
      };
      const cancelSubscription = await client.graphql({
        query: mutations.deleteUserPlanSubscription, variables
      });
      console.log(cancelSubscription);
      setsubID('');
      setcurrentPlan('No plan purchased');
      setcurrentPlanPrice('0.00');
      setplanDate('0/00/000');
      setcancelSubscriptionDialog(false);
      opencancelConfirmationDialog();
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    dateObj.setDate(dateObj.getDate() + 30);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setSelectedPlan("");
        const userAttributes = await fetchUserAttributes();
        const userEmail = userAttributes.email;
        const variables = { filter: { user_email: { eq: userEmail } } };
        const creditCardDetails = await client.graphql({ query: queries.listUserCardDetails, variables });
        const subscriptionDetails = await client.graphql({ query: queries.listUserPlanSubscriptions, variables });
        const subData = subscriptionDetails.data.listUserPlanSubscriptions.items;
        const card_items = creditCardDetails.data.listUserCardDetails.items;
        setCardDetails(card_items);
        if (card_items.length > 0) {
          const { id, card_name, card_number, expire_date, cvc_number } = card_items[0];
          setcardID(id);
          setSelectedCard(card_items[0].id);
          setCardName(card_name);
          setCardNumber(card_number);
          setExpiry(expire_date);
          setCvv(cvc_number);
        }
        if (subData.length > 0) {
          const { id, current_plan, user_email, current_plan_price, createdAt } = subData[0];
          setsubID(id);
          setcurrentPlan(current_plan);
          setcurrentPlanPrice(current_plan_price);
          setplanDate(formatDate(createdAt))
        } else {
          setsubID('');
          setcurrentPlan('No plan purchased');
          setcurrentPlanPrice('0.00');
          setplanDate('0/00/000');
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
    fetchData();
  }, []);

  const componentProps = {
    email: 'user@ex.com',
    amount: parseInt(selectedPlanPrice * 100),
    currency: 'ZAR',
    metadata: {
      selectedPlan: selectedPlan,
      cardName: cardName,
      cardNumber: cardNumber,
    },
    publicKey: publicKey,
    text: "Pay Now",
    onSuccess: () =>
      subscribeToplan(),
    onClose: () => setpaymentDialog(false),
  }

  return (
    <><h1>Billing</h1>
      <hr className='billing-line-2' />
      <div className='billing-form'>
        <div>
          {saveCardDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Are you sure you want to save this card?</p>
                <button onClick={saveCardDetails}>Yes!</button>
                <button onClick={closeDialogs}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {saveConfirmationDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Credit Card details saved!</p>
                <button onClick={closeconfirmationDialogs}>Ok</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {removeCardDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Are you sure you want to delete this card?</p>
                <button onClick={deleteCardDetails}>Yes!</button>
                <button onClick={closeDialogs}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {deleteConfirmationDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Credit card details deleted!</p>
                <button onClick={closeconfirmationDialogs}>Ok</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {paymentDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Are you sure you want to purchase this subscription plan: {selectedPlan}</p>
                {/* <button onClick={subscribeToplan}>Yes!</button> */}
                <PaystackButton className="billing-save-button" {...componentProps} />
                <button className="billing-save-button" onClick={closeDialogs}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {paymentConfirmationDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Subscription successfully paid!<br />You may now proceed to utilize our resources!</p>
                <button onClick={closeconfirmationDialogs}>Ok</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {cancelSubscriptionDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Are you sure you want to cancel your subscription?</p>
                <button onClick={cancelPlan}>Yes!</button>
                <button onClick={closeDialogs}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {cancelConfirmationDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Subscription successfully cancelled!<br />We are sad to see you go, hope to see you soon again.</p>
                <button onClick={closeconfirmationDialogs}>Ok</button>
              </div>
            </div>
          )}
        </div>
        <div>
          <h2>Update your billing details</h2>
          <hr className='billing-line' />
          <h3 className='billing-h3'>Current plan</h3>
          <div className='current-section'>
            <h4 className='currentPlan'>{currentPlan}: </h4>
            <p className='current-p'>R{currentPlanPrice} p/m</p>
          </div>
          <hr />
          <h3 className='billing-h3'>Next Payment Date</h3>
          <p>{planDate}</p>
          <hr />
          <div>
            <h3 className='billing-h3'>Upgrade subscription </h3>
            <label>Select plan</label>
            <div className='section'>
              <select className='dropdown' id="dropdown" value={selectedPlanPrice} onChange={handleDropdownChange}>
                <option className='dropdown-options' value="">Select...</option>
                {options.map(option => (
                  <option className='dropdown-options' key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='card-details-form'>
            <h3>Card Details</h3>
            <div className='section'>
              <div>
                <label>Name on Card:</label>
                <input className='billing-input'
                  type="text"
                  name="cardName"
                  placeholder='Joe Doe'
                  value={cardName}
                  onChange={handleInput} />
                {cardNameError && <span className='billing-error'>{cardNameError}</span>}
              </div>
              <div>
                <label>Expiry date:</label>
                <input className='billing-input-1'
                  type="text"
                  name="expiry"
                  placeholder='07/07'
                  value={expiry}
                  onChange={handleInput} />
                {expiryError && <span className='billing-error'>{expiryError}</span>}
              </div>
            </div>
            <div className='section-1'>
              <div>
                <label>Card Number:</label>
                <input className='billing-input'
                  type="text"
                  name="cardNumber"
                  placeholder='6549 7665 2558 2020'
                  value={cardNumber}
                  onChange={handleInput} />
                {cardNumberError && <span className='billing-error'>{cardNumberError}</span>}
              </div>
              <div>
                <label>CVV:</label>
                <input className='billing-input-1'
                  type="number"
                  name="cvv"
                  placeholder='654'
                  value={cvv}
                  onChange={handleInput} />
                {cvvError && <span className='billing-error'>{cvvError}</span>}
              </div>
            </div>
            <div className='button-section'>
              <div>
                <button className="billing-save-button" onClick={opensaveCardDialog}>Save</button>
              </div>
              <div>
                <button className="billing-remove-button" onClick={openremoveCardDialog}>Remove</button>
              </div>
            </div>
          </div>
          <div>
            <button className="billing-update-button" onClick={openPaymentDialog}>Upgrade</button>
          </div>
          <div>
            <button className="billing-cancel-button" onClick={opencancelDialog}>Cancel Subscription</button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Billing;
