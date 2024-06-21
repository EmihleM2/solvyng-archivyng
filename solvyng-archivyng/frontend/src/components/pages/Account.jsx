import React from 'react';
import NavBar from "./Navbar.jsx";
import Settings from './Settings.jsx';

const Account = () => {

    return (
        <>
            <NavBar />
            <Settings />
            <hr className='billing-line-2' />
            <h1>Account page</h1>
        </>
    )
}
export default Account;
