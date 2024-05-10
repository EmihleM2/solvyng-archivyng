import React from "react";
import { useState } from "react";
import './auth.css';
import { User, Lock, Mail} from 'lucide-react';
import { signUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk'

const Signup = () => {
    const navigate = useNavigate()
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // const [errors, setErrors] = useState('');

    
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handlegotoVerify = () => {
        navigate('/verify')
        console.log("Ok button clicked");
        closeDialog();
    };


    const loginLink = () => {
        navigate("/login");
    };

    const validateFullname = (fullname) => {
        return fullname.trim();
    }

    const validateUsername = (username) => {
        return username.trim();
    }

    const validateEmail = (username) => {
        const emailFormat = /\S+@\S+\.\S+/;
        return emailFormat.test(username);
    }

    const validatePassword = (password) => {
        return password.length >= 7;
    }

    const handleInput = (evt) => {
        evt.preventDefault();

        const { name, value } = evt.target;
        if (name === 'fullname') {
            setFullname(value);
            setFullnameError(validateFullname(value) ? '' : 'Invalid Fullname');
        }
        if (name === 'username') {
            setUsername(value);
            setUsernameError(validateUsername(value) ? '' : 'Invalid username');
        }
        if (name === 'email') {
            setEmail(value);
            setEmailError(validateEmail(value) ? '' : 'Invalid Email');
        }
        if (name === 'password') {
            setPassword(value);
            setPasswordError(validatePassword(value) ? '' : 'Atleast 1 Uppercase, 1 lower, 1 digit, 1 special char, 7 chars long!');
        }
    }

    
    AWS.config.update({
        region: 'eu-west-1',
        accessKeyId: 'AKIAWUTJI5P3O3ER4UWG',
        secretAccessKey: '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',
    });

    // const sns = new AWS.SNS();

    const subscribeToTopic = () => {
        const params = {
            Protocol: "email",
            TopicArn: 'arn:aws:sns:eu-west-1:456561060854:solvyng-archivyng',
            Endpoint: email
        };

        AWS.SNS.Subscribe(params, (err, data) => {
            if (err) {
                console.error(err, data);
            } else {
                console.log(`Subscribed email to topic: ${params.TopicArn}`)
            }
        });
    };


    const handleSignUp = async (evt) => {
        evt.preventDefault();
        if (usernameError || fullnameError || emailError || passwordError) {
            console.log('Cannot register due to errors');
            return; 
        }
            try {
                const { userId } = await signUp({
                    username: email,
                    password: password,
                    options: {
                        userAttributes: {
                            preferred_username: username,
                            email: email,
                            name: fullname,
                        },
                        //autoSignIn: true 
                    }
                });
                console.log("Sign up complete:", userId)
                subscribeToTopic()
                openDialog();
            } catch (error) {
                console.log('Unable to sign up, error:', error);
                // setErrors('Unable to register, Try again!')
            }
        }
    return (
        <><div>
        {isOpen && (
            <div className="dialog-overlay">
                <div className="dialog-content">
                    <h2>Information:</h2>
                    <p>Please confirm your subscription to AWS Solvyng Archivyng <br></br> in your emails before verifying your sign up on the next page.<br></br>Click Ok to continue...</p>
                    <button onClick={handlegotoVerify}>Ok</button>
                </div>
            </div>
        )}
    </div>
        <form className='form-sign-up'>
            <h1>Sign up</h1>
            <div>
                <label>Full name:</label>
                <input
                    type="text"
                    name="fullname"
                    placeholder='Solv Arch'
                    value={fullname}
                    onChange={handleInput}
                />
                <User className="icon" />
                {fullnameError && <span>{fullnameError}</span>}
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder='Solvyng Department'
                    value={username}
                    onChange={handleInput}
                />
                <User className="icon" />
                {usernameError && <span>{usernameError}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    placeholder='example@gmail.com'
                    value={email}
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
                <button className="button" onClick={handleSignUp}>Sign up</button>
            </div>
            <div className="sign-up-div">
                <p> Do not have an account? <a href="login" onClick={loginLink} className="navigate-link">Login</a></p>
            </div>
            <div>
                <button className="button-Google">Sign up with Google</button>
            </div>
        </form></>
    );
};

export default Signup;



