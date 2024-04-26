import React, { useState } from 'react';
import './auth.css';
import { Mail } from 'lucide-react';
import { resetPassword } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [errors, setErrors] = useState('');

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
        navigate("/confirm-reset-password");
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
    <form className='form-reset-password'>
      <h1>Get Code</h1>
      <div>
        <label>Enter Email to recieve reset code:</label>
        <input
          type="text"
          name="username"
          placeholder='example@gmail.com'
          value={username}
          onChange={handleInput}
        />
        <Mail className="icon" />
        {usernameError && <span>{usernameError}</span>}
      </div>
      <div>
        <button className="button" onClick={handleResetPassword}>Get Code</button>
      </div>
      {errors && <span className='error-span-verify'>{errors}</span>}
    </form>
  );
};

export default ResetPassword;
