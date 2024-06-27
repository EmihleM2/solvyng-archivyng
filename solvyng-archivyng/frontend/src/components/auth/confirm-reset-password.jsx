import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './auth.css';
import { Mail, Lock, Code } from 'lucide-react';
import { confirmResetPassword } from 'aws-amplify/auth';
import styles from "./auth.module.css";


function ConfirmResetPassword() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [confirmationCode, setconfirmationCode] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [repeatNewPassword, setrepeatNewPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [confirmationCodeError, setConfirmationCodeError] = useState('');
    const [newPasswordError, setnewPasswordError] = useState('');
    const [repeatNewPasswordError, setrepeatNewPasswordError] = useState('');
    const [errors, setErrors] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handlegotoLogin = () => {
        navigate('/login')
        console.log("Confirm button clicked")
        closeDialog();
    };

    const validateEmail = (username) => {
        const emailFormat = /\S+@\S+\.\S+/;
        return emailFormat.test(username);
    }

    const validateCode = (confirmationCode) => {
        const codeRegex = /^\d{6}$/;
        return codeRegex.test(confirmationCode);
    };

    const validatePassword = (newPassword) => {
        return newPassword.length >= 7;
    }

    const validateRepeatPassword = (repeatNewPassword) => {
        return repeatNewPassword === newPassword;
    }

    const handleInput = (evt) => {
        evt.preventDefault();

        const { name, value } = evt.target;

        if (name === 'username') {
            setUsername(value);
            setUsernameError(validateEmail(value) ? '' : 'Invalid Email');
        }

        if (name === 'confirmationCode') {
            setconfirmationCode(value);
            setConfirmationCodeError(validateCode(value) ? '' : 'Code must be 6 digits');
        }

        if (name === 'newPassword') {
            setnewPassword(value);
            setnewPasswordError(validatePassword(value) ? '' : 'Atleast 1 Uppercase, 1 lower, 1 digit, 1 special char, 7 chars long!');
        }

        if (name === 'repeatNewPassword') {
            setrepeatNewPassword(value);
            setrepeatNewPasswordError(validateRepeatPassword(value) ? '' : 'Password does not match');
        }

    }

    async function handleConfirmResetPassword(evt) {
        evt.preventDefault();
        try {
            await confirmResetPassword({ username, confirmationCode, newPassword })
            console.log("Reset Successful")
            openDialog();
        } catch (error) {
            setErrors('Invalid details, Try again!')
            console.log("Error:", error);
        }
    }

    return (
      <div className={styles["confirm-reset-password-page"]}>
        <div>
          {isOpen && (
            <div className={styles["dialog-overlay-verify"]}>
              <div className={styles["dialog-content"]}>
                <h2>Information:</h2>
                <p className={styles["dialog-space"]}>
                  Reset Successful! Click Ok to Login...
                </p>
                <button onClick={handlegotoLogin}>Ok</button>
              </div>
            </div>
          )}
        </div>
        <form className={styles["form-confirm-reset-password"]}>
          <h1>Reset Password</h1>
          <div>
            <label>Email:</label>
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
            <label>Enter code sent to your email:</label>
            <input
              type="number"
              name="confirmationCode"
              placeholder="******"
              value={confirmationCode}
              onChange={handleInput}
            />
            <Code className={styles["icon"]} />
            {confirmationCodeError && <span>{confirmationCodeError}</span>}
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              placeholder="*******"
              value={newPassword}
              onChange={handleInput}
            />
            <Lock className={styles["icon"]} />
            {newPasswordError && <span>{newPasswordError}</span>}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="repeatNewPassword"
              placeholder="*******"
              value={repeatNewPassword}
              onChange={handleInput}
            />
            <Lock className={styles["icon"]} />
            {repeatNewPasswordError && <span>{repeatNewPasswordError}</span>}
          </div>
          <div>
            <button
              className={styles["button"]}
              onClick={handleConfirmResetPassword}
            >
              Verify
            </button>
          </div>
          {errors && (
            <span className={styles["error-span-verify"]}>{errors}</span>
          )}
        </form>
      </div>
    );
}

export default ConfirmResetPassword;