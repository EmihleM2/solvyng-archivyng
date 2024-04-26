import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { Mail, Code } from 'lucide-react';
import { confirmSignUp } from 'aws-amplify/auth';
import AWS from 'aws-sdk'

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
                subscribeToTopic()
                navigate("/login");
            }
        } catch (error) {
            setErrors('Invalid details, Try again!')
            console.log('error confirming sign up', error);
        }
    }

    AWS.config.update({
        region: 'eu-west-1',
        accessKeyId: 'AKIAWUTJI5P3O3ER4UWG',
        secretAccessKey: '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',
    });

    const sns = new AWS.SNS();

    const subscribeToTopic = () => {
        const params = {
            Protocol: "email",
            TopicArn: 'arn:aws:sns:eu-west-1:456561060854:solvyng-archivyng',
            Endpoint: username
        };

        sns.subscribe(params, (err, data) => {
            if (err) {
                console.error(err, data);
            } else {
                console.log(`Subscribed email to topic: ${params.TopicArn}`)
            }
        });
    };



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
                <Mail className="icon" />
                {usernameError && <span>{usernameError}</span>}
            </div>
            <div>
                <label>Enter code you recieved in your email:</label>
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
                <button className="button" onClick={handleSignUpConfirmation}>Verify Sign-up</button>
            </div>
            {errors && <span className='error-span-verify'>{errors}</span>}
        </form>
    )
}

export default Verify;