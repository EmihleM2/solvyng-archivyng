import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './auth.css';
import { Mail, Code } from 'lucide-react';
import { confirmSignUp } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/api";
import { createUserMails } from "../../graphql/mutations";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { SESClient, SendTemplatedEmailCommand, CreateTemplateCommand, SendEmailCommand } from "@aws-sdk/client-ses";

const client = generateClient();

const customEmailContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices gravida congue. \n\nAliquam finibus finibus lorem in tempor. Nunc blandit tellus et diam faucibus facilisis. Praesent vel venenatis erat, non consectetur dolor. \n\n @2024 Solvyng Archivyng. All rights reserved."`;
const customHTMLEmailContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices gravida congue. <br/><br/>Aliquam finibus finibus lorem in tempor. Nunc blandit tellus et diam faucibus facilisis. Praesent vel venenatis erat, non consectetur dolor. <br/><br/> @2024 Solvyng Archivyng. All rights reserved.\n\n";

const emailSubject = 'Solvyng Archivyng'

const sns = new SNSClient({
    region: 'eu-west-1',
    credentials: {
        accessKeyId: 'AKIAWUTJI5P3O3ER4UWG',
        secretAccessKey: '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',
    },
});
const ses = new SESClient({
    region: 'eu-west-1',
    credentials: {
        accessKeyId: 'AKIAWUTJI5P3O3ER4UWG',
        secretAccessKey: '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',
    },
});

function Verify() {
    const location = useLocation();
    const { fullname } = location.state;
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [confirmationCodeError, setConfirmationCodeError] = useState('');
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
                sendTemplatedEmail()
                saveUserMails()
                openDialog();
            }
        } catch (error) {
            setErrors('Invalid details, Try again!')
            console.log('error confirming sign up', error);
        }
    }


    //SES needs to be used for sending emails to specific users. Welcome email also needs to be sent by SES as using SNS will send to all subscribers instead of just the new registee 

    // const publishToTopic = () => {
    //     const publishParams = {
    //         Message: JSON.stringify({
    //             default: 'Hello from Solvyng Archivyng!',
    //             email: customEmailContent,
    //         }),
    //         Subject: emailSubject,
    //         MessageStructure: 'json',
    //         TopicArn: 'arn:aws:sns:eu-west-1:456561060854:solvyng-archivyng',
    //     };
    //     const command = new PublishCommand(publishParams);

    //     sns.send(command, (err, data) => {
    //         if (err) {
    //             console.error(err, data);
    //         } else {
    //             console.log(`Published message to: ${publishParams.TopicArn}`);
    //         }
    //     });
    // }

    async function saveUserMails() {
        try {
            const newUserMails = await client.graphql({
                query: createUserMails,
                variables: {
                    input: {
                        "user_email": username,
                        "mail_subject": emailSubject,
                        "mail_message": customEmailContent
                    }
                }
            });
            console.log(newUserMails);
        } catch (error) {
            console.log('error: ', error);
        }
    }
    
    //Template should include an image from a bucket
    const templateInput = {
        Template: {
            TemplateName: "Welcome_to_S-A_Template",
            SubjectPart: "Solvyng Archivyng",
            TextPart: { customEmailContent },
            HtmlPart: `
        <h2>Welcome to Solvyng Archiyng, {{contact.firstName}}!</h2>
        <p>
        ${customHTMLEmailContent}
        </p>

      `,
        }
    };
    // <img src="https://s3.amazonaws.com/your-bucket-name/image-name.jpg" alt="Image Description">
    const createEmailTemplate = async () => {
        const tempCommand = new CreateTemplateCommand(templateInput);
        try {
            const templateDone = await ses.send(tempCommand);
            console.log(templateDone);
        } catch (err) {
            console.log("Failed to create template.", err);
        }
    };
    //aws ses get-template --template-name MyTemplate

    const sendTemplatedEmailInput = {
        Source: "tumiso@solvyng.io",
        Destination: {
            ToAddresses: [
                username,
            ]
        },
        Template: "Welcome_to_S-A_Template",
        TemplateData: JSON.stringify({ contact: { firstName: fullname } }),
    };

    const sendTemplatedEmail = async () => {
        const sendTempCommmand = new SendTemplatedEmailCommand(sendTemplatedEmailInput);
        try {
            const emailSent = await ses.send(sendTempCommmand);
            console.log(emailSent);
        } catch (caught) {
            if (caught instanceof Error && caught.name === "MessageRejected") {
                const messageRejectedError = caught;
                console.log(messageRejectedError);
            }
            throw caught;
        }
    };

    return (
        <div className='verify-page'>
            <><div>
                {isOpen && (
                    <div className="dialog-overlay-verify">
                        <div className="dialog-content">
                            <h2>Information:</h2>
                            <p>Verification Successful! Click Ok to continue...</p>
                            <button onClick={handlegotoLogin}>Ok</button>
                        </div>
                    </div>
                )}
            </div>
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

            </></div>
    )
}

export default Verify;
