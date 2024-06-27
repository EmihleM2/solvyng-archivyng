import React, { useState } from 'react';
// import './auth.css';
import styles from "./auth.module.css";

import { Mail } from 'lucide-react';
import { resetPassword } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [errors, setErrors] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handlegotoconfirmPassword = () => {
    navigate("/confirm-reset-password");
    console.log("Confirm button clicked")
    closeDialog();
  };

  const validateEmail = (username) => {
    const emailFormat = /\S+@\S+\.\S+/;
    return emailFormat.test(username);
  }

  const handleInput = (evt) => {
    evt.preventDefault();

    const { name, value } = evt.target;

    if (name === 'username') {
      setUsername(value);
      setUsernameError(validateEmail(value) ? '' : 'Invalid Email');
    }
  }


  const handleResetPassword = async (evt) => {
    evt.preventDefault();
    try {
      const output = await resetPassword({ username })
      handleResetPasswordNextSteps(output)
      console.log(output)
      openDialog();
    } catch (error) {
      setErrors('Invalid, Try again!')
      console.log(error);
    }
  }

  function handleResetPasswordNextSteps(output) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        )
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }

  return (
    <div className={styles["reset-password-page"]}>
      <div>
        {isOpen && (
          <div className={styles["dialog-overlay-verify"]}>
            <div className={styles["dialog-content"]}>
              <h2>Information:</h2>
              <p>Reset code sent! Click Ok to update password...</p>
              <button onClick={handlegotoconfirmPassword}>Ok</button>
            </div>
          </div>
        )}
      </div>
      <form className={styles["form-reset-password"]}>
        <h1>Get Code</h1>
        <div>
          <label>Enter Email to recieve reset code:</label>
          <input
            type="text"
            name="username"
            placeholder="example@gmail.com"
            value={username}
            onChange={handleInput}
          />
          <Mail className={styles["icon"]} />
          {usernameError && <span>{usernameError}</span>}
        </div>
        <div>
          <button className={styles["button"]} onClick={handleResetPassword}>
            Get Code
          </button>
        </div>
        {errors && (
          <span className={styles["error-span-verify"]}>{errors}</span>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
