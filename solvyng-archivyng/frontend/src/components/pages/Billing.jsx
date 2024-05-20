import React, { useState } from 'react';
import './styling/billing.css';
import NavBar from "../pages/Navbar.jsx";
import { useNavigate } from 'react-router-dom'
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
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
  //const [nextPaymentDate, setnextPaymentDate] = useState('');
  const options = [
    { value: 'Basic', label: 'Basic' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];
  const amount = 0;
  const nextPaymentDate = "08/08/2024"
  const [subscribeToPlanDialog, setSubscribeToPlanDialog] = useState(false);
  const [paymentConfirmationDialog, setPaymentConfirmationDialog] = useState(false);

  const openSubscribeToPlanDialog = () => {
    setSubscribeToPlanDialog(true);
  };

  const openPaymentConfirmationDialog = () => {
    setPaymentConfirmationDialog(true);
  };

  const closeDialogs = () => {
    setSubscribeToPlanDialog(false);
    setPaymentConfirmationDialog(false);
  };

  const handleDropdown = (event) => {
    setSelectedPlan(event.target.value);
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

  const currentPlan = 'Basic';

  const updatePlan = () => { }

  async function saveSubscriptionDetails() {
    try {
      const userAttributes = await fetchUserAttributes();
      const userEmail = userAttributes.email;
      const variables = {
        input: {
          "card_name": cardName,
          "card_number": cardNumber,
          "expire_date": expiry,
          "cvc_number": cvv,
          "subscription_plan": selectedPlan,
          "user_email": userEmail
        }
      };
      const newCreditCardDetails = await client.graphql({
        query: mutations.createUserCardDetails, variables
      });
      console.log(newCreditCardDetails);
      setSubscribeToPlanDialog(false);
      openPaymentConfirmationDialog();
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();
    const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const amOrPm = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[1];
    return `${day} ${month} ${year}, ${time} ${amOrPm}`;
  };

  //   useEffect(() => {
  //     async function fetchData() {
  //         try {
  //             const userAttributes = await fetchUserAttributes();
  //             const userEmail = userAttributes.email;
  //             const variables = {
  //                 filter:
  //                 {
  //                     user_email: { eq: userEmail }
  //                 }
  //             };
  //             const creditCardDetails = await client.graphql(
  //                 { query: queries.listUserCardDetails, variables }
  //             );
  //             const items = creditCardDetails.data.listUserCardDetails.items;
  //             const formattedCardDetails = items.map(item => ({
  //                 id: item.id,
  //                 cardName: item.,
  //                 subject: item.,
  //                 message: Array.isArray(item.mail_message) ? item.mail_message.join('\n') : item.mail_message,
  //                 date: formatDate(item.createdAt)
  //             }));
  //             setEmails(formattedEmails);
  //             setIsLoading(false);
  //         } catch (error) {
  //             console.log('error: ', error);
  //         }
  //     }
  //     fetchData();
  // }, []);

  const componentProps = {
    email: 'tumiso@solvyng.io',
    amount: amount,
    currency: 'ZAR',
    metadata: {
      selectedPlan: selectedPlan,
      cardName: cardName,
      cardNumber: cardNumber,
    },
    publicKey: publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => console.log("Cancelled"),
  }

  return (
    <><h1>Billing</h1>
      <hr className='billing-line-2' />
      <div className='billing-form'>
        <div>
          {subscribeToPlanDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Are you sure you want subscribe to: {selectedPlan} plan?</p>
                <button onClick={saveSubscriptionDetails}>Yes!</button>
                <button onClick={closeDialogs}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div>
          {paymentConfirmationDialog && (
            <div className="billing-dialog-box">
              <div className="billing-dialog-content">
                <h2>Information:</h2>
                <p className='billing-dialog-space'>Payment successful!<br />You can now use the features you paid for!</p>
                <button onClick={closeDialogs}>Ok</button>
              </div>
            </div>
          )}
        </div>
        <div>
          <h2>Update your billing details</h2>
          <hr className='billing-line' />
          <h3 className='billing-h3'>Current plan</h3>
          <div className='current-section'>
            <h4 className='currentPlan'>{currentPlan}</h4>
            <p className='current-p'>R29,99 p/m</p>
          </div>
          <hr className='billing-line-2' />
          <h3 className='billing-h3'>Next Payment Date</h3>
          <p>{nextPaymentDate}</p>
          <hr className='billing-line-2' />
          <h4 className='billing-h4'>Upgrade subscription </h4>
          <h3 className='billing-h3'>Card Details</h3>
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
          <div className='section'>
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
          <label>Select plan</label>
          <div className='section'>
            <select className='dropdown' id="dropdown" value={selectedPlan} onChange={handleDropdown}>
              <option className='dropdown-options' value="">Select...</option>
              {options.map(option => (
                <option className='dropdown-options' key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div>
              <PaystackButton className="billing-button" {...componentProps} />
            </div>
            {/* <div>
      <button className="billing-button" onClick={openSubscribeToPlanDialog}>Subcribe</button>
    </div> */}
            <div>
              <button className="billing-button-1" onClick={saveSubscriptionDetails}>Update</button>
            </div>
            <div>
              <button className="billing-button-2" onClick={saveSubscriptionDetails}>Cancel Subscription</button>
            </div>
          </div>
        </div>

      </div></>

  );
};

export default Billing;
