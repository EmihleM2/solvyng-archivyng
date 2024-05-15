import React, { useState, useEffect } from 'react';
import './styling/notifications.css';
import NavBar from "../pages/Navbar.jsx";
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { fetchUserAttributes } from 'aws-amplify/auth';

const client = generateClient();

const EmailItem = ({ email, onDelete }) => {
    const { id, subject, date, message } = email;
    const navigate = useNavigate();

    const gotoMail = () => {
        navigate("/EmailDetails", { state: { id, subject, message } });
    }

    return (
        <>
            <div className='boxes-notifications'>
                <h3 className='h3-notifications' onClick={gotoMail}>{subject}</h3>
                <p className='p-notifications' onClick={gotoMail}>{date}</p>
                <br></br>
                <div className="message-container">
                    <p className='p-notifications'>{message}</p>
                </div>

                <Trash2 className="icon-notifications" onClick={onDelete} />
            </div>
            <hr className="line"></hr><br></br>
        </>
    );
};

const NotificationEmails = () => {
    const [emails, setEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const userAttributes = await fetchUserAttributes();
                const userEmail = userAttributes.email;
                const variables = {
                    filter:
                    {
                        user_email: { eq: userEmail }
                    }
                };
                const mailData = await client.graphql(
                    { query: queries.listUserMails, variables }
                );
                const items = mailData.data.listUserMails.items;
                const formattedEmails = items.map(item => ({
                    id: item.id,
                    subject: item.mail_subject,
                    message: Array.isArray(item.mail_message) ? item.mail_message.join('\n') : item.mail_message,
                    date: formatDate(item.createdAt)
                }));
                setEmails(formattedEmails);
                setIsLoading(false);
            } catch (error) {
                console.log('error: ', error);
            }
        }
        fetchData();
    }, []);

    const formatDate = (createdAt) => {
        const dateObj = new Date(createdAt);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' }); 
        const year = dateObj.getFullYear();
        const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
        const amOrPm = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[1]; 
        return `${day} ${month} ${year}, ${time} ${amOrPm}`;
    };
    
    async function deleteEmail(id) {
        try {
            const details = {
                id: id
            };
            const deleteUserMails = await client.graphql({
                query: mutations.deleteUserMails,
                variables: { input: details }
            });
            setEmails(emails.filter(email => email.id !== id));
            console.log('Delete works', deleteUserMails);
        } catch (error) {
            console.log('error: ', error);
        }
    };
//*
    return (
        <>
        <NavBar/>
        <div>
            <h1>Notifications</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : emails.length === 0 ? (
                <p>No emails</p>
            ) : (
                emails.map(email => (
                    <EmailItem key={email.id} email={email} onDelete={() => deleteEmail(email.id)} />
                ))
            )}
        </div>
        </>
    );
    
};


export default NotificationEmails;
