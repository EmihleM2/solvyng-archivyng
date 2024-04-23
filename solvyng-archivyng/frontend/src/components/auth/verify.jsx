import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { User, Code} from 'lucide-react';
import { confirmSignUp } from 'aws-amplify/auth';

function Verify() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [confirmationCodeError, setConfirmationCodeError] = useState('');

    const [errors, setErrors] = useState('');

    const validateEmail = (username) => {
        const emailFormat = /\S+@\S+\.\S+/;
        return emailFormat.test(username);
    }

    const validateCode = (confirmationCode) => {
        const codeRegex = /^\d{6}$/;
        return codeRegex.test(confirmationCode);
    };

    const handleInput = (evt) => {
        evt.preventDefault();

        const { name, value } = evt.target;

        if (name === 'username') {
            setUsername(value);
            setUsernameError(validateEmail(value) ? '' : 'Invalid Email');
        }

        if (name === 'confirmationCode') {
            setConfirmationCode(value);
            setConfirmationCodeError(validateCode(value) ? '' : 'Code must be 6 digits');
        }

    }


    async function handleSignUpConfirmation(evt) {
        evt.preventDefault();
            try {
                console.log(username)
                console.log(confirmationCode)
                const { isSignUpComplete } = await confirmSignUp({
                    username,
                    confirmationCode
                });
                console.log('Successful verification')
                if (isSignUpComplete === true) {
                    navigate("/login");
                }
            } catch (error) {
                setErrors('Invalid details, Try again!')
                console.log('error confirming sign up', error);
            }
    }

    return (
        <form className='form-verify'>
            <h1>Verification</h1>
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
                <label>Password:</label>
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
                <button className="button" onClick={handleSignUpConfirmation}>Verify</button>
            </div>
            {errors && <span className='error-span-verify'>{errors}</span>}
        </form>
    )
}

export default Verify;