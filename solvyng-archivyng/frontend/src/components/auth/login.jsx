import React, { useState } from 'react';
import './auth.css';
import { Lock, Mail } from 'lucide-react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [username, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);


  const ForgotLink = () => {
    navigate("/reset-password");
  }

  const SignupLink = () => {
    navigate("/signup");
  }

  const validateEmail = (username) => {
    const emailFormat = /\S+@\S+\.\S+/;
    return emailFormat.test(username);
  }

  const validatePassword = (password) => {
    return password.length >= 7;
  }

  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
  //   return passwordRegex.test(password);
  // };

  const handleInput = (evt) => {
    evt.preventDefault();

    const { name, value } = evt.target;

    if (name === 'username') {
      setEmail(value);
      setEmailError(validateEmail(value) ? '' : 'Invalid Email');
    }

    if (name === 'password') {
      setPassword(value);
      setPasswordError(validatePassword(value) ? '' : 'Atleast 1 Uppercase, 1 lower, 1 digit, 1 special char, 7 chars long!');
    }
  }

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      console.log(username)
      console.log(password)
      const { isSignedIn } = await signIn({
        username, password
      });
      console.log(isSignedIn)
      console.log('Sign in complete')
      navigate("/Dashboard");
    } catch (error) {
      setErrors('Incorrect login details, Try again!')
      console.log('Unable to login, error:', error);
    }
  }

  return (
    <div className='login-page'>
      <form className='form-login'>
        <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="username"
            placeholder='example@gmail.com'
            value={username}
            onChange={handleInput}
          />
          <Mail className="icon" />
          {emailError && <span>{emailError}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder='*******'
            value={password}
            onChange={handleInput}
          />
          <Lock className="icon" />
          {passwordError && <span>{passwordError}</span>}
        </div>
        <div>
          <a href="reset-password" onClick={ForgotLink} className="forgot-password-link">Forgot Password?</a>
        </div>
        <div>
          <button className="button" onClick={handleLogin}>Login</button>
        </div>
        <div className="sign-up-div">
          <p> Do not have an account? <a href="signup" onClick={SignupLink} className="navigate-link">Sign up</a></p>
        </div>
        <div>
          <button className="button-Google">Login with Google</button>
        </div>
        {errors && <span className='error-span'>{errors}</span>}
      </form>
    </div>
  )
}
export default Login;
