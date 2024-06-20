import './styling/notifications.css';
import NavBar from "../pages/Navbar.jsx";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { Trash2 } from 'lucide-react';
import * as mutations from "../../graphql/mutations";

const EmailDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, subject, message } = location.state;

  const client = generateClient();

  async function deleteEmail() {
    try {
      const details = {
        id: id
      };
      const deleteUserMails = await client.graphql({
        query: mutations.deleteUserMails,
        variables: { input: details }
      });
      console.log('Delete works', deleteUserMails)
      navigate("/NotificationEmails");
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
    <NavBar/>
    <><h1>Mail Details Page</h1><div>
      <div className='boxes'>
        <h2>{subject}</h2>
        <Trash2 className="icon-mail-details" onClick={deleteEmail} />
        <p>{message}</p>
      </div>
    </div></>
    </>
  );
};

export default EmailDetails;
