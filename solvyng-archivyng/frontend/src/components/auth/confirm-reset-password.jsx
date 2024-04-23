import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { User, Lock, Code} from 'lucide-react';
import { confirmResetPassword } from 'aws-amplify/auth';

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
            navigate("/login");
        } catch (error) {
            setErrors('Invalid details, Try again!')
            console.log("Error:", error);
        }
    }

    return (
        <form className='form-confirm-reset-password'>
            <h1>Reset Password</h1>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="username"
                    placeholder='example@gmail.com'
                    value={username}
                    onChange={handleInput}
                />
                <User className="icon" />
                {usernameError && <span>{usernameError}</span>}
            </div>
            <div>
                <label>Code:</label>
                <input
                    type="number"
                    name="confirmationCode"
                    placeholder='******'
                    value={confirmationCode}
                    onChange={handleInput}
                />
                <Code className="icon" />
                {confirmationCodeError && <span>{confirmationCodeError}</span>}
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    name="newPassword"
                    placeholder='*******'
                    value={newPassword}
                    onChange={handleInput}
                />
                <Lock className="icon" />
                {newPasswordError && <span>{newPasswordError}</span>}
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="repeatNewPassword"
                    placeholder='*******'
                    value={repeatNewPassword}
                    onChange={handleInput}
                />
                <Lock className="icon" />
                {repeatNewPasswordError && <span>{repeatNewPasswordError}</span>}
            </div>
            <div>
                <button className="button" onClick={handleConfirmResetPassword}>Verify</button>
            </div>
            {errors && <span className='error-span-verify'>{errors}</span>}
        </form>
    )
}

export default ConfirmResetPassword;